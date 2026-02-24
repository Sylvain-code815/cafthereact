import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { SearchContext } from "../context/SearchContext.jsx";
import "./styles/Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { totalArticles } = useContext(CartContext);
  const { isSearchOpen, openSearch, closeSearch } = useContext(SearchContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu mobile à chaque navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/src/Images/Logo-CafThe-en-couleur.webp" alt="CafThé" />
          </Link>

          <ul className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
            <li>
              <Link to="/the">Thés</Link>
            </li>
            <li>
              <Link to="/cafe">Cafés</Link>
            </li>
            <li>
              <Link to="/accessory">Accessoires</Link>
            </li>

            <li className="nav-mobile-auth">
              {isAuthenticated ? (
                  <>
                    {/* --- MODIFICATION ICI (Mobile) --- */}
                    <Link to="/account" className="nav-action-btn nav-account">
                      <img src="/src/Images/Icon/header-Login.svg" alt="Mon compte" />
                    </Link>
                    <button className="nav-logout" onClick={logout}>
                      Se déconnecter
                    </button>
                  </>
              ) : (
                  <Link to="/login" className="nav-mobile-login">
                    Se connecter
                  </Link>
              )}
            </li>
          </ul>

          <div className="nav-actions">
            <button
                className={`nav-action-btn${isSearchOpen ? " nav-action-active" : ""}`}
                aria-label="Rechercher"
                onClick={isSearchOpen ? closeSearch : openSearch}
            >
              <img src="/src/Images/Icon/header-Loupe.svg" alt="Rechercher" />
            </button>

            <div className="nav-auth-desktop">
              {isAuthenticated ? (
                  <>
                    {/* --- MODIFICATION ICI (Desktop) --- */}
                    <Link to="/account" className="nav-action-btn nav-account">
                      <img src="/src/Images/Icon/header-Login.svg" alt="Mon compte" />
                    </Link>
                    <button className="nav-logout" onClick={logout}>
                      Se déconnecter
                    </button>
                  </>
              ) : (
                  <Link to="/login" className="nav-action-btn nav-login">
                    <img src="/src/Images/Icon/header-Login.svg" alt="Mon compte" />
                    <span>Se connecter</span>
                  </Link>
              )}
            </div>

            <Link to="/panier" className="nav-action-btn nav-cart">
              <img src="/src/Images/Icon/header-Cart.svg" alt="Panier" />
              {totalArticles > 0 && (
                <span className="cart-badge">{totalArticles}</span>
              )}
            </Link>

            <button
              className={`nav-burger${menuOpen ? " nav-burger-open" : ""}`}
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
