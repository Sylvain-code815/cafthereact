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
                        <li className="footer-item">Nos thés</li>
                        <li className="footer-item">Nos Cafés</li>
                        <li className="footer-item">Accessoires</li>
                        <li className="footer-item">Nos promotions</li>
                        <li className="footer-item copyright">
                            {new Date().getFullYear()} CafThé - Tous droits réservés
                        </li>
                    </ul>
                </div>

                <div className="footer-container">
                    <h3 className="title-footer">service en ligne</h3>
                    <ul className="footer-list">
                        <li className="footer-item">Livraison & Retours</li>
                        <li className="footer-item">Conditions générales</li>
                        <li className="footer-item">Politique de Confidentialité</li>
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