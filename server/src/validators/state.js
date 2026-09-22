import { z } from "zod";

export const stateSchema = z.object({
  slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(100),
  capital: z.string().trim().min(2).max(100),
  description: z.string().trim().min(20),
  image: z.string().trim().min(1),
  imageAlt: z.string().trim().min(5),
  popularCities: z.array(z.string().trim().min(1)).default([]),
  popularDestinationSlugs: z.array(z.string().trim().min(1)).default([]),
  culture: z.string().trim().min(10),
  cuisine: z.string().trim().min(10),
  bestTime: z.string().trim().min(2),
});

export const stateUpdateSchema = stateSchema.partial();
