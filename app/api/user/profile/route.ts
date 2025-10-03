import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import {
  userProfileSchema,
  newUserProfileSchema,
  userProfileResponseSchema,
} from '@/lib/contracts';
import { userProfiles } from '@/lib/db/schema';
import { toUserProfileDTO } from '@/lib/mappers/user-profiles';
import { hasResults, isDefined } from '@/lib/db/type-guards';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// Response schemas are now imported from contracts

// GET /api/user/profile - Get current user's profile
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // For now, we'll need to get user from session/auth
    const user = { id: 'temp-user-id' }; // This should come from auth
    const db = await import('@/lib/db/drizzle').then(m => m.db);
    const profile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, user.id))
      .limit(1);

    if (!hasResults(profile)) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const profileData = profile[0];
    if (!isDefined(profileData)) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const response = {
      data: toUserProfileDTO(profileData),
      success: true,
    };

    // Validate response with Zod schema
    const validatedResponse = userProfileResponseSchema.parse(response);

    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error('GET /api/user/profile error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const input = userProfileSchema
      .partial()
      .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        lastActiveAt: true,
      })
      .parse(body);

    // TODO: Add authentication check
    // For now, we'll need to get user from session/auth
    const user = { id: 'temp-user-id' }; // This should come from auth
    const db = await import('@/lib/db/drizzle').then(m => m.db);
    const updatedProfiles = await db
      .update(userProfiles)
      .set({
        ...input,
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      })
      .where(eq(userProfiles.id, user.id))
      .returning();

    if (!hasResults(updatedProfiles)) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const updatedProfile = updatedProfiles[0];
    if (!isDefined(updatedProfile)) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const response = {
      data: toUserProfileDTO(updatedProfile),
      success: true,
    };

    // Validate response with Zod schema
    const validatedResponse = userProfileResponseSchema.parse(response);

    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error('PUT /api/user/profile error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/user/profile - Create new user profile (for onboarding)
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const input = newUserProfileSchema.parse(body);

    // TODO: Add authentication check
    // For now, we'll need to get user from session/auth
    const user = { id: 'temp-user-id', email: 'temp@example.com' }; // This should come from auth
    const db = await import('@/lib/db/drizzle').then(m => m.db);
    // Check if profile already exists
    const existingProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, user.id))
      .limit(1);

    if (hasResults(existingProfile)) {
      return NextResponse.json(
        { error: 'Profile already exists' },
        { status: 409 }
      );
    }

    const insertedProfiles = await db
      .insert(userProfiles)
      .values({
        ...input,
        id: user.id,
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      })
      .returning();

    // Ensure we have a valid profile
    if (!hasResults(insertedProfiles)) {
      return NextResponse.json(
        { error: 'Failed to create user profile' },
        { status: 500 }
      );
    }

    const newProfile = insertedProfiles[0];
    if (!isDefined(newProfile)) {
      return NextResponse.json(
        { error: 'Failed to create user profile' },
        { status: 500 }
      );
    }

    const response = {
      data: toUserProfileDTO(newProfile),
      success: true,
    };

    // Validate response with Zod schema
    const validatedResponse = userProfileResponseSchema.parse(response);

    return NextResponse.json(validatedResponse, { status: 201 });
  } catch (error) {
    console.error('POST /api/user/profile error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
