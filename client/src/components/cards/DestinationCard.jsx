function DestinationCard({ destination }) {
  return (
    <article className="card destination-card">
      <img src={destination.image} alt={destination.name} loading="lazy" />
      <div className="card__body">
        <span className="card__eyebrow">{destination.category}</span>
        <h3>{destination.name}</h3>
        <p>{destination.location}</p>
        <button className="text-button" type="button">View details <span aria-hidden="true">→</span></button>
      </div>
    </article>
  );
}

export default DestinationCard;
