import { useEffect, useState } from "react";
import StateCard from "../components/cards/StateCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import PageMeta from "../components/ui/PageMeta";
import { api } from "../services/api";

function States() {
  const [states, setStates] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    setError("");

    api.getStates()
      .then((data) => {
        if (active) {
          setStates(data);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (active && err.name !== "AbortError") {
          setError(err.message);
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [retryKey]);

  return (
    <section className="page-intro">
      <PageMeta
        title="Indian States & Union Territories"
        description="Browse TravelBharat's state and union territory directory with destinations, cities, culture and practical travel context."
      />
      <div className="container">
        <span className="section-kicker">Explore India</span>
        <h1>Indian States & Union Territories</h1>
        <p>
          Start with a state or union territory and discover its cities,
          destinations, culture, cuisine and travel information.
        </p>

        {status === "loading" && <LoadingSpinner label="Loading states" />}
        {status === "error" && (
          <ErrorMessage
            title="Could not load states"
            message={`${error} Make sure the TravelBharat API is running and try again.`}
            onRetry={() => setRetryKey((key) => key + 1)}
          />
        )}
        {status === "success" && (
          <>
            <div className="state-directory-meta" aria-label="Catalogue summary">
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