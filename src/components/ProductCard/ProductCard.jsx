import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";


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

  const isPromo = produit.produit_promotion === 1 && produit.taux_remise > 0;
  const prixRemise = isPromo
    ? (produit.prix_ttc - produit.prix_ttc * (produit.taux_remise / 100)).toFixed(2)
    : null;

  return (
    <article className="product-card" style={{ animationDelay: `${index * 0.06}s` }}>
      <Link to={`/produit/${produit.code_produit}`} className="product-card-link">
        <div className="product-card-image-wrap">
          <img
            src={imageURL}
            alt={produit.nom_produit}
            className="product-card-img"
            loading="lazy"
          />
          {isPromo && (
            <span className="product-card-badge badge-promo">-{produit.taux_remise}%</span>
          )}
          {!isPromo && produit.produit_phare === 1 && (
            <span className="product-card-badge badge-phare">Best-seller</span>
          )}
          {produit.nouveaute === 1 && (
            <span className="product-card-badge badge-nouveaute">Nouveauté</span>
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
            {isPromo ? (
              <>
                <span className="product-card-price-old">{produit.prix_ttc}€</span>
                <span className="product-card-price">{prixRemise}€</span>
              </>
            ) : (
              <span className="product-card-price">{produit.prix_ttc}€</span>
            )}
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
    </article>
  );
};

export default ProductCard;
