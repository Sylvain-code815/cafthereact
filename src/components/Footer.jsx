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
                        <Link to="the" className="footer-item">
                            Nos thés
                        </Link>
                        <Link to="the" className="footer-item">
                            Nos Cafés
                        </Link>
                        <Link to="the" className="footer-item">
                            Accessoires
                        </Link>
                        <Link to="the" className="footer-item">
                            Nos promotions
                        </Link>
                            {new Date().getFullYear()} CafThé - Tous droits réservés
                    </ul>
                </div>

                <div className="footer-container">
                    <h3 className="title-footer">service en ligne</h3>
                    <ul className="footer-list">
                        <Link to="the" className="footer-item">
                            Livraison & Retours
                        </Link>
                        <Link to="the" className="footer-item">
                            Conditions générales
                        </Link>
                        <Link to="the" className="footer-item">
                            Politique de Confidentialité
                        </Link>
                        <Link to="the" className="footer-item">
                            Plan du site
                        </Link>
                    </ul>
                </div>

                <div className="footer-container">
                    <h3 className="title-footer">contact</h3>
                    <ul className="footer-list">
                        <Link to="the" className="footer-item">
                            15 rue de la Paix<br />75002 Paris, France
                        </Link>
                        <Link to="the" className="footer-item">
                            +33 1 23 45 67 89
                        </Link>
                        <Link to="the" className="footer-item">
                            contact@cafthe.fr
                        </Link>
                    </ul>
                </div>
                </div>

        </footer>
    );
};

export default Footer;