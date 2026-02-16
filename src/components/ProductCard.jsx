import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ produit }) => {
  const imageURL = produit.image
    ? `${import.meta.env.VITE_API_URL}/images/${produit.image}`
    : "https://placehold.co/600x400";
  const productReduct = produit.produit_promotion === 1 ? "card-promo" : "";

  return (
    <div className={`product-card ${productReduct}`}>
      <Link to={`/produit/${produit.code_produit}`} className="details-btn">
        <img
          src={imageURL}
          alt={produit.nom_produit}
          className="product-card-img"
        />
      </Link>

      <h3>{produit.nom_produit}</h3>
      <p>{produit.origine}</p>
      <div className="product-card-bottom">
        <p>{produit.prix_ttc}€</p>
        <p>/100g</p>
        <div className="product-card-panier">
          <Link to="cart" path="/cart">
            <img
              src="/src/Images/Icon/Button-ajout-panier.webp"
              alt="btn-ajout-panier"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
