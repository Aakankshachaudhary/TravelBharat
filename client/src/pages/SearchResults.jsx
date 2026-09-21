import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DestinationCard from "../components/cards/DestinationCard";
import EmptyState from "../components/ui/EmptyState";
import FilterPanel from "../components/ui/FilterPanel";
import SearchBar from "../components/ui/SearchBar";
import { DESTINATION_CATEGORIES } from "../constants/appConstants";
import { destinations } from "../data/destinations";
import { states } from "../data/states";
import {
  filterDestinations,
  searchDestinations,
  sortDestinations,
} from "../utils/search";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "name-desc", label: "Name: Z–A" },
];

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "relevance";

  const stateOptions = useMemo(
    () => states.map((item) => ({ value: item.slug, label: item.name })),
    [],
  );

  const cityOptions = useMemo(() => {
    const filtered = state
      ? destinations.filter((item) => item.stateSlug === state)
      : destinations;
    return [
      ...new Set(
        filtered
          .map(
            (item) =>
              item.city ||
              item.location
                ?.split(",")[0]
                ?.replace(/^Near\s+/i, "")
                .trim(),
          )
          .filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [state]);

  const filters = useMemo(
    () => [
      { name: "state", label: "State / UT", options: stateOptions },
      {
        name: "city",
        label: "City",
        options: cityOptions.map((item) => ({ value: item, label: item })),
      },
      {
        name: "category",
        label: "Category",
        options: DESTINATION_CATEGORIES.map((item) => ({
          value: item.name,
          label: item.name,
        })),
      },
    ],
    [stateOptions, cityOptions],
  );

  const results = useMemo(() => {
    const searched = searchDestinations(destinations, states, query);
    const filtered = filterDestinations(searched, states, {
      state,
      city,
      category,
    });
    return sortDestinations(filtered, states, sort, query);
  }, [query, state, city, category, sort]);

  function updateParams(changes) {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    if (changes.state !== undefined && changes.state !== state)
      next.delete("city");
    setSearchParams(next);
  }

  function handleSearch(value) {
    updateParams({ q: value });
  }

  function handleFilterChange(name, value) {
    updateParams({ [name]: value });
  }

  function clearFilters() {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    setSearchParams(next);
  }

  const hasFilters = Boolean(state || city || category || sort !== "relevance");
  const hasQuery = Boolean(query);

  return (
    <section className="page-intro search-page">
      <div className="container">
        <span className="section-kicker">Discover India</span>
        <h1>Find a place that fits your journey.</h1>
        <p className="search-page__intro">
          Search across TravelBharat destinations by place, state, city,
          category or travel interest.
        </p>

        <div className="search-page__bar">
          <SearchBar
            initialValue={query}
            onSearch={handleSearch}
            placeholder="Try Jaipur, Rajasthan, Fort, Beach or Temple"
          />
        </div>

        <div className="search-suggestions" aria-label="Popular searches">
          <span>Try:</span>
          {["Jaipur", "Rajasthan", "Fort", "Beach", "Temple"].map(
            (suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSearch(suggestion)}
              >
                {suggestion}
              </button>
            ),
          )}
        </div>

        <div className="search-toolbar">
          <div>
            <strong>{results.length}</strong>{" "}
            {results.length === 1 ? "destination" : "destinations"}
            {hasQuery && <span> matching “{query}”</span>}
          </div>
          <label className="sort-control">
            <span>Sort by</span>
            <select
              value={sort}
              onChange={(event) => updateParams({ sort: event.target.value })}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="search-layout">
          <div>
            <FilterPanel
              filters={filters}
              values={{ state, city, category }}
              onChange={handleFilterChange}
            />
            {hasFilters && (
              <button
                className="clear-filters"
                type="button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="search-results" aria-live="polite">
            {results.length ? (
              <div className="destination-grid">
                {results.map((destination) => (
                  <DestinationCard
                    key={destination.slug}
                    destination={destination}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No destinations found"
                message="Try a broader place name, remove a filter, or choose one of the suggested searches above."
              />
            )}
          </div>
        </div>

        {!results.length && !hasQuery && !state && !city && !category && (
          <div className="search-discovery-note">
            <span aria-hidden="true">✦</span>
            <div>
              <strong>Search is ready for discovery</strong>
              <p>
                Use a destination, state, city, category or landmark term to
                start exploring.
              </p>
            </div>
          </div>
        )}

        <p className="search-page__back">
          <Link to="/states">
            Prefer browsing? Explore all states and UTs →
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SearchResults;
