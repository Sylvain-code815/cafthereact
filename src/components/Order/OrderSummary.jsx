import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";

const OrderSummary = ({ shippingCost = 0 }) => {
  const { cart, totalPrix } = useContext(CartContext);

  const total = totalPrix + shippingCost;

  return (
    <div className="os-container">
      <h2 className="os-title">Récapitulatif</h2>

      <div className="os-items">
        {cart.map((item) => {
          const cartKey = item._cartKey || item.code_produit;
          const isVrac = item.type_vente === "Vrac" && item.poids;
          const lineTotal = isVrac
            ? item.prix_ttc * (item.poids / 100) * item.quantite
            : item.prix_ttc * item.quantite;

          return (
            <div key={cartKey} className="os-item">
              <div className="os-item-info">
                <span className="os-item-name">
                  {item.nom_produit}
                  {isVrac
                    ? ` (${item.poids >= 1000 ? `${item.poids / 1000}kg` : `${item.poids}g`})`
                    : ""}
                </span>
                <span className="os-item-qty">x{item.quantite}</span>
              </div>
              <span className="os-item-price">{lineTotal.toFixed(2)} €</span>
            </div>
          );
        })}
      </div>

      <div className="os-totals">
        <div className="os-total-row">
          <span>Sous-total</span>
          <span>{totalPrix.toFixed(2)} €</span>
        </div>
        <div className="os-total-row">
          <span>Livraison</span>
          <span>{shippingCost === 0 ? "Gratuit" : `${shippingCost.toFixed(2)} €`}</span>
        </div>
        <div className="os-total-row os-total-final">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
