'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  userProfiles,
  organizations,
  organizationMemberships,
} from '@/lib/db/schema';
import {
  type NewUserProfile,
  type NewOrganization,
  type NewOrganizationMembership,
} from '@/lib/contracts';
import { ministryRoleSchema } from '@/lib/contracts';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getUserByEmail } from '@/lib/db/queries';
import {
  validatedAction,
  validatedActionWithUser,
} from '@/lib/auth/middleware';

/**
 * Helpers: treat empty strings as "absent" so optional fields
 * (like organizationId) don’t fail validation.
 */
const emptyToUndefined = z.preprocess(
  v => (v === '' ? undefined : v),
  z.string().optional()
);

const optionalUuid = z
  .string()
  .uuid()
  .optional()
  .or(z.literal(''))
  .transform(val => (val === '' ? undefined : val));

// Sign-in validation schema
const signInSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
  priceId: emptyToUndefined.optional(),
  organizationId: optionalUuid.optional(),
});

// Sign-up validation schema
const signUpSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name too long'),
  ministryRole: ministryRoleSchema,
  organizationName: emptyToUndefined.optional(),
  priceId: emptyToUndefined.optional(),
  organizationId: optionalUuid.optional(),
});

export const signIn = validatedAction(signInSchema, async (data, _formData) => {
  console.log('🔐 SignIn Action Started:', {
    email: data.email,
    hasPassword: !!data.password,
    priceId: data.priceId,
    organizationId: data.organizationId,
    timestamp: new Date().toISOString(),
  });

  const { email, password } = data;

  try {
    const supabase = await createClient();
    console.log('🔐 Supabase Client Created');

    // Sign in with Supabase Auth
    console.log('🔐 Attempting Supabase Auth SignIn');
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log('🔐 Supabase Auth Response:', {
      hasUser: !!authData?.user,
      userId: authData?.user?.id,
      userEmail: authData?.user?.email,
      hasError: !!authError,
      errorMessage: authError?.message,
      errorCode: authError?.status,
    });

    if (authError || !authData.user) {
      console.error('🔐 Supabase Auth Failed:', {
        error: authError,
        hasUser: !!authData?.user,
      });
      return {
        error: 'Invalid email or password. Please try again.',
        email,
        password,
      };
    }

    // Find user profile
    console.log('🔐 Looking up user profile by email:', email);
    const foundUser = await getUserByEmail(email);

    console.log('🔐 User Profile Lookup Result:', {
      foundUser: !!foundUser,
      userId: foundUser?.id,
      accountStatus: foundUser?.accountStatus,
      email: foundUser?.email,
    });

    if (!foundUser) {
      console.error('🔐 User Profile Not Found:', { email });
      return {
        error: 'User profile not found. Please contact support.',
        email,
        password,
      };
    }

    // Check if user account is active
    console.log('🔐 Checking account status:', {
      status: foundUser.accountStatus,
      isActive: foundUser.accountStatus === 'active',
    });

    if (foundUser.accountStatus !== 'active') {
      console.error('🔐 Account Not Active:', {
        status: foundUser.accountStatus,
        email,
      });
      return {
        error: 'Your account is not active. Please contact support.',
        email,
        password,
      };
    }

    // Update last active timestamp
    console.log('🔐 Updating last active timestamp');
    await db
      .update(userProfiles)
      .set({ lastActiveAt: new Date() })
      .where(eq(userProfiles.id, foundUser.id));

    console.log('🔐 SignIn Successful - Redirecting to dashboard');

    redirect('/dashboard/');
  } catch (error) {
    console.error('🔐 SignIn Action Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      email,
      timestamp: new Date().toISOString(),
    });
    return {
      error: 'An unexpected error occurred. Please try again.',
      email,
      password: '',
    };
  }
});

