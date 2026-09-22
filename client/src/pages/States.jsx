import { useEffect, useState } from "react";
import StateCard from "../components/cards/StateCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import { api } from "../services/api";

function States() {
  const [states, setStates] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api
      .getStates()
      .then((data) => {
        if (active) {
          setStates(data);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
          setStatus("error");
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="page-intro">
      <div className="container">
        <span className="section-kicker">Explore India</span>
        <h1>Indian States & Union Territories</h1>
        <p>
          Start with a state or union territory and discover its cities,
          destinations, culture, cuisine and travel information.
        </p>

        {status === "loading" && <LoadingSpinner />}
        {status === "error" && (
          <ErrorMessage
            title="Could not load states"
            message={`${error}. Make sure the TravelBharat API and MongoDB are running.`}
          />
        )}
        {status === "success" && (
          <>
            <div className="state-directory-meta">
              <span>{states.length} regions</span>
              <span>Live API catalogue</span>
              <span>Curated travel information</span>
            </div>
            <div className="state-grid state-grid--page">
              {states.map((state) => (
                <StateCard key={state.slug} state={state} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default States;