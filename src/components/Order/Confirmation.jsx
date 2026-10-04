import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import { useToast } from "../../contexts/ToastContext";

// Étape 4 : la commande est déjà enregistrée par l'API (étape Paiement),
// on affiche son numéro unique et le total calculé par le serveur (CDC 4.4)
const Confirmation = ({ orderData }) => {
  const { clearCart } = useContext(CartContext);
  const { showToast } = useToast();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) return;
    hasCleared.current = true;
    clearCart();
    showToast("Commande confirmée !");
  }, []);

  return (
    <div className="confirmation-container">
      <div className="confirmation-icon">&#10003;</div>
      <h2 className="confirmation-title">Commande confirmée</h2>
      <p className="confirmation-text">
        Merci {orderData?.prenom || ""} ! Votre commande
        {orderData?.numCommande ? <strong> n°{orderData.numCommande}</strong> : ""} a bien été enregistrée.
      </p>
      {orderData?.totalCommande !== undefined && (
        <p className="confirmation-text">
          Montant total : <strong>{Number(orderData.totalCommande).toFixed(2)} €</strong>
        </p>
      )}
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
