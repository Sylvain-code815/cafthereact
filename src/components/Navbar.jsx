import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";

const Navbar = () => {
    const {user, isAuthenticated, logout} = useContext(AuthContext);

    const handleLogout = async () => {
        logout();
    }

    return (
        <nav className="nav-left">
            <Link to="/" className="navbar-brand">
                CafThé
            </Link>

            <div className="nav-right">
                {/* Affichage conditionnel : connecté au non */}
                {isAuthenticated ? (
                    <>
                        <span className="navbar-user">
                            Bonjour {user.prenom} {user.nom}
                        </span>
                        <button className="navbar-logout-button"
                        onClick={handleLogout}>
                            Se déconnecter
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="navbar-login">
                        Se connecter
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;