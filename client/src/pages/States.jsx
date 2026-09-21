import StateCard from "../components/cards/StateCard";
import { states } from "../data/states";

function States() {
  return (
    <section className="page-intro">
      <div className="container">
        <span className="section-kicker">Explore India</span>
        <h1>Indian States & Union Territories</h1>
        <p>Start with a state or union territory and discover its cities, destinations, culture, cuisine and travel information.</p>
        <div className="state-directory-meta">
          <span>{states.length} regions</span>
          <span>State-wise discovery</span>
          <span>Curated travel information</span>
        </div>
        <div className="state-grid state-grid--page">
          {states.map((state) => <StateCard key={state.slug} state={state} />)}
        </div>
      </div>
    </section>
  );
}

export default States;