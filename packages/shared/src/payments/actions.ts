'use server';

import { redirect } from 'next/navigation';
import { withTeam } from '../auth/middleware';
import { createCheckoutSession, createCustomerPortalSession } from './stripe';

export const checkoutAction = withTeam(async (formData, team) => {
  const priceId = formData.get('priceId') as string;
  // For now, use team.id as userId - this should be updated to get actual user ID
  await createCheckoutSession({ team, priceId, userId: team.id });
});

export const customerPortalAction = withTeam(async (_, team) => {
  const portalSession = await createCustomerPortalSession(team);
  redirect(portalSession.url);
});
