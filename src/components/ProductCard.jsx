import React from "react";
import { Link } from "react-router-dom";
import "./styles/ProductCard.css";

const getUnitLabel = (typeVente) => {
  switch (typeVente) {
    case "Vrac": return "/ 100g";
    case "Sachet": return "/ sachet";
    case "Boite": return "/ boîte";
    case "Unité": return "/ unité";
    default: return "/ 100g";
  }
};

const ProductCard = ({ produit, onAddToCart = () => {}, index = 0 }) => {
  const imageURL = produit.image
    ? `${import.meta.env.VITE_API_URL}/images/${produit.image}`
    : "https://placehold.co/600x400";

  return (
    <div className="product-card" style={{ animationDelay: `${index * 0.06}s` }}>
      <Link to={`/produit/${produit.code_produit}`} className="product-card-link">
        <div className="product-card-image-wrap">
          <img
            src={imageURL}
            alt={produit.nom_produit}
            className="product-card-img"
            loading="lazy"
          />
          {produit.produit_promotion === 1 && (
            <span className="product-card-badge">Promo</span>
          )}
        </div>
      </Link>
      <div className="product-card-body">
        <div className="product-card-info">
          <h3 className="product-card-name">{produit.nom_produit}</h3>
          {produit.origine && (
            <p className="product-card-origin">{produit.origine}</p>
          )}
          <div className="product-card-price-row">
            <span className="product-card-price">{produit.prix_ttc}€</span>
            <span className="product-card-unit">{getUnitLabel(produit.type_vente)}</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(produit);
          }}
          className="btn-add-cart"
          aria-label={`Ajouter ${produit.nom_produit} au panier`}
        >
          <img
            src="/src/Images/Icon/Button-ajout-panier.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
