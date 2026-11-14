import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import SEO from "../../components/SEO.jsx";
import ConfirmDialog from "../../components/Modal/ConfirmDialog.jsx";
import { isPoids, getEffectivePrice, getLineTotal } from "../../utils/product.js";
import { getShippingEstimate, getShippingLabel, formatShippingPrice } from "../../utils/shipping.js";
import "./Cart.css";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, totalArticles, totalPrix, clearCart } = useContext(CartContext);
  // Action en attente de confirmation : { type: "remove", item } ou { type: "clear" } (CDC 4.3)
  const [pendingAction, setPendingAction] = useState(null);

  const confirmPendingAction = () => {
    if (pendingAction?.type === "remove") {
      removeFromCart(pendingAction.item._cartKey || pendingAction.item.code_produit);
    } else if (pendingAction?.type === "clear") {
      clearCart();
    }
    setPendingAction(null);
  };

  const shippingEstimate = getShippingEstimate(totalPrix);

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
              const itemTotal = getLineTotal(item).toFixed(2);

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
                      <p className="item-price">{getEffectivePrice(item).toFixed(2)} €{isVrac ? " / 100g" : ""}</p>
                    </div>
                  </div>

                  <div className="cart-quantity-controls">
                    <button
                      className="btn-qty quantity-btn"
                      // À 1, le bouton « − » retire la ligne : on demande confirmation
                      onClick={() =>
                        item.quantite > 1
                          ? decreaseQuantity(cartKey)
                          : setPendingAction({ type: "remove", item })
                      }
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
                      onClick={() => setPendingAction({ type: "remove", item })}
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

            {/* Estimation des frais de livraison (CDC 4.3) : mêmes modes et prix que le tunnel */}
            <div className="shipping-estimate">
              <h3 className="shipping-estimate-title">Estimation de la livraison</h3>
              <ul className="shipping-estimate-list">
                {shippingEstimate.options.map((opt) => (
                  <li key={opt.id} className="shipping-estimate-row">
                    <span>
                      {getShippingLabel(opt.id)}
                      {opt.carrier && <span className="shipping-estimate-carrier"> · {opt.carrier}</span>}
                    </span>
                    <span className="shipping-estimate-price">{formatShippingPrice(opt.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="shipping-estimate-total">
                Total avec livraison standard : <strong>{shippingEstimate.defaultTotal.toFixed(2)} €</strong>
              </p>
              <p className="shipping-estimate-note">Le mode de livraison se choisit à l'étape suivante.</p>
            </div>

            <div className="summary-actions">
              <button className="clear-btn" onClick={() => setPendingAction({ type: "clear" })}>
                Vider le panier
              </button>
              <Link to="/order" className="btn-filled cart-order-btn">
                Passer la commande
              </Link>
            </div>
          </aside>
        </div>

      </div>

      {pendingAction && (
        <ConfirmDialog
          title={pendingAction.type === "clear" ? "Vider le panier" : "Retirer l'article"}
          message={
            pendingAction.type === "clear"
              ? "Voulez-vous vraiment retirer tous les articles de votre panier ?"
              : `Voulez-vous vraiment retirer « ${pendingAction.item.nom_produit} » de votre panier ?`
          }
          confirmLabel={pendingAction.type === "clear" ? "Vider" : "Retirer"}
          onConfirm={confirmPendingAction}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
};

export default Cart;
