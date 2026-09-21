import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <article className="card destination-card">
      <img src={destination.image} alt={destination.imageAlt} loading="lazy" />
      <div className="card__body">
        <span className="card__eyebrow">{destination.category}</span>
        <h3>{destination.name}</h3>
        <p>{destination.location}</p>
        <Link className="text-button" to={`/destinations/${destination.slug}`}>
          View details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default DestinationCard;