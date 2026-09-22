import { z } from "zod";

const optionalStringArray = z.array(z.string().trim().min(1)).optional().default([]);

export const destinationSchema = z.object({
  slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(120),
  stateSlug: z.string().trim().min(2),
  location: z.string().trim().min(2).max(180),
  city: z.string().trim().min(2).max(100).optional(),
  category: z.string().trim().min(2).max(60),
  image: z.string().trim().min(1),
  imageAlt: z.string().trim().min(5).max(180),
  description: z.string().trim().min(20),
  historicalSignificance: z.string().trim().min(20),
  bestTime: z.string().trim().min(2),
  entryFee: z.string().trim().min(2),
  timings: z.string().trim().min(2),
  nearbyAttractions: optionalStringArray,
  relatedDestinationSlugs: optionalStringArray,
});

export const destinationUpdateSchema = destinationSchema.partial();
