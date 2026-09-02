import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close mobile menu with Escape
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

  // Close menu when resizing to desktop
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

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (menuOpen && window.innerWidth <= 700) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="store-navbar">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

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


        {/* =====================================================
            DESKTOP NAV
        ===================================================== */}

        <nav
          className="nav-links"
          aria-label="Main navigation"
        >
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


        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

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


      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}

      <div
        className={`mobile-menu-wrapper ${
          menuOpen ? "show" : ""
        }`}
      >

        {/* OVERLAY */}

        <div
          className="mobile-menu-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />


        {/* SIDEBAR */}

        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >

          {/* SIDEBAR HEADER */}

          <div className="mobile-sidebar-header">

            <div className="mobile-sidebar-brand">

              <div className="mobile-sidebar-icon">
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

            </div>


            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="mobile-sidebar-close"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <span />
              <span />
            </button>

          </div>


          {/* SIDEBAR LINKS */}

          <div className="mobile-nav-links">

            <a
              href="/#products"
              onClick={closeMenu}
            >
              <span>Products</span>

              <span className="mobile-nav-arrow">
                →
              </span>
            </a>


            <a
              href="/#security"
              onClick={closeMenu}
            >
              <span>Security</span>

              <span className="mobile-nav-arrow">
                →
              </span>
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
              <span>Orders</span>

              <span className="mobile-nav-arrow">
                →
              </span>
            </NavLink>

          </div>


          {/* SIDEBAR FOOTER */}

          <div className="mobile-sidebar-footer">
            <span>Secure payments</span>

            <span className="security-dot" />
          </div>

        </nav>

      </div>

    </header>
  );
}