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
        <button type="button" className="btn-text step-back-link" onClick={onBack}>← Retour</button>
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

        <button className="btn-filled step-btn" type="submit">
          Confirmer la commande
        </button>
      </form>
    </div>
  );
};

export default Paiement;
