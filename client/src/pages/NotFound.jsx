import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page-intro page-intro--center">
      <div className="container narrow-content">
        <span className="section-kicker">404</span>
        <h1>We couldn't find that page.</h1>
        <p>The page may have moved or the address may be incorrect.</p>
        <Link className="button button--primary" to="/">Back to homepage</Link>
      </div>
    </section>
  );
}

export default NotFound;