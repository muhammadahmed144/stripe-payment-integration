import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close menu when resizing back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="store-navbar">
      <div className="nav-container">

        {/* BRAND */}
        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          <div className="brand-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="6"
                width="18"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />

              <path
                d="M3 10H21"
                stroke="currentColor"
                strokeWidth="2"
              />

              <path
                d="M7 15H11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span>PayStore</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="nav-links" aria-label="Main navigation">
          <a href="/#products">
            Products
          </a>

          <a href="/#security">
            Security
          </a>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? "orders-link active"
                : "orders-link"
            }
          >
            Orders
          </NavLink>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className={`mobile-menu-button ${
            menuOpen ? "open" : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE NAV */}
      <div
        className={`mobile-menu-wrapper ${
          menuOpen ? "show" : ""
        }`}
      >
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          <a
            href="/#products"
            onClick={closeMenu}
          >
            Products
            <span className="mobile-nav-arrow">→</span>
          </a>

          <a
            href="/#security"
            onClick={closeMenu}
          >
            Security
            <span className="mobile-nav-arrow">→</span>
          </a>

          <NavLink
            to="/orders"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "mobile-orders-link active"
                : "mobile-orders-link"
            }
          >
            Orders
            <span className="mobile-nav-arrow">→</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}