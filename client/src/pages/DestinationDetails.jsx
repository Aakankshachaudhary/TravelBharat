import { Link, useParams } from "react-router-dom";
import DestinationCard from "../components/cards/DestinationCard";
import EmptyState from "../components/ui/EmptyState";
import { destinationBySlug } from "../data/destinations";
import { stateBySlug } from "../data/states";

function DestinationDetails() {
  const { destinationSlug } = useParams();
  const destination = destinationBySlug[destinationSlug];

  if (!destination) {
    return (
      <section className="page-intro page-intro--center">
        <div className="container narrow-content">
          <EmptyState title="Destination not found" message="We could not find this destination in TravelBharat." />
          <Link className="button button--primary" to="/states">Explore states</Link>
        </div>
      </section>
    );
  }

  const state = stateBySlug[destination.stateSlug];
  const relatedDestinations = destination.relatedDestinationSlugs
    .map((slug) => destinationBySlug[slug])
    .filter(Boolean);

  return (
    <>
      <section className="destination-detail-hero">
        <img src={destination.image} alt={destination.imageAlt} />
        <div className="destination-detail-hero__overlay">
          <div className="container">
            <Link className="breadcrumb breadcrumb--light" to={state ? `/states/${state.slug}` : "/states"}>← {state ? state.name : "Back to states"}</Link>
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
            <div>
              <span className="section-kicker">Nearby attractions</span>
              <h2>Continue your journey</h2>
            </div>
            <p>Related destinations help travellers build a more connected plan instead of visiting one place in isolation.</p>
          </div>
          {relatedDestinations.length ? (
            <div className="destination-grid">
              {relatedDestinations.map((item) => <DestinationCard key={item.slug} destination={item} />)}
            </div>
          ) : (
            <EmptyState title="More nearby guides coming soon" message="This destination is part of the growing TravelBharat content catalogue." />
          )}
        </div>
      </section>
    </>
  );
}

export default DestinationDetails;
