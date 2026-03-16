import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import SEO from "../../components/SEO.jsx";
import { isPoids } from "../../utils/product.js";
import "./Cart.css";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, totalArticles, totalPrix, clearCart } = useContext(CartContext);

  const seo = <SEO title="Panier" description="Votre panier CafThé. Consultez vos articles et passez votre commande de thés et cafés d'exception." />;

  // Affichage quand le panier est vide
  if (cart.length === 0) {
    return (
      <div className="cart-layout cart-empty">
        {seo}
        <h2>Votre panier est vide</h2>
        <p className="cart-empty-subtitle">Découvrez nos collections</p>
        <div className="cart-empty-links">
          <Link to="/the" className="cart-empty-link cart-empty-link--the">Thés</Link>
          <Link to="/cafe" className="cart-empty-link cart-empty-link--cafe">Cafés</Link>
          <Link to="/accessory" className="cart-empty-link cart-empty-link--accessory">Accessoires</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      {seo}
      <div className="cart-container">
        <h1>Votre Panier ({totalArticles} articles)</h1>

        <div className="cart-content-grid">
          <div className="cart-items">
            {cart.map((item) => {
              const cartKey = item._cartKey || item.code_produit;
              const isVrac = isPoids(item.type_vente) && item.poids;
              // poids * quantité, 2 décimal max
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
                      className="btn-qty quantity-btn"
                      onClick={() => decreaseQuantity(cartKey)}
                      aria-label={`Acheter moins de ${item.nom_produit}`}
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantite}</span>
                    <button
                      className="btn-qty quantity-btn"
                      onClick={() => addToCart(item, isVrac ? item.poids : null)}
                      aria-label={`Acheter plus de ${item.nom_produit}`}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-actions">
                    <p className="item-total-price">{itemTotal} €</p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(cartKey)}
                      aria-label={`Supprimer ${item.nom_produit} du panier`}
                    >
                      <img src="/Images/Icon/cart-trash.svg" alt="suppression ligne du panier" aria-hidden="true" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          <aside className="cart-summary">
            <div className="summary-details">
              <h2>Total : {totalPrix.toFixed(2)} €</h2>
            </div>
            <div className="summary-actions">
              <button className="clear-btn" onClick={clearCart}>
                Vider le panier
              </button>
              <Link to="/order" className="btn-filled cart-order-btn">
                Passer la commande
              </Link>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
};

export default Cart;
