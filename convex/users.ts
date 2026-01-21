import { internalMutation, mutation } from './_generated/server';
import { user } from './schema';

export const createUser = mutation({
  args: { ...user },
  handler: async (ctx, args) => {
    if (__DEV__) {
      console.log('Create New User Fn ++++++++++++>');
    }
    const userId = await ctx.db.insert('users', {
      ...args,
    });
    return userId;
  },
});

export const createUserWithSocial = internalMutation({
  args: { ...user },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert('users', {
      ...args,
    });
    return userId;
  },
});
