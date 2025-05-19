import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  images: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    createdAt: v.number(),
  }),
});

