import { useState } from "react";
import { NavLink } from "react-router-dom";
import { APP_NAME, NAVIGATION_LINKS } from "../constants/appConstants";
import Button from "./ui/Button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Primary navigation">
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">TB</span>
          <span>{APP_NAME}</span>
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span aria-hidden="true">☰</span>
        </button>

        <div id="primary-navigation" className={`navbar__links ${isOpen ? "navbar__links--open" : ""}`}>
          {NAVIGATION_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
          <Button variant="secondary" className="navbar__cta">Plan a trip</Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;