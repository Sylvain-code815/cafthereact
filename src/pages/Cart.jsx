import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import "./styles/Cart.css";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, removeMultiple, totalArticles, totalPrix, clearCart } = useContext(CartContext);
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  const allKeys = cart.map((item) => item._cartKey || item.code_produit);
  const allSelected = cart.length > 0 && selectedKeys.size === cart.length;

  const toggleSelect = (key) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(allKeys));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedKeys.size === 0) return;
    removeMultiple(selectedKeys);
    setSelectedKeys(new Set());
  };

  if (cart.length === 0) {
    return (
      <div className="cart-layout cart-empty">
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
      <div className="cart-container">
        <h1>Votre Panier ({totalArticles} articles)</h1>

        {/* Toolbar sélection */}
        <div className="cart-toolbar">
          <label className="cart-select-all">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
            />
            <span>{allSelected ? "Tout désélectionner" : "Tout sélectionner"}</span>
          </label>
          {selectedKeys.size > 0 && (
            <button className="delete-selected-btn" onClick={handleDeleteSelected}>
              Supprimer la sélection ({selectedKeys.size})
            </button>
          )}
        </div>

        <div className="cart-items">
          {cart.map((item) => {
            const cartKey = item._cartKey || item.code_produit;
            const isVrac = item.type_vente === "Vrac" && item.poids;
            const itemTotal = isVrac
              ? (item.prix_ttc * (item.poids / 100) * item.quantite).toFixed(2)
              : (item.prix_ttc * item.quantite).toFixed(2);

            return (
              <div key={cartKey} className="cart-item">

                <input
                  type="checkbox"
                  className="cart-item-checkbox"
                  checked={selectedKeys.has(cartKey)}
                  onChange={() => toggleSelect(cartKey)}
                  aria-label={`Sélectionner ${item.nom_produit}`}
                />

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
                  <p className="item-total-price">{itemTotal} €</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(cartKey)}
                    aria-label={`Supprimer ${item.nom_produit} du panier`}
                  >
                    <img src="/src/Images/Icon/cart-trash.svg" alt="suppression ligne du panier" aria-hidden="true" />
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
            <Link to="/order" className="login-button black-btn">
              Passer la commande
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
