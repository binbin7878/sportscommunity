import { getProviders } from 'next-auth/react';

export async function GET(request) {
  const providers = await getProviders();
  return new Response(JSON.stringify(providers), {
    headers: { 'Content-Type': 'application/json' },
  });
}