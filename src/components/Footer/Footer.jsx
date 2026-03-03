import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.jsx";
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
                    <div className="footer-social">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
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
