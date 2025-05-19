import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getImages = query({
  handler: async (ctx) => {
    return await ctx.db.query('images').order('desc').collect();
  },
});

export const addImage = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('images', {
      title: args.title,
      description: args.description,
      imageUrl: args.imageUrl,
      createdAt: Date.now(),
    });
  },
});

export const deleteImage = mutation({
    args: {
      id: v.id('images'),
    },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
  });
  