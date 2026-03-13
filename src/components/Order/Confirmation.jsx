import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import { saveOrder } from "../../utils/savedOrders.js";

const Confirmation = ({ orderData }) => {
  const { cart, totalPrix, clearCart } = useContext(CartContext);
  const savedRef = useRef(false);

  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;

    if (cart.length > 0) {
      saveOrder({
        id_commande: Date.now(),
        date: new Date().toISOString().split("T")[0],
        statut: "En cours",
        total: totalPrix + (orderData?.shippingCost || 0),
        articles: cart.reduce((sum, item) => sum + item.quantite, 0),
      });
    }

    clearCart();
  }, []);

  return (
    <div className="confirmation-container">
      <div className="confirmation-icon">&#10003;</div>
      <h2 className="confirmation-title">Commande confirmée</h2>
      <p className="confirmation-text">
        Merci {orderData?.prenom || ""} ! Votre commande a bien été enregistrée.
      </p>
      <p className="confirmation-text">
        Un email de confirmation sera envoyé à <strong>{orderData?.email || "votre adresse"}</strong>.
      </p>
      <Link to="/" className="btn-filled step-btn confirmation-link">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default Confirmation;
