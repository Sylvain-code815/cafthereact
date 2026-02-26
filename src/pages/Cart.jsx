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
            {cart.map((item) => {
              const cartKey = item._cartKey || item.code_produit;
              const isVrac = item.type_vente === "Vrac" && item.poids;
              const itemTotal = isVrac
                ? (item.prix_ttc * (item.poids / 100) * item.quantite).toFixed(2)
                : (item.prix_ttc * item.quantite).toFixed(2);

              return (
                <div key={cartKey} className="cart-item">

                  <div className="cart-item-info">
                    <img
                        src={item.image ? `${import.meta.env.VITE_API_URL}/images/${item.image}` : "https://placehold.co/100x100"}
                        alt={item.nom_produit}
                        className="cart-image"
                        loading="lazy"
                        role="img"
                    />
                    <div>
                      <h3>{item.nom_produit}{isVrac ? ` — ${item.poids >= 1000 ? `${item.poids / 1000}kg` : `${item.poids}g`}` : ""}</h3>
                      <p className="item-price">{item.prix_ttc} €{isVrac ? " / 100g" : ""}</p>
                    </div>
                  </div>

                  <div className="cart-quantity-controls">
                    <button
                        className="quantity-btn"
                        onClick={() => decreaseQuantity(cartKey)}
                        aria-label={`Diminuer la quantité de ${item.nom_produit}`}
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantite}</span>
                    <button
                        className="quantity-btn"
                        onClick={() => addToCart(item, isVrac ? item.poids : null)}
                        aria-label={`Augmenter la quantité de ${item.nom_produit}`}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-actions">
                    <p className="item-total-price">
                      {itemTotal} €
                    </p>
                    <button
                        className="remove-btn"
                        onClick={() => removeFromCart(cartKey)}
                        aria-label={`Supprimer ${item.nom_produit} du panier`}
                    >
                        <img src="/src/Images/Icon/cart-trash.svg" alt="" aria-hidden="true" />
                    </button>
                  </div>

                </div>
              );
            })}
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