import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DestinationCard from "../components/cards/DestinationCard";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import FilterPanel from "../components/ui/FilterPanel";
import SearchBar from "../components/ui/SearchBar";
import PageMeta from "../components/ui/PageMeta";
import { DESTINATION_CATEGORIES } from "../constants/appConstants";
import { api } from "../services/api";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "name", label: "Name: A–Z" },
  { value: "-name", label: "Name: Z–A" },
];

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [states, setStates] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [statesStatus, setStatesStatus] = useState("loading");
  const [destinationStatus, setDestinationStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  const query = searchParams.get("q") || "";
  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "relevance";

  useEffect(() => {
    let active = true;
    setStatesStatus("loading");

    api.getStates()
      .then((data) => {
        if (active) {
          setStates(data);
          setStatesStatus("success");
        }
      })
      .catch((err) => {
        if (active && err.name !== "AbortError") {
          setError(err.message);
          setStatesStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [retryKey]);

  useEffect(() => {
    let active = true;
    setDestinationStatus("loading");
    setError("");

    api.getDestinations({
      q: query,
      state,
      city,
      category,
      sort: sort === "relevance" ? "name" : sort,
    })
      .then((data) => {
        if (active) {
          setDestinations(data);
          setDestinationStatus("success");
        }
      })
      .catch((err) => {
        if (active && err.name !== "AbortError") {
          setError(err.message);
          setDestinationStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [query, state, city, category, sort, retryKey]);

  const stateOptions = useMemo(
    () => states.map((item) => ({ value: item.slug, label: item.name })),
    [states],
  );

  const cityOptions = useMemo(() => {
    const values = destinations
      .map((item) =>
        item.city ||
        item.location?.split(",")[0]?.replace(/^Near\s+/i, "").trim(),
      )
      .filter(Boolean);
    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }, [destinations]);

  function updateParams(changes) {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key),
    );
    if (changes.state !== undefined && changes.state !== state) next.delete("city");
    setSearchParams(next);
  }

  const hasFilters = Boolean(state || city || category || sort !== "relevance");
  const isLoading = statesStatus === "loading" || destinationStatus === "loading";
  const hasError = statesStatus === "error" || destinationStatus === "error";

  return (
    <section className="page-intro search-page">
      <PageMeta
        title={query ? `Search results for ${query}` : "Explore destinations"}
        description="Search TravelBharat's destination catalogue by place, state, city, category or travel interest."
      />
      <div className="container">
        <span className="section-kicker">Discover India</span>
        <h1>Find a place that fits your journey.</h1>
        <p className="search-page__intro">
          Search the live destination catalogue by place, state, city, category or travel interest.
        </p>
        <div className="search-page__bar">
          <SearchBar
            initialValue={query}
            onSearch={(value) => updateParams({ q: value })}
            placeholder="Try Jaipur, Rajasthan, Fort, Beach or Temple"
          />
        </div>
        <div className="search-suggestions" aria-label="Suggested searches">
          <span>Try:</span>
          {["Jaipur", "Rajasthan", "Fort", "Beach", "Temple"].map((item) => (
            <button key={item} type="button" onClick={() => updateParams({ q: item })}>
              {item}
            </button>
          ))}
        </div>

        {isLoading && <LoadingSpinner label="Searching destinations" />}

        {hasError && !isLoading && (
          <ErrorMessage
            title="Search service unavailable"
            message={error}
            onRetry={() => setRetryKey((key) => key + 1)}
          />
        )}

        {!isLoading && !hasError && (
          <>
            <div className="search-toolbar">
              <div aria-live="polite">
                <strong>{destinations.length}</strong>{" "}
                {destinations.length === 1 ? "destination" : "destinations"}
                {query && <span> matching “{query}”</span>}
              </div>
              <label className="sort-control" htmlFor="destination-sort">
                <span>Sort by</span>
                <select
                  id="destination-sort"
                  value={sort}
                  onChange={(e) => updateParams({ sort: e.target.value })}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="search-layout">
              <div>
                <FilterPanel
                  filters={[
                    { name: "state", label: "State / UT", options: stateOptions },
                    { name: "city", label: "City", options: cityOptions.map((item) => ({ value: item, label: item })) },
                    { name: "category", label: "Category", options: DESTINATION_CATEGORIES.map((item) => ({ value: item.name, label: item.name })) },
                  ]}
                  values={{ state, city, category }}
                  onChange={(name, value) => updateParams({ [name]: value })}
                />
                {hasFilters && (
                  <button
                    className="clear-filters"
                    type="button"
                    onClick={() => setSearchParams(query ? { q: query } : {})}
                  >
                    Clear filters
                  </button>
                )}
              </div>
              <div className="search-results" aria-live="polite">
                {destinations.length ? (
                  <div className="destination-grid">
                    {destinations.map((destination) => (
                      <DestinationCard key={destination.slug} destination={destination} />
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
            <p className="search-page__back">
              <Link to="/states">Prefer browsing? Explore all states and UTs →</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default SearchResults;
