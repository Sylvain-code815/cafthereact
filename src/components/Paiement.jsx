import React, { useState } from "react";

const Paiement = ({ onNext, onBack, orderData, setOrderData }) => {
  const [method, setMethod] = useState(orderData?.methodePaiement || "cb");

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderData((prev) => ({ ...prev, methodePaiement: method }));
    onNext();
  };

  return (
    <div className="step-section">
      {onBack && (
        <button type="button" className="step-back-link" onClick={onBack}>← Retour</button>
      )}
      <h2 className="step-title">Paiement</h2>
      <form className="step-form" onSubmit={handleSubmit}>
        <fieldset className="step-fieldset">
          <legend>Méthode de paiement</legend>
          <label className="step-radio-label">
            <input
              type="radio"
              name="methode"
              value="cb"
              checked={method === "cb"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <span>Carte bancaire</span>
          </label>
          <label className="step-radio-label">
            <input
              type="radio"
              name="methode"
              value="paypal"
              checked={method === "paypal"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <span>PayPal</span>
          </label>
        </fieldset>

        {method === "cb" && (
          <div className="step-payment-placeholder">
            <p>L'intégration du paiement par carte sera disponible prochainement.</p>
          </div>
        )}

        {method === "paypal" && (
          <div className="step-payment-placeholder">
            <p>L'intégration PayPal sera disponible prochainement.</p>
          </div>
        )}

        <button className="step-btn" type="submit">
          Confirmer la commande
        </button>
      </form>
    </div>
  );
};

export default Paiement;
