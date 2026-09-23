import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DestinationCard from "../components/cards/DestinationCard";
import EmptyState from "../components/ui/EmptyState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import PageMeta from "../components/ui/PageMeta";
import SafeImage from "../components/ui/SafeImage";
import { api } from "../services/api";

function DestinationDetails() {
  const { destinationSlug } = useParams();
  const [destination, setDestination] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    setError("");

    api.getDestination(destinationSlug)
      .then((data) => {
        if (active) {
          setDestination(data);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (!active || err.name === "AbortError") return;
        setError(err.message);
        setStatus(err.status === 404 ? "not-found" : "error");
      });

    return () => {
      active = false;
    };
  }, [destinationSlug, retryKey]);

  if (status === "loading") {
    return (
      <section className="page-intro">
        <div className="container"><LoadingSpinner label="Loading destination guide" /></div>
      </section>
    );
  }

  if (status === "not-found") {
    return (
      <section className="page-intro page-intro--center">
        <PageMeta title="Destination not found" />
        <div className="container narrow-content">
          <EmptyState
            title="Destination not found"
            message="We could not find this destination in TravelBharat."
          />
          <div className="error-actions">
            <Link className="button button--primary" to="/states">Explore states</Link>
            <Link className="button button--ghost" to="/search">Search destinations</Link>
          </div>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="page-intro">
        <PageMeta title="Destination guide unavailable" />
        <div className="container">
          <ErrorMessage
            title="Could not load destination"
            message={error}
            onRetry={() => setRetryKey((key) => key + 1)}
          />
        </div>
      </section>
    );
  }

  const state = destination.state;
  const relatedDestinations = destination.relatedDestinations || [];

  return (
    <>
      <PageMeta
        title={`${destination.name} Travel Guide`}
        description={`${destination.name}: discover location, category, best time, entry information, timings and nearby attractions on TravelBharat.`}
      />
      <section className="destination-detail-hero">
        <SafeImage
          src={destination.image}
          alt={destination.imageAlt || `Travel visual for ${destination.name}`}
          width="1600"
          height="900"
          fetchPriority="high"
          decoding="async"
        />
        <div className="destination-detail-hero__overlay">
          <div className="container">
            <Link className="breadcrumb breadcrumb--light" to={state ? `/states/${state.slug}` : "/states"}>
              ← {state ? state.name : "Back to states"}
            </Link>
            <span className="section-kicker section-kicker--light">{destination.category}</span>
            <h1>{destination.name}</h1>
            <p>{destination.location}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container destination-layout">
          <article className="content-panel destination-description">
            <span className="section-kicker">Destination guide</span>
            <h2>About {destination.name}</h2>
            <p>{destination.description}</p>
            <h3>Historical significance</h3>
            <p>{destination.historicalSignificance}</p>
          </article>
          <aside className="travel-facts" aria-label="Destination information">
            <h2>Travel information</h2>
            <div><span>Category</span><strong>{destination.category}</strong></div>
            <div><span>Best time</span><strong>{destination.bestTime}</strong></div>
            <div><span>Entry fee</span><strong>{destination.entryFee}</strong></div>
            <div><span>Timings</span><strong>{destination.timings}</strong></div>
            <div><span>Location</span><strong>{destination.location}</strong></div>
          </aside>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-heading">
            <div><span className="section-kicker">Nearby attractions</span><h2>Continue your journey</h2></div>
            <p>Related destinations help travellers build a more connected plan.</p>
          </div>
          {relatedDestinations.length ? (
            <div className="destination-grid">
              {relatedDestinations.map((item) => <DestinationCard key={item.slug} destination={item} />)}
            </div>
          ) : (
            <EmptyState
              title="More nearby guides coming soon"
              message="This destination is part of the growing TravelBharat content catalogue."
            />
          )}
        </div>
      </section>
    </>
  );
}

export default DestinationDetails;