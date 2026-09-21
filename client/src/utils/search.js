function normalize(value = "") {
  return String(value).toLowerCase().trim();
}

export function getDestinationCity(destination) {
  return (
    destination.city ||
    destination.location
      ?.split(",")[0]
      ?.replace(/^Near\s+/i, "")
      .trim() ||
    ""
  );
}

export function getDestinationSearchText(destination, stateName = "") {
  return normalize(
    [
      destination.name,
      destination.location,
      destination.category,
      destination.description,
      destination.historicalSignificance,
      destination.bestTime,
      stateName,
      getDestinationCity(destination),
      ...(destination.nearbyAttractions || []),
    ].join(" "),
  );
}

export function searchDestinations(destinations, states, query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return destinations;

  return destinations.filter((destination) => {
    const state = states.find((item) => item.slug === destination.stateSlug);
    return getDestinationSearchText(destination, state?.name).includes(
      normalizedQuery,
    );
  });
}

export function filterDestinations(destinations, states, filters) {
  const { state = "", city = "", category = "" } = filters;

  return destinations.filter((destination) => {
    const destinationState = states.find(
      (item) => item.slug === destination.stateSlug,
    );
    const destinationCity = getDestinationCity(destination);

    const matchesState = !state || destination.stateSlug === state;
    const matchesCity = !city || normalize(destinationCity) === normalize(city);
    const matchesCategory = !category || destination.category === category;

    return (
      matchesState &&
      matchesCity &&
      matchesCategory &&
      Boolean(destinationState)
    );
  });
}

export function sortDestinations(destinations, states, sort, query = "") {
  const sorted = [...destinations];
  const normalizedQuery = normalize(query);

  if (sort === "name-asc") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "name-desc") {
    return sorted.sort((a, b) => b.name.localeCompare(a.name));
  }

  return sorted.sort((a, b) => {
    const stateA = states.find((item) => item.slug === a.stateSlug)?.name || "";
    const stateB = states.find((item) => item.slug === b.stateSlug)?.name || "";

    if (normalizedQuery) {
      const aText = getDestinationSearchText(a, stateA);
      const bText = getDestinationSearchText(b, stateB);
      const aStarts = aText.startsWith(normalizedQuery)
        ? 0
        : a.name.toLowerCase().startsWith(normalizedQuery)
          ? 1
          : 2;
      const bStarts = bText.startsWith(normalizedQuery)
        ? 0
        : b.name.toLowerCase().startsWith(normalizedQuery)
          ? 1
          : 2;
      if (aStarts !== bStarts) return aStarts - bStarts;
    }

    return a.name.localeCompare(b.name);
  });
}
