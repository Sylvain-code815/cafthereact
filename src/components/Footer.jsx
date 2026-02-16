import React from "react";
import {Link} from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
        <Link to="/" className="footer-brand">
            <p>cafthé</p>
        </Link>
      <p> {new Date().getFullYear()} CafThé - Tous droits réservés</p>
    </footer>
  );
};

export default Footer;
