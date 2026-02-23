// Créé un contexte pour le panier comme pour le login, avec un vrai ou faux pour savoir s'il y a des choses à l'intérieur ou non
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import "./styles/Cart.css";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, totalArticles, totalPrix, clearCart,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
        <div className="container cart-empty">
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos gammes de thés et de cafés</p>
          <Link to="/" className="login-button">
            Retour à la boutique
          </Link>
        </div>
    )
  }

  return (
      <div className="container">
        <div className="cart-container">
          <h1>Votre Panier ({totalArticles} articles)</h1>

          <div className="cart-items">
            {cart.map((item) => (
                <div key={item.code_produit} className="cart-item">

                  <div className="cart-item-info">
                    <img
                        src={item.image ? `${import.meta.env.VITE_API_URL}/images/${item.image}` : "https://placehold.co/100x100"}
                        alt={item.nom_produit}
                        className="cart-image"
                    />
                    <div>
                      <h3>{item.nom_produit}</h3>
                      <p className="item-price">{item.prix_ttc} €</p>
                    </div>
                  </div>

                  <div className="cart-quantity-controls">
                    <button
                        className="quantity-btn"
                        onClick={() => decreaseQuantity(item.code_produit)}
                    >
                    </button>
                    <span className="quantity-display">{item.quantite}</span>
                    <button
                        className="quantity-btn"
                        onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-actions">
                    <p className="item-total-price">
                      {(item.prix_ttc * item.quantite).toFixed(2)} €
                    </p>
                    <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.code_produit)}
                    >
                        <img src="/src/Images/Icon/cart-trash.svg" />
                    </button>
                  </div>

                </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-details">
              <h2>Total : {totalPrix.toFixed(2)} €</h2>
            </div>
            <div className="summary-actions">
              <button className="clear-btn" onClick={clearCart}>
                Vider le panier
              </button>
              <button className="login-button black-btn">
                Passer la commande
              </button>
            </div>
          </div>

        </div>
      </div>
  );
};

export default Cart;