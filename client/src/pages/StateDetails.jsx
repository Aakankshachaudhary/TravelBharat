import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StateCard from "../components/cards/StateCard";
import DestinationCard from "../components/cards/DestinationCard";
import EmptyState from "../components/ui/EmptyState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import { api } from "../services/api";

function StateDetails() {
  const { stateSlug } = useParams();
  const [state, setState] = useState(null);
  const [allStates, setAllStates] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    Promise.all([api.getState(stateSlug), api.getStates()])
      .then(([stateData, statesData]) => {
        if (!active) return;
        setState(stateData);
        setAllStates(statesData);
        setStatus("success");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setStatus(err.status === 404 ? "not-found" : "error");
      });
    return () => {
      active = false;
    };
  }, [stateSlug]);

  if (status === "loading")
    return (
      <section className="page-intro">
        <div className="container">
          <LoadingSpinner />
        </div>
      </section>
    );

  if (status === "not-found") {
    return (
      <section className="page-intro page-intro--center">
        <div className="container narrow-content">
          <EmptyState
            title="State not found"
            message="We could not find this state or union territory in TravelBharat."
          />
          <Link className="button button--primary" to="/states">
            Back to states
          </Link>
        </div>
      </section>
    );
  }

  if (status === "error")
    return (
      <section className="page-intro">
        <div className="container">
          <ErrorMessage title="Could not load state" message={error} />
        </div>
      </section>
    );

  const popularDestinations = state.destinations || [];
  const relatedStates = allStates
    .filter((item) => item.slug !== state.slug)
    .slice(0, 4);

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero__grid">
          <div>
            <Link className="breadcrumb" to="/states">
              ← All states
            </Link>
            <span className="section-kicker">State guide</span>
            <h1>{state.name}</h1>
            <p>{state.description}</p>
            <div className="detail-facts">
              <div>
                <span>Capital</span>
                <strong>{state.capital}</strong>
              </div>
              <div>
                <span>Popular cities</span>
                <strong>{state.popularCities.length}</strong>
              </div>
              <div>
                <span>Featured destinations</span>
                <strong>{popularDestinations.length}</strong>
              </div>
            </div>
          </div>
          <img src={state.image} alt={state.imageAlt} />
        </div>
      </section>

      <section className="section">
        <div className="container state-overview-grid">
          <article className="content-panel">
            <span className="section-kicker">About the region</span>
            <h2>Culture, cuisine & travel context</h2>
            <div className="info-block">
              <h3>Culture</h3>
              <p>{state.culture}</p>
            </div>
            <div className="info-block">
              <h3>Cuisine</h3>
              <p>{state.cuisine}</p>
            </div>
            <div className="info-block">
              <h3>Best time to visit</h3>
              <p>{state.bestTime}</p>
            </div>
          </article>
          <article className="content-panel">
            <span className="section-kicker">Popular cities</span>
            <h2>Places to explore</h2>
            <div className="city-list">
              {state.popularCities.map((city) => (
                <span key={city}>{city}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Explore {state.name}</span>
              <h2>Popular destinations</h2>
            </div>
            <p>
              Open a destination guide for practical information and nearby
              places.
            </p>
          </div>
          {popularDestinations.length ? (
            <div className="destination-grid">
              {popularDestinations.map((destination) => (
                <DestinationCard
                  key={destination.slug}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Destination guides are being added"
              message="This region is already part of the state directory. Destination-level guides will be expanded as the content catalogue grows."
            />
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Keep exploring</span>
              <h2>More regions to discover</h2>
            </div>
          </div>
          <div className="state-grid">
            {relatedStates.map((item) => (
              <StateCard key={item.slug} state={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default StateDetails;