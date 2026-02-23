import React from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";

const Footer = () => {
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

                <div className="footer-container">
                    <h3 className="title-footer">contact</h3>
                    <ul className="footer-list">
                        <li className="footer-item">
                            15 rue de la Paix<br />75002 Paris, France
                        </li>
                        <li className="footer-item">+33 1 23 45 67 89</li>
                        <li className="footer-item">contact@cafthe.fr</li>
                    </ul>
                </div>
                </div>

        </footer>
    );
};

export default Footer;
