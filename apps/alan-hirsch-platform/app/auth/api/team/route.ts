import { getTeamForUser } from '@platform/database';

export async function GET() {
  // TODO: Get user ID from authentication
  // For now, return null until auth is properly implemented
  const team = await getTeamForUser('temp-user-id');
  return Response.json(team);
}
