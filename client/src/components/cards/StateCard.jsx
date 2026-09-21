import { Link } from "react-router-dom";

function StateCard({ state }) {
  return (
    <article className="card state-card">
      <img src={state.image} alt={state.imageAlt} loading="lazy" />
      <div className="card__body">
        <span className="card__eyebrow">Capital: {state.capital}</span>
        <h3>{state.name}</h3>
        <p>{state.description}</p>
        <Link className="card__link" to={`/states/${state.slug}`}>
          Explore state <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default StateCard;
