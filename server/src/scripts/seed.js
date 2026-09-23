import { connectDatabase, disconnectDatabase } from "../config/db.js";
import State from "../models/State.js";
import Destination from "../models/Destination.js";
import City from "../models/City.js";
import Category from "../models/Category.js";
import Admin from "../models/Admin.js";
import { hashPassword } from "../utils/auth.js";
import { env } from "../config/env.js";
import states from "../data/states.json" with { type: "json" };
import destinations from "../data/destinations.json" with { type: "json" };

const categories = ["Heritage", "Nature", "Religious", "Adventure", "Beach"].map((name) => ({
  name,
  slug: name.toLowerCase(),
  description: `${name} experiences and destinations across India.`,
}));

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

await connectDatabase();
await State.deleteMany({});
await Destination.deleteMany({});
await City.deleteMany({});
await Category.deleteMany({});

await State.insertMany(states.map(({ id, ...state }) => state));
await Destination.insertMany(destinations.map(({ id, ...destination }) => ({
  ...destination,
  city: destination.city || destination.location?.split(",")[0]?.replace(/^Near\s+/i, "").trim(),
})));
await Category.insertMany(categories);

const cities = [...new Map(
  states.flatMap((state) => state.popularCities.map((name) => [
    `${state.slug}-${slugify(name)}`,
    { name, slug: `${state.slug}-${slugify(name)}`, stateSlug: state.slug },
  ]))
).values()];
await City.insertMany(cities);

if (env.adminEmail && env.adminPassword) {
  const passwordHash = await hashPassword(env.adminPassword);
  await Admin.updateOne({ email: env.adminEmail.toLowerCase() }, { $set: { name: "TravelBharat Admin", role: "admin", active: true, passwordHash } }, { upsert: true });
}

console.log(`Seeded ${states.length} states, ${destinations.length} destinations, ${cities.length} cities and ${categories.length} categories.`);
await disconnectDatabase();
