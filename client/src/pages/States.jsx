import StateCard from "../components/cards/StateCard";
import { featuredStates } from "../data/homeData";

function States() {
  return (
    <section className="page-intro">
      <div className="container">
        <span className="section-kicker">Explore India</span>
        <h1>Indian States & Union Territories</h1>
        <p>Start with a state and discover its cities, destinations, culture, cuisine and travel information.</p>
        <div className="state-grid state-grid--page">
          {featuredStates.map((state) => <StateCard key={state.name} state={state} />)}
        </div>
      </div>
    </section>
  );
}

export default States;