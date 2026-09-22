import State from "../models/State.js";
import Destination from "../models/Destination.js";
import City from "../models/City.js";
import Category from "../models/Category.js";
import Admin from "../models/Admin.js";
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

export async function seedDatabase() {
  const stateCount = await State.estimatedDocumentCount();
  const destinationCount = await Destination.estimatedDocumentCount();

  if (stateCount > 0 || destinationCount > 0) return;

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

  await Admin.updateOne(
    { email: "admin@travelbharat.local" },
    { $set: { name: "TravelBharat Admin", role: "admin", active: true } },
    { upsert: true },
  );

  console.log(`Database seeded: ${states.length} states, ${destinations.length} destinations.`);
}
