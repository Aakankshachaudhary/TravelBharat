import { Link } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";

function NotFound() {
  return (
    <section className="page-intro page-intro--center">
      <PageMeta title="Page not found" description="The TravelBharat page you requested could not be found." />
      <div className="container narrow-content">
        <span className="section-kicker">404</span>
        <h1>We couldn't find that page.</h1>
        <p>The page may have moved or the address may be incorrect.</p>
        <div className="error-actions">
          <Link className="button button--primary" to="/">Back to homepage</Link>
          <Link className="button button--ghost" to="/search">Search destinations</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;