import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import { isPoids } from "../../utils/product.js";

const API = import.meta.env.VITE_API_URL;

// Moyens de paiement du front -> valeurs attendues par l'API
const PAYMENT_MODES = { cb: "card", paypal: "paypal", magasin: "in_store" };

// Lignes envoyées à l'API : uniquement les identifiants et quantités.
// Les prix sont relus en base par l'API (un prix modifié dans le navigateur est ignoré)
const toOrderLines = (cart) =>
  cart.map((item) => ({
    code_produit: item.code_produit,
    quantite: item.quantite,
    ...(isPoids(item.type_vente) && item.poids ? { poids: item.poids } : {}),
  }));

const Paiement = ({ onNext, onBack, orderData, setOrderData }) => {
  const [method, setMethod] = useState(orderData?.methodePaiement || "cb");
  const [cardNumber, setCardNumber] = useState(orderData?.cardNumber || "");
  const [cardExpiry, setCardExpiry] = useState(orderData?.cardExpiry || "");
  const [cardCvc, setCardCvc] = useState(orderData?.cardCvc || "");
  const [cardName, setCardName] = useState(orderData?.cardName || "");
  const [cgvAccepted, setCgvAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { cart } = useContext(CartContext);
  const isPickup = orderData?.modeLivraison === "pickup";

  // Enregistrement de la commande dans l'API (transaction : stock vérifié et décrémenté)
  // Les données de carte ne sont jamais envoyées à l'API CafThé : en production,
  // elles iraient directement au prestataire de paiement (Stripe, PayPal...)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          lines: toOrderLines(cart),
          mode_livraison: orderData.modeLivraison,
          ...(isPickup ? {} : { id_adresse_livraison: orderData._selectedAddressId }),
          mode_paiement: PAYMENT_MODES[method],
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        // Ex. 409 « Stock insuffisant pour ... », 401 session expirée
        setErrorMsg(data.message || "La commande n'a pas pu être enregistrée");
        return;
      }

      setOrderData((prev) => ({
        ...prev,
        methodePaiement: method,
        numCommande: data.num_commande,
        totalCommande: data.total,
      }));
      onNext();
    } catch (err) {
      console.error("Erreur enregistrement commande:", err);
      setErrorMsg("Une erreur s'est produite, votre commande n'a pas été enregistrée");
    } finally {
      setSubmitting(false);
    }
  };

  // Formate le numéro de carte : groupes de 4 chiffres séparés par des espaces
  const handleCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  // Formate la date d'expiration : MM/AA
  const handleExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) {
      setCardExpiry(digits.slice(0, 2) + "/" + digits.slice(2));
    } else {
      setCardExpiry(digits);
    }
  };

  // Limite le CVC à 3-4 chiffres
  const handleCvc = (value) => {
    setCardCvc(value.replace(/\D/g, "").slice(0, 4));
  };

  // Filtre le nom du titulaire : lettres, accents, espaces, tirets, apostrophes
  const handleCardName = (value) => {
    setCardName(value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, ""));
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
          {isPickup && (
            <label className="step-radio-label">
              <input
                type="radio"
                name="methode"
                value="magasin"
                checked={method === "magasin"}
                onChange={(e) => setMethod(e.target.value)}
              />
              <span>Payer en magasin au retrait</span>
            </label>
          )}
        </fieldset>

        {method === "cb" && (
          <div className="step-form" style={{ gap: "12px" }}>
            <div className="step-form-group">
              <label htmlFor="cardNumber">Numéro de carte</label>
              <input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => handleCardNumber(e.target.value)}
                required
                autoComplete="cc-number"
              />
            </div>
            <div className="step-form-group">
              <label htmlFor="cardName">Titulaire de la carte</label>
              <input
                id="cardName"
                type="text"
                placeholder="Jean Dupont"
                value={cardName}
                onChange={(e) => handleCardName(e.target.value)}
                required
                autoComplete="cc-name"
              />
            </div>
            <div className="step-form-row">
              <div className="step-form-group">
                <label htmlFor="cardExpiry">Date d'expiration</label>
                <input
                  id="cardExpiry"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM/AA"
                  value={cardExpiry}
                  onChange={(e) => handleExpiry(e.target.value)}
                  required
                  autoComplete="cc-exp"
                />
              </div>
              <div className="step-form-group">
                <label htmlFor="cardCvc">CVC</label>
                <input
                  id="cardCvc"
                  type="text"
                  inputMode="numeric"
                  placeholder="123"
                  value={cardCvc}
                  onChange={(e) => handleCvc(e.target.value)}
                  required
                  autoComplete="cc-csc"
                />
              </div>
            </div>
          </div>
        )}

        {method === "paypal" && (
          <div className="step-payment-placeholder">
            Vous serez redirigé vers PayPal lors de la confirmation.
          </div>
        )}

        <label className="step-cgv-group">
          <input
            type="checkbox"
            required
            checked={cgvAccepted}
            onChange={(e) => setCgvAccepted(e.target.checked)}
          />
          <span>
            J'accepte les{" "}
            <Link to="/conditions-generales" target="_blank">
              conditions générales de vente
            </Link>
          </span>
        </label>

        {errorMsg && <div className="error-message" role="alert">{errorMsg}</div>}

        <button className="btn-filled step-btn" type="submit" disabled={submitting}>
          {submitting ? "Enregistrement..." : "Confirmer la commande"}
        </button>
      </form>
    </div>
  );
};

export default Paiement;
