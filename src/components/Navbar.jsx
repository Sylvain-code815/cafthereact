import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/Navbar.css";
import { CartContext } from "../context/CartContext.jsx";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { totalArticles } = useContext(CartContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container-nav">
        <div className="nav-left">
          <Link to="/" className="navbar-brand">
            <img src="/Images/Logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="navbar-burger">
          <ul>
            <li>
              <Link to="/Cafe">Cafés</Link>
            </li>
            <li>
              <Link to="/The">Thés</Link>
            </li>
            <li>
              <Link to="/Accessory">Accessoires</Link>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <img src="/Images/Icons/Loupe.svg" />

          {isAuthenticated ? (
            // Utilisation de (<> ... </>) pour emballer les deux éléments
            <>
              <span className="navbar-user">Bonjour, {user?.prenom}</span>
              <button className="navbar-logout-button" onClick={handleLogout}>
                <span> Se déconnecter </span>
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-login">
              <img src="/Images/Icons/Login.svg" alt="Login" />
              <span>Se connecter</span>
            </Link>
          )}
          <Link to="/Cart" className="navbar-Cart">
            <img src="/Images/Icons/Cart.svg" alt="Cart" />
            <span>{totalArticles}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
