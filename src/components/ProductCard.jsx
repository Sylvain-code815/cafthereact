import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import "./styles/ProductCard.css";

const ProductCard = ({ produit }) => {
  const { addToCart } = useContext(CartContext);
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
        <div className="product-card-info">
      <h3>{produit.nom_produit}</h3>
      <p>{produit.origine}</p>
      <div className="product-card-bottom">
          <div className="product-infos-left">
            <p>{produit.prix_ttc}€</p>
            <p>/100g</p>
          </div>
            <div className="product-card-panier">
              <button onClick={() => addToCart(produit)} className="btn-add-cart">
                <img
                  src="/src/Images/Icon/Button-ajout-panier.svg"
                  alt="btn-ajout-panier"
                />
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
