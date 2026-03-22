import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import { useToast } from "../../contexts/ToastContext";
import { saveOrder } from "../../utils/savedOrders";

const Confirmation = ({ orderData }) => {
  const { cart, clearCart } = useContext(CartContext);
  const { showToast } = useToast();
  const hasSaved = useRef(false);

  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;

    if (cart.length > 0) {
      const total = cart.reduce((sum, item) => {
        if (item.isVrac) return sum + item.prix_ttc * (item.poids / 100) * item.quantite;
        return sum + item.prix_ttc * item.quantite;
      }, 0) + (orderData?.shippingCost || 0);
      saveOrder({
        id_commande: Date.now(),
        date: new Date().toISOString(),
        articles: cart.reduce((sum, item) => sum + item.quantite, 0),
        statut: "En cours",
        total,
      });
    }
    clearCart();
    showToast("Commande confirmée !");
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
