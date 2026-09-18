import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">TravelBharat</Link>
      </div>

      <div>
        <Link to="/">Home</Link>
        <Link to="/states">Explore States</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;