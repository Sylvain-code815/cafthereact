import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal.jsx";
import { CartContext } from "../../contexts/CartContext.jsx";
import { useToast } from "../../contexts/ToastContext";
import { isPoids, getEffectivePrice, getUnitLabel } from "../../utils/product.js";
import "./QuickView.css";

// Mêmes formats que la fiche produit
const WEIGHT_OPTIONS = [
  { value: 100, label: "100g" },
  { value: 200, label: "200g" },
  { value: 500, label: "500g" },
  { value: 1000, label: "1kg" },
];

const SHORT_DESCRIPTION_LENGTH = 160;

// Description courte : coupée au dernier mot entier
const shortDescription = (text) => {
  if (!text || text.length <= SHORT_DESCRIPTION_LENGTH) return text;
  const cut = text.slice(0, SHORT_DESCRIPTION_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

// Disponibilité : pour le vrac, l'API compte le stock en tranches de 100 g
const stockLabel = (produit) => {
  const stock = Number(produit.stock);
  if (stock <= 0) return "Rupture de stock";
  if (isPoids(produit.type_vente)) {
    const grams = stock * 100;
    return `${grams >= 1000 ? `${grams / 1000} kg` : `${grams} g`} disponibles`;
  }
  return `${stock} unité${stock > 1 ? "s" : ""} disponible${stock > 1 ? "s" : ""}`;
};

// Aperçu rapide d'un produit sans quitter la liste (CDC 4.2.1)
const QuickView = ({ produit, onClose }) => {
  const { addToCart } = useContext(CartContext);
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const stock = Number(produit.stock);
  const isVrac = isPoids(produit.type_vente);
  const inStock = stock > 0;
  // Formats proposés pour le vrac : seulement ceux couverts par le stock
  const weightOptions = WEIGHT_OPTIONS.filter((opt) => opt.value / 100 <= stock);
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]?.value || 100);

  const isPromo = produit.produit_promotion === 1 && produit.taux_remise > 0;
  const prix = getEffectivePrice(produit);
  const total = isVrac ? prix * (selectedWeight / 100) : prix * quantity;
  const titleId = `quickview-title-${produit.code_produit}`;

  const imageURL = produit.image
    ? `${import.meta.env.VITE_API_URL}/images/${produit.image}`
    : "https://placehold.co/600x600";

  const handleAddToCart = () => {
    if (isVrac) {
      addToCart(produit, selectedWeight);
    } else {
      addToCart(produit, null, quantity);
    }
    showToast(`${produit.nom_produit} ajouté au panier`);
    onClose();
  };

  return (
    <Modal titleId={titleId} onClose={onClose} className="quickview-dialog">
      <div className="quickview-grid">
        <img src={imageURL} alt={produit.nom_produit} className="quickview-image" />

        <div className="quickview-info">
          <h2 id={titleId} className="quickview-name">{produit.nom_produit}</h2>
          {produit.origine && <p className="quickview-origin">Origine : {produit.origine}</p>}

          <p className="quickview-price-row">
            {isPromo && <span className="quickview-price-old">{Number(produit.prix_ttc).toFixed(2)}€</span>}
            <span className="quickview-price">{prix.toFixed(2)}€ TTC</span>
            <span className="quickview-unit">{getUnitLabel(produit.type_vente)}</span>
          </p>

          {produit.description && (
            <p className="quickview-description">{shortDescription(produit.description)}</p>
          )}

          <p className={`quickview-stock${inStock && stock <= 5 ? " quickview-stock--low" : ""}${!inStock ? " quickview-stock--out" : ""}`}>
            {stockLabel(produit)}
          </p>

          {inStock && (
            <div className="quickview-purchase">
              {isVrac ? (
                <label className="quickview-row">
                  <span>Poids</span>
                  <select
                    className="pd-weight-select"
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(Number(e.target.value))}
                  >
                    {weightOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </label>
              ) : (
                <div className="quickview-row">
                  <span id={`${titleId}-qty`}>Quantité</span>
                  <div className="quickview-qty" role="group" aria-labelledby={`${titleId}-qty`}>
                    <button
                      type="button"
                      className="btn-qty quickview-qty-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span className="quickview-qty-value" aria-live="polite">{quantity}</span>
                    <button
                      type="button"
                      className="btn-qty quickview-qty-btn"
                      onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                      disabled={quantity >= stock}
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="quickview-row quickview-total">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>
          )}

          <button type="button" className="btn-filled quickview-add" onClick={handleAddToCart} disabled={!inStock}>
            Ajouter au panier
          </button>

          <Link to={`/produit/${produit.code_produit}`} className="quickview-link" onClick={onClose}>
            Voir la fiche produit complète →
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default QuickView;
