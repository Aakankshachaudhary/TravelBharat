import { Link } from "react-router-dom";
import SafeImage from "../ui/SafeImage";

function DestinationCard({ destination }) {
  return (
    <article className="card destination-card">
      <SafeImage
        src={destination.image}
        alt={destination.imageAlt || `Illustrated travel visual for ${destination.name}`}
        loading="lazy"
        decoding="async"
        width="640"
        height="420"
      />
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