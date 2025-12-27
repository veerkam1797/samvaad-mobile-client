import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const user = {
  clerkId: v.string(),
  name: v.string(),
  email: v.string(),
  imageUrl: v.optional(v.string()),
  preferences: v.object({
    preferredLanguage: v.string(),
    needsBraille: v.boolean(),
    needsISL: v.boolean(),
    fontSize: v.optional(v.number()),
  }),
  createdAt: v.number(),
};

export default defineSchema({
  users: defineTable(user)
    .index('by_clerk_id', ['clerkId'])
    .index('by_email', ['email']),

  // Keep your other tables here (sessions, messages, etc.)
});
