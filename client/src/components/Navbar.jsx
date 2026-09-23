import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { APP_NAME, NAVIGATION_LINKS } from "../constants/appConstants";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Primary navigation">
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">TB</span>
          <span>{APP_NAME}</span>
        </NavLink>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
        </button>

        <div
          id="primary-navigation"
          className={`navbar__links ${isOpen ? "navbar__links--open" : ""}`}
        >
          {NAVIGATION_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link--active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/admin/login" onClick={closeMenu} className="nav-link">
            Admin
          </NavLink>
          <Link className="button button--secondary navbar__cta" to="/search" onClick={closeMenu}>
            Plan a trip
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;