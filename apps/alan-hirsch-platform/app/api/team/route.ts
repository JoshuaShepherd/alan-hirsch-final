import { getTeamForUser } from '@platform/database/queries';

export async function GET() {
  const team = await getTeamForUser();
  return Response.json(team);
}
