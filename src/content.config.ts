import { defineCollection } from "astro:content";

import { file } from "astro/loaders";

import { z } from "astro/zod";

const channels = defineCollection({
  loader: file("src/content/channels.json"),
  schema: z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    aliases: z.array(z.string().min(1)).optional(),
    displayName: z.string().optional(),
    category: z.string(),
    description: z.string().optional(),
    imageUrl: z.url().optional(),
    players: z.array(
      z.object({
        url: z.url(),
        source: z.string().min(1),
      }),
    ),
  }),
});

export const collections = { channels };
