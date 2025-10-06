// ============================================================================
// STRIPE CHECKOUT API ROUTES
// ============================================================================
// Type-safe API endpoints for Stripe checkout handling with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import { toUserProfileResponseDTO } from '@/lib/mappers/user';
import { db, organizationMemberships, userProfiles } from '@platform/database';
import { setSession } from '@platform/shared/auth/session';
import { stripe } from '@platform/shared/payments/stripe';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';
import { z } from 'zod';
import { createGetHandler } from '../../../../../lib/api/route-handlers';

// ============================================================================
// STRIPE CHECKOUT SCHEMAS
// ============================================================================

/**
 * Stripe checkout parameters schema
 */
const StripeCheckoutParamsSchema = z.object({
  session_id: z.string().min(1, 'Session ID is required'),
});

/**
 * Stripe checkout response schema
 */
const StripeCheckoutResponseSchema = z.object({
  success: z.boolean(),
  redirectUrl: z.string().url(),
  message: z.string(),
});

// ============================================================================
// GET /api/stripe/checkout - Handle successful Stripe checkout
// ============================================================================

export const GET = createGetHandler({
  inputSchema: StripeCheckoutParamsSchema,
  outputSchema: StripeCheckoutResponseSchema,
  requireAuth: false, // This is a callback from Stripe
  handler: async (validatedParams, context) => {
    try {
      const { session_id: sessionId } = validatedParams;

      // Retrieve Stripe session
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

      // Get user from database
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

      // Check if user is associated with an organization
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

      // Update user profile with subscription info
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

      // Set session with updated user data
      await setSession(toUserProfileResponseDTO(currentUser));

      return {
        success: true,
        redirectUrl: '/dashboard',
        message: 'Checkout completed successfully',
      };
    } catch (error) {
      console.error('Error handling successful checkout:', error);

      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors);
        return {
          success: false,
          redirectUrl: '/pricing?error=invalid_session',
          message: 'Invalid session parameters',
        };
      }

      return {
        success: false,
        redirectUrl: '/error',
        message: 'Checkout processing failed',
      };
    }
  },
});
