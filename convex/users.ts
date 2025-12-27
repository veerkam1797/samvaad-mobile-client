import { internalMutation, mutation } from './_generated/server';
import { user } from './schema';

export const createUser = mutation({
  args: { ...user },
  handler: async (ctx, args) => {
    console.log('Create New User Fn +++++++++++>', JSON.stringify(createUser));
    const taskId = await ctx.db.insert('users', {
      ...args,
    });
    return taskId;
    // do something with `taskId`
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
