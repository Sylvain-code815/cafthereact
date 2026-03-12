import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";

const Confirmation = ({ orderData }) => {
  const { clearCart } = useContext(CartContext);

  // Mettre le clear-cart dès que la page s'affiche
  useEffect(() => {
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
