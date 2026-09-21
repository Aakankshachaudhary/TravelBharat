import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import StateCard from "../components/cards/StateCard";
import DestinationCard from "../components/cards/DestinationCard";
import CategoryCard from "../components/cards/CategoryCard";
import { DESTINATION_CATEGORIES } from "../constants/appConstants";
import { featuredStates, popularDestinations } from "../data/homeData";

function Home() {
  const navigate = useNavigate();

  function handleSearch(value) {
    if (!value) return;
    navigate(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <>
      <section className="hero-section">
        <div className="container hero-section__content">
          <div className="hero-section__copy">
            <span className="section-kicker">Your guide to India</span>
            <h1>
              Explore India, <span>state by state.</span>
            </h1>
            <p>
              Discover destinations, culture, food and travel information from
              across India in one thoughtfully organised place.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary" to="/search">
                Explore destinations <span aria-hidden="true">→</span>
              </Link>
              <Link className="button button--ghost" to="/states">
                Browse states
              </Link>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Aerial view representing India's diverse travel landscapes"
          >
            <div className="hero-visual__image" />
            <div className="hero-visual__badge">
              <strong>36</strong>
              <span>States & UTs</span>
            </div>
          </div>

          <div className="hero-search">
            <SearchBar onSearch={handleSearch} />
            <p className="search-feedback" aria-live="polite">
              Search by destination, state, city, category or landmark.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="explore-india">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Start exploring</span>
              <h2>India has a story for every traveller.</h2>
            </div>
            <p>
              From royal heritage to mountain escapes, discover experiences that
              match the way you want to travel.
            </p>
          </div>
          <div className="category-grid">
            {DESTINATION_CATEGORIES.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Popular right now</span>
              <h2>Places worth putting on your list.</h2>
            </div>
            <Link className="section-link" to="/states">
              View all states →
            </Link>
          </div>
          <div className="destination-grid">
            {popularDestinations.map((destination) => (
              <DestinationCard
                key={destination.name}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Featured states</span>
              <h2>Choose a state. Find your next experience.</h2>
            </div>
            <p>
              Explore destinations with context about the places, people and
              culture that make each state different.
            </p>
          </div>
          <div className="state-grid">
            {featuredStates.map((state) => (
              <StateCard key={state.name} state={state} />
            ))}
          </div>
        </div>
      </section>

      <section className="travel-info">
        <div className="container travel-info__inner">
          <div>
            <span className="section-kicker">Plan with confidence</span>
            <h2>Useful travel information, not just pretty places.</h2>
            <p>
              TravelBharat is being built to bring destination details, timing,
              entry information, nearby attractions and practical planning
              context together.
            </p>
          </div>
          <div className="info-list">
            <div>
              <span>01</span>
              <strong>Know before you go</strong>
              <p>Best time, timings and essential destination information.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Discover nearby</strong>
              <p>
                Find related places so one destination can become a complete
                itinerary.
              </p>
            </div>
            <div>
              <span>03</span>
              <strong>Explore by interest</strong>
              <p>
                Move between heritage, nature, religious, adventure and beach
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
