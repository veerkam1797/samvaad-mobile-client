import { httpRouter } from 'convex/server';
import { internal } from './_generated/api';
import { httpAction } from './_generated/server';

const http = httpRouter();

export const doSomething = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();

  if (__DEV__) {
    console.log('Webhook Data:', type);
  }

  switch (type) {
    case 'user.created':
      await ctx.runMutation(internal.users.createUserWithSocial, {
        clerkId: data.id,
        name: `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
        email: data.email_addresses?.[0]?.email_address ?? '',
        imageUrl: data.profile_image_url,
        preferences: {
          preferredLanguage: 'en',
          needsBraille: false,
          needsISL: false,
        },
        createdAt: Date.now(),
      });
      break;
    case 'user.updated':
      if (__DEV__) {
        console.log('User updated', data);
      }
      break;
    case 'user.deleted':
      if (__DEV__) {
        console.log('User deleted', data);
      }
      break;
    default:
      break;
  }

  return new Response(null, { status: 200 });
});

// Webhook endpoint for Clerk
// https://disciplined-perch-485.convex.site/clerk-users-webhook

http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: doSomething,
});

export default http;
