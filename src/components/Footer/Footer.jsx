import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import "./Footer.css";

const Footer = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <footer className="footer">
            <Link to="/" className="footer-brand">
                cafthé
            </Link>

            <div className="footer-content">

                <div className="footer-container">
                    <h3 className="title-footer">explorer cafthé</h3>
                    <ul className="footer-list">
                        <li>
                            <Link to="/the" className="footer-link">Nos thés</Link>
                        </li>
                        <li>
                            <Link to="/cafe" className="footer-link">Nos Cafés</Link>
                        </li>
                        <li>
                            <Link to="/accessory" className="footer-link">Accessoires</Link>
                        </li>
                        <li>
                            <Link to="/promotions" className="footer-link">Nos promotions</Link>
                        </li>
                        <li className="footer-item copyright">
                            {new Date().getFullYear()} CafThé - Tous droits réservés
                        </li>
                    </ul>
                </div>

                <div className="footer-container">
                    <h3 className="title-footer">service en ligne</h3>
                    <ul className="footer-list">
                        <li>
                            <Link to="/livraison-retours" className="footer-link">Livraison & Retours</Link>
                        </li>
                        <li>
                            <Link to="/conditions-generales" className="footer-link">Conditions générales</Link>
                        </li>
                        <li>
                            <Link to="/politique-confidentialite" className="footer-link">Politique de Confidentialité</Link>
                        </li>
                        <li>
                            <Link to="/plan-du-site" className="footer-link">Plan du site</Link>
                        </li>
                    </ul>
                </div>

                <address className="footer-container">
                    <h3 className="title-footer">contact</h3>
                    <ul className="footer-list">
                        <li className="footer-item">
                            15 rue de la Paix<br />75002 Paris, France
                        </li>
                        <li className="footer-item">+33 1 23 45 67 89</li>
                        <li className="footer-item">contact@cafthe.fr</li>
                    </ul>

                </address>
                </div>

            <button
                className="footer-theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            >
                {theme === "dark" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                )}
            </button>

        </footer>
    );
};

export default Footer;
