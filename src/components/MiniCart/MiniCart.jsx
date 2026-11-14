import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import { isPoids, getLineTotal } from "../../utils/product.js";
import "./MiniCart.css";

const formatWeight = (poids) => (poids >= 1000 ? `${poids / 1000}kg` : `${poids}g`);

// Mini-panier accessible depuis toutes les pages (CDC 4.3) :
// l'icône panier de la navbar ouvre un volet avec les lignes, le total et les raccourcis
const MiniCart = () => {
  const { cart, totalArticles, totalPrix } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  // Fermeture par Échap (le focus revient sur l'icône) ou par un clic en dehors du volet
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="mini-cart-wrapper" ref={wrapperRef}>
      <button
        ref={buttonRef}
        type="button"
        className={`nav-action-btn nav-cart${open ? " nav-action-active" : ""}`}
        aria-label={`Panier, ${totalArticles} article${totalArticles > 1 ? "s" : ""}`}
        aria-expanded={open}
        aria-controls="mini-cart"
        onClick={() => setOpen((o) => !o)}
      >
        <img src="/Images/Icon/header-Cart.svg" alt="" aria-hidden="true" />
        {totalArticles > 0 && (
          <span className="cart-badge" aria-hidden="true">{totalArticles}</span>
        )}
      </button>

      {open && (
        <div id="mini-cart" className="mini-cart" role="region" aria-label="Mini-panier">
          <p className="mini-cart-title">
            Mon panier {totalArticles > 0 && `(${totalArticles} article${totalArticles > 1 ? "s" : ""})`}
          </p>

          {cart.length === 0 ? (
            <div className="mini-cart-empty">
              <p>Votre panier est vide.</p>
              <Link to="/the" className="mini-cart-empty-link" onClick={close}>
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            <>
              <ul className="mini-cart-list">
                {cart.map((item) => {
                  const cartKey = item._cartKey || item.code_produit;
                  const isVrac = isPoids(item.type_vente) && item.poids;
                  return (
                    <li key={cartKey} className="mini-cart-item">
                      <img
                        src={item.image ? `${import.meta.env.VITE_API_URL}/images/${item.image}` : "https://placehold.co/100x100"}
                        alt=""
                        className="mini-cart-image"
                        loading="lazy"
                      />
                      <div className="mini-cart-item-info">
                        <Link to={`/produit/${item.code_produit}`} className="mini-cart-item-name" onClick={close}>
                          {item.nom_produit}{isVrac ? ` — ${formatWeight(item.poids)}` : ""}
                        </Link>
                        <span className="mini-cart-item-qty">Quantité : {item.quantite}</span>
                      </div>
                      <span className="mini-cart-item-total">{getLineTotal(item).toFixed(2)} €</span>
                    </li>
                  );
                })}
              </ul>

              <div className="mini-cart-total">
                <span>Total</span>
                <span>{totalPrix.toFixed(2)} €</span>
              </div>

              <div className="mini-cart-actions">
                <Link to="/panier" className="btn-outline mini-cart-btn" onClick={close}>
                  Voir le panier
                </Link>
                <Link to="/order" className="btn-filled mini-cart-btn" onClick={close}>
                  Commander
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniCart;
