import { toUserProfileResponseDTO } from '@/lib/mappers/user';
import { db, organizationMemberships, userProfiles } from '@platform/database';
import { setSession } from '@platform/shared/auth/session';
import { stripe } from '@platform/shared/payments/stripe';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

// Input validation schema
const checkoutParamsSchema = z.object({
  session_id: z.string().min(1, 'Session ID is required'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const params = Object.fromEntries(searchParams.entries());

    // Validate parameters
    const { session_id: sessionId } = checkoutParamsSchema.parse(params);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription'],
    });

    if (!session.customer || typeof session.customer === 'string') {
      throw new Error('Invalid customer data from Stripe.');
    }

    const customerId = session.customer.id;
    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id;

    if (!subscriptionId) {
      throw new Error('No subscription found for this session.');
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product'],
    });

    const plan = subscription.items.data[0]?.price;

    if (!plan) {
      throw new Error('No plan found for this subscription.');
    }

    const productId = (plan.product as Stripe.Product).id;

    if (!productId) {
      throw new Error('No product ID found for this subscription.');
    }

    const userId = session.client_reference_id;
    if (!userId) {
      throw new Error("No user ID found in session's client_reference_id.");
    }

    const user = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, userId))
      .limit(1);

    if (user.length === 0) {
      throw new Error('User not found in database.');
    }

    const currentUser = user[0];
    if (!currentUser) {
      throw new Error('User not found in database.');
    }

    const userOrganization = await db
      .select({
        organizationId: organizationMemberships.organizationId,
      })
      .from(organizationMemberships)
      .where(eq(organizationMemberships.userId, currentUser.id))
      .limit(1);

    if (userOrganization.length === 0) {
      throw new Error('User is not associated with any organization.');
    }

    // Update user profile with subscription info instead of organization
    await db
      .update(userProfiles)
      .set({
        subscriptionTier: (() => {
          const productName = (
            plan.product as Stripe.Product
          ).name?.toLowerCase();
          if (productName === 'individual') return 'individual';
          if (productName === 'professional') return 'professional';
          if (productName === 'leader') return 'leader';
          if (productName === 'institutional') return 'institutional';
          return 'professional';
        })(),
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, currentUser.id));

    await setSession(toUserProfileResponseDTO(currentUser));
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Error handling successful checkout:', error);

    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return NextResponse.redirect(
        new URL('/pricing?error=invalid_session', request.url)
      );
    }

    return NextResponse.redirect(new URL('/error', request.url));
  }
}