export const signUp = validatedAction(signUpSchema, async (data, _formData) => {
  console.log('🔐 SignUp Action Started:', {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    ministryRole: data.ministryRole,
    organizationName: data.organizationName,
    organizationId: data.organizationId,
    hasPassword: !!data.password,
    timestamp: new Date().toISOString(),
  });

  const {
    email,
    password,
    firstName,
    lastName,
    ministryRole,
    organizationName,
    organizationId,
  } = data;

  try {
    const supabase = await createClient();
    console.log('🔐 Supabase Client Created for SignUp');

    // Check if user already exists
    console.log('🔐 Checking if user already exists:', email);
    const existingUser = await getUserByEmail(email);

    console.log('🔐 Existing User Check Result:', {
      exists: !!existingUser,
      userId: existingUser?.id,
      email: existingUser?.email,
    });

    if (existingUser) {
      console.log('🔐 User Already Exists:', { email });
      return {
        error:
          'An account with this email already exists. Please sign in instead.',
        email,
        password,
        firstName,
        lastName,
      };
    }

    // Sign up with Supabase Auth
    console.log('🔐 Creating Supabase Auth user');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log('🔐 Supabase SignUp Response:', {
      hasUser: !!authData?.user,
      userId: authData?.user?.id,
      userEmail: authData?.user?.email,
      hasError: !!authError,
      errorMessage: authError?.message,
      errorCode: authError?.status,
    });

    if (authError || !authData.user) {
      console.error('🔐 Supabase SignUp Failed:', {
        error: authError,
        hasUser: !!authData?.user,
      });
      return {
        error: 'Failed to create account. Please try again.',
        email,
        password,
        firstName,
        lastName,
      };
    }

    // Create user profile
    console.log('🔐 Creating user profile');
    const newUserProfile: NewUserProfile = {
      id: authData.user.id!, // Use Supabase Auth user ID (non-null assertion since we just created the user)
      email,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      ministryRole,
      organizationName,
      accountStatus: 'pending_verification',
      onboardingCompleted: false,
      onboardingStep: 1,
      languagePrimary: 'en',
      subscriptionTier: 'free',
      theologicalFocus: [],
      brandColors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
      },
      emailNotifications: {
        dailyDigest: true,
        collaborationRequests: true,
        revenueReports: true,
        communityUpdates: true,
      },
      privacySettings: {
        publicProfile: true,
        showAssessmentResults: false,
        allowNetworking: true,
        shareAnalytics: false,
      },
    };

    console.log('🔐 User Profile Data:', {
      id: newUserProfile.id,
      email: newUserProfile.email,
      displayName: newUserProfile.displayName,
      ministryRole: newUserProfile.ministryRole,
      organizationName: newUserProfile.organizationName,
    });

    const [createdUser] = await db
      .insert(userProfiles)
      .values(newUserProfile as any)
      .returning();

    console.log('🔐 User Profile Creation Result:', {
      success: !!createdUser,
      userId: createdUser?.id,
      email: createdUser?.email,
    });

    if (!createdUser) {
      console.error('🔐 Failed to create user profile');
      return {
        error: 'Failed to create user profile. Please try again.',
        email,
        password,
        firstName,
        lastName,
      };
    }

    if (organizationId) {
      // User is joining an existing organization
      console.log('🔐 User joining existing organization:', organizationId);
      const [existingOrg] = await db
        .select()
        .from(organizations)
        .where(eq(organizations.id, organizationId))
        .limit(1);

      console.log('🔐 Existing Organization Lookup:', {
        found: !!existingOrg,
        orgId: existingOrg?.id,
        orgName: existingOrg?.name,
      });

      if (existingOrg) {
        // Create organization membership
        console.log('🔐 Creating organization membership for existing org');
        const newMembership: NewOrganizationMembership = {
          userId: createdUser.id,
          organizationId: organizationId,
          role: 'member',
          status: 'active',
          permissions: [],
          joinedAt: new Date(),
        };

        await db.insert(organizationMemberships).values(newMembership);
        console.log('🔐 Organization membership created');
      }
    } else if (organizationName) {
      // Create a new organization for the user
      console.log('🔐 Creating new organization:', organizationName);
      const newOrg: NewOrganization = {
        name: organizationName,
        slug: organizationName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        organizationType: 'other', // Default, user can update later
        accountOwnerId: createdUser.id,
        status: 'trial',
        licenseType: 'individual',
        maxUsers: 1,
      };

      console.log('🔐 New Organization Data:', {
        name: newOrg.name,
        slug: newOrg.slug,
        ownerId: newOrg.accountOwnerId,
        status: newOrg.status,
      });

      const [createdOrg] = await db
        .insert(organizations)
        .values(newOrg)
        .returning();

      console.log('🔐 Organization Creation Result:', {
        success: !!createdOrg,
        orgId: createdOrg?.id,
        orgName: createdOrg?.name,
      });

      if (createdOrg) {
        // Create organization membership as owner
        console.log('🔐 Creating organization membership as owner');
        const newMembership: NewOrganizationMembership = {
          userId: createdUser.id,
          organizationId: createdOrg.id,
          role: 'owner',
          status: 'active',
          permissions: [],
          joinedAt: new Date(),
        };

        await db.insert(organizationMemberships).values(newMembership);
        console.log('🔐 Organization membership created as owner');
      }
    } else {
      console.log('🔐 No organization specified - user will be standalone');
    }

    console.log('🔐 SignUp Successful - Redirecting to dashboard');

    redirect('/dashboard/');
  } catch (error) {
    console.error('🔐 SignUp Action Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      email,
      firstName,
      lastName,
      timestamp: new Date().toISOString(),
    });
    return {
      error: 'An unexpected error occurred during sign up. Please try again.',
      email,
      password: '',
      firstName,
      lastName,
    };
  }
});

export async function signOut() {
  const supabase = await createClient();

  // Sign out from Supabase Auth
  await supabase.auth.signOut();

  redirect('/sign-in');
}

// Account management functions
const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _formData, user) => {
    const { name, email } = data;

    // Update user profile in database
    await db
      .update(userProfiles)
      .set({
        displayName: name,
        email: email,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, user.id));

    return {
      success: 'Account updated successfully!',
      name,
      email,
    };
  }
);

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .max(100, 'Password too long'),
    confirmPassword: z.string().min(8, 'Please confirm your new password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _formData, user) => {
    const { currentPassword, newPassword } = data;

    const supabase = await createClient();

    // Verify current password
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (verifyError) {
      return {
        error: 'Current password is incorrect',
        currentPassword,
        newPassword,
        confirmPassword: newPassword,
      };
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      return {
        error: 'Failed to update password. Please try again.',
        currentPassword,
        newPassword,
        confirmPassword: newPassword,
      };
    }

    return {
      success: 'Password updated successfully!',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }
);

const deleteAccountSchema = z.object({
  password: z.string().min(8, 'Password is required to delete account'),
});

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _formData, user) => {
    const { password } = data;

    const supabase = await createClient();

    // Verify password
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: password,
    });

    if (verifyError) {
      return {
        error: 'Password is incorrect',
        password,
      };
    }

    // Delete user profile from database
    await db.delete(userProfiles).where(eq(userProfiles.id, user.id));

    // Sign out and redirect
    await supabase.auth.signOut();
    redirect('/sign-in');
  }
);
