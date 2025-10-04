import { getUser } from '@platform/database/queries';

export async function GET() {
  const user = await getUser();
  return Response.json(user);
}
