import { getUser } from '@platform/database';

export async function GET() {
  const user = await getUser();
  return Response.json(user);
}
