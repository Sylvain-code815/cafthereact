import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";

// Étape 1 du tunnel : identification (CDC 4.4)
// Une commande est rattachée à un compte client : un visiteur doit se connecter
// ou créer son compte (CDC 2.2 : le visiteur consulte le catalogue sans acheter)
const Identification = ({ onNext, setOrderData }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  // Si déjà co, remplissage automatique des données, màj de l'objet de commande
  useEffect(() => {
    if (isAuthenticated && user) {
      setOrderData((prev) => ({
        ...prev,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone || "",
      }));
    }
  }, [isAuthenticated, user, setOrderData]);

  // Si connecté
  if (isAuthenticated) {
    return (
      <div className="step-section">
        <Link to="/panier" className="btn-text step-back-link">← Retour au panier</Link>
        <h2 className="step-title">Identification</h2>
        <div className="step-user-info">
          <p><strong>Prénom :</strong> {user.prenom}</p>
          <p><strong>Nom :</strong> {user.nom}</p>
          <p><strong>Email :</strong> {user.email}</p>
          {user.telephone && <p><strong>Téléphone :</strong> {user.telephone}</p>}
        </div>
        <Link to="/login?redirect=/order" className="step-change-account">Changer de compte</Link>
        <button className="btn-filled step-btn" onClick={onNext}>
          Continuer
        </button>
      </div>
    );
  }

  // Si non connecté : connexion ou création de compte rapide, puis retour au tunnel
  return (
    <div className="step-section">
      <Link to="/panier" className="btn-text step-back-link">← Retour au panier</Link>
      <h2 className="step-title">Identification</h2>
      <p className="step-subtitle">
        Connectez-vous ou créez votre compte pour finaliser votre commande et suivre sa livraison.
      </p>
      <Link to="/login?redirect=/order" className="btn-filled step-btn">
        Se connecter
      </Link>
      <Link to="/signup?redirect=/order" className="btn-text step-btn">
        Créer un compte
      </Link>
    </div>
  );
};

export default Identification;
