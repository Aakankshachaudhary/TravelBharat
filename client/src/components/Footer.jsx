import { Link } from "react-router-dom";
import { APP_NAME } from "../constants/appConstants";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand brand--footer" to="/">
            <span className="brand__mark" aria-hidden="true">TB</span>
            <span>{APP_NAME}</span>
          </Link>
          <p className="footer-copy">
            Discover India state by state, with practical information to help you plan your next journey.
          </p>
        </div>

        <div>
          <h2>Explore</h2>
          <Link to="/states">Indian States</Link>
          <Link to="/about">About TravelBharat</Link>
        </div>

        <div>
          <h2>Travel information</h2>
          <span>Best time to visit</span>
          <span>Local experiences</span>
          <span>Destination guides</span>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 {APP_NAME}. Explore India, State by State.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;