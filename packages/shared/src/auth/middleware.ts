import { UserProfile } from '@platform/contracts';
import { createSupabaseServerClient } from '@platform/database';
import { z } from 'zod';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: unknown; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const formDataObj: Record<string, string> = {};
    for (const [key, value] of formData as any) {
      formDataObj[key] = value.toString();
    }

    console.log('🔐 Validation: Form data received:', {
      formDataObj,
      timestamp: new Date().toISOString(),
    });

    // Log each field individually for debugging
    console.log('🔐 Validation: Individual field analysis:', {
      email: {
        value: formDataObj['email'],
        type: typeof formDataObj['email'],
        isEmpty: !formDataObj['email'],
      },
      password: {
        value: formDataObj['password'] ? '***' : 'EMPTY',
        type: typeof formDataObj['password'],
        isEmpty: !formDataObj['password'],
      },
      organizationId: {
        value: formDataObj['organizationId'],
        type: typeof formDataObj['organizationId'],
        isEmpty: !formDataObj['organizationId'],
      },
      priceId: {
        value: formDataObj['priceId'],
        type: typeof formDataObj['priceId'],
        isEmpty: !formDataObj['priceId'],
      },
    });

    const result = schema.safeParse(formDataObj);
    if (!result.success) {
      console.error('🔐 Validation: Schema validation failed:', {
        errors: result.error.errors,
        formDataObj,
        timestamp: new Date().toISOString(),
      });

      // Log each validation error in detail
      result.error.errors.forEach((error, index) => {
        console.error(`🔐 Validation Error ${index + 1}:`, {
          path: error.path,
          message: error.message,
          code: error.code,
          received: (error as any).input,
        });
      });

      return { error: result.error.errors[0]?.message || 'Validation failed' };
    }

    console.log('🔐 Validation: Schema validation passed:', {
      validatedData: result.data,
      timestamp: new Date().toISOString(),
    });

    return action(result.data, formData);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: UserProfile
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !authUser) {
      throw new Error('User is not authenticated');
    }

    const formDataObj: Record<string, string> = {};
    for (const [key, value] of formData as any) {
      formDataObj[key] = value.toString();
    }
    const result = schema.safeParse(formDataObj);
    if (!result.success) {
      return { error: result.error.errors[0]?.message || 'Validation failed' };
    }

    // Create a minimal user profile from auth data for now
    // In a real implementation, you might want to fetch the full user profile
    const userProfile: UserProfile = {
      id: authUser.id,
      email: authUser.email || '',
      firstName: authUser.user_metadata?.['first_name'] || '',
      lastName: authUser.user_metadata?.['last_name'] || '',
      ministryRole: authUser.user_metadata?.['ministry_role'] || 'other',
      // Add all required fields with defaults
      languagePrimary: 'en',
      subscriptionTier: 'free',
      theologicalFocus: [],
      brandColors: {
        accent: '#059669',
        primary: '#2563eb',
        secondary: '#64748b',
      },
      emailNotifications: {
        dailyDigest: true,
        revenueReports: true,
        communityUpdates: true,
        collaborationRequests: true,
      },
      privacySettings: {
        publicProfile: true,
        shareAnalytics: false,
        allowNetworking: true,
        showAssessmentResults: false,
      },
      onboardingCompleted: false,
      onboardingStep: 1,
      accountStatus: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    return action(result.data, formData, userProfile);
  };
}

// Organization-based actions
type WithTeamFunction<T> = (
  formData: FormData,
  organization: any // You can type this properly based on your organization schema
) => Promise<T>;

export function withTeam<T>(action: WithTeamFunction<T>) {
  return async (formData: FormData) => {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !authUser) {
      throw new Error('User is not authenticated');
    }

    // Get user's organization - you'll need to implement this based on your schema
    // For now, we'll create a placeholder organization object
    const organization = {
      id: authUser.id, // Placeholder - should be actual organization ID
      name:
        authUser.user_metadata?.['organization_name'] ||
        'Personal Organization',
      // Add other organization properties as needed
    };

    return action(formData, organization);
  };
}
