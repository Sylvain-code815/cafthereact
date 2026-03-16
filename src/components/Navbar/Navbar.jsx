import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { CartContext } from "../../contexts/CartContext.jsx";
import { SearchContext } from "../../contexts/SearchContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { totalArticles } = useContext(CartContext);
  const { isSearchOpen, openSearch, closeSearch } = useContext(SearchContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu mobile à chaque navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]); // changement de route pour forcer fermeture

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeSearch}>
            <img src="/Images/Logo-CafThe-en-couleur.webp" alt="CafThé" />
          </Link>

          <ul className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
            <li>
              <NavLink to="/the" className={({isActive}) => isActive ? 'active' : ''}>Thés</NavLink>
            </li>
            <li>
              <NavLink to="/cafe" className={({isActive}) => isActive ? 'active' : ''}>Cafés</NavLink>
            </li>
            <li>
              <NavLink to="/accessory" className={({isActive}) => isActive ? 'active' : ''}>Accessoires</NavLink>
            </li>

            <li className="nav-mobile-auth">
              {isAuthenticated ? (
                  <>
                    {/* --- MODIFICATION ICI (Mobile) --- */}
                    <Link to="/account" className="nav-action-btn nav-account">
                      <img src="/Images/Icon/header-Login.svg" alt="Mon compte" />
                    </Link>
                    <button className="btn-outline nav-logout" onClick={logout}>
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
                onClick={() => { isSearchOpen ? closeSearch() : openSearch(); setMenuOpen(false); }}
            >
              <img src="/Images/Icon/header-Loupe.svg" alt="Rechercher" />
            </button>

            <div className="nav-auth-desktop">
              {isAuthenticated ? (
                  <>
                    {/* --- MODIFICATION ICI (Desktop) --- */}
                    <Link to="/account" className="nav-action-btn nav-account">
                      <img src="/Images/Icon/header-Login.svg" alt="Mon compte" />
                    </Link>
                    <button className="btn-outline nav-logout" onClick={logout}>
                      Se déconnecter
                    </button>
                  </>
              ) : (
                  <Link to="/login" className="nav-action-btn nav-login">
                    <img src="/Images/Icon/header-Login.svg" alt="Mon compte" />
                    <span>Se connecter</span>
                  </Link>
              )}
            </div>

            <Link to="/panier" className="nav-action-btn nav-cart">
              <img src="/Images/Icon/header-Cart.svg" alt="Panier" />
              {totalArticles > 0 && (
                <span className="cart-badge">{totalArticles}</span>
              )}
            </Link>

            <button
              className={`nav-burger${menuOpen ? " nav-burger-open" : ""}`}
              aria-label="Menu"
              aria-expanded={menuOpen}
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
