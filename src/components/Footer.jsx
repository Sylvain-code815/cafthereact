import React from "react";
import ProductCard from "./ProductCard.jsx";

const Footer = () => {
  return (
    <footer className="footer">
      <p> {new Date().getFullYear()} CafThé - Tous droits réservés</p>
    </footer>
  );
};

export default Footer;
