import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuickView from "../QuickView/QuickView.jsx";
import { getUnitLabel } from "../../utils/product.js";
import "./ProductCard.css";

const ProductCard = ({ produit, onAddToCart = () => {}, index = 0 }) => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const imageURL = produit.image
    ? `${import.meta.env.VITE_API_URL}/images/${produit.image}`
    : "https://placehold.co/600x400";

  const isPromo = produit.produit_promotion === 1 && produit.taux_remise > 0;
  const prixRemise = isPromo
    ? (produit.prix_ttc - produit.prix_ttc * (produit.taux_remise / 100)).toFixed(2)
    : null;

  return (
    <article className="product-card" style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="product-card-media">
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
        {/* Aperçu rapide sans quitter la page (CDC 4.2.1) : bouton hors du lien pour rester valide */}
        <button
          type="button"
          className="product-card-quickview"
          onClick={() => setQuickViewOpen(true)}
          aria-label={`Aperçu rapide de ${produit.nom_produit}`}
          aria-haspopup="dialog"
        >
          Aperçu rapide
        </button>
      </div>
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
            src="/Images/Icon/Button-ajout-panier.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
      {quickViewOpen && (
        <QuickView produit={produit} onClose={() => setQuickViewOpen(false)} />
      )}
    </article>
  );
};

export default ProductCard;
