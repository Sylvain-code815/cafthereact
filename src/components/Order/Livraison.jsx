import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getSavedAddress, saveAddress } from "../../utils/savedAddress.js";

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard (3-5 jours)", price: 4.99 },
  { id: "express", label: "Express (1-2 jours)", price: 9.99 },
  { id: "gratuit", label: "Gratuit (5-7 jours)", price: 0 },
];

const Livraison = ({ onNext, onBack, orderData, setOrderData }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const saved = isAuthenticated ? getSavedAddress() : null;

  const [useSaved, setUseSaved] = useState(!!saved);

  const [form, setForm] = useState({
    adresse: orderData?.adresse || saved?.adresse || "",
    complement: orderData?.complement || saved?.complement || "",
    ville: orderData?.ville || saved?.ville || "",
    codePostal: orderData?.codePostal || saved?.codePostal || "",
    pays: orderData?.pays || saved?.pays || "France",
    modeLivraison: orderData?.modeLivraison || "standard",
  });

  // Sync form when switching back to saved address
  useEffect(() => {
    if (useSaved && saved) {
      setForm((prev) => ({
        ...prev,
        adresse: saved.adresse,
        complement: saved.complement || "",
        ville: saved.ville,
        codePostal: saved.codePostal,
        pays: saved.pays || "France",
      }));
    }
  }, [useSaved]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "codePostal") {
      setForm((prev) => ({ ...prev, [name]: value.replace(/[^0-9]/g, "").slice(0, 5) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = SHIPPING_OPTIONS.find((o) => o.id === form.modeLivraison);

    // Save address for future use if authenticated
    if (isAuthenticated) {
      saveAddress({
        adresse: form.adresse,
        complement: form.complement,
        ville: form.ville,
        codePostal: form.codePostal,
        pays: form.pays,
      });
    }

    setOrderData((prev) => ({
      ...prev,
      ...form,
      shippingCost: selected?.price || 0,
    }));
    onNext();
  };

  const addressFields = (
    <>
      <div className="step-form-group">
        <label htmlFor="liv-adresse">Adresse</label>
        <input
          id="liv-adresse"
          type="text"
          name="adresse"
          value={form.adresse}
          onChange={handleChange}
          required
        />
      </div>
      <div className="step-form-group">
        <label htmlFor="liv-complement">Complément d'adresse</label>
        <input
          id="liv-complement"
          type="text"
          name="complement"
          value={form.complement}
          onChange={handleChange}
        />
      </div>
      <div className="step-form-row">
        <div className="step-form-group">
          <label htmlFor="liv-ville">Ville</label>
          <input
            id="liv-ville"
            type="text"
            name="ville"
            value={form.ville}
            onChange={handleChange}
            required
          />
        </div>
        <div className="step-form-group">
          <label htmlFor="liv-cp">Code postal</label>
          <input
            id="liv-cp"
            type="text"
            name="codePostal"
            value={form.codePostal}
            onChange={handleChange}
            pattern="[0-9]{5}"
            maxLength={5}
            placeholder="75000"
            required
          />
        </div>
      </div>
      <div className="step-form-group">
        <label htmlFor="liv-pays">Pays</label>
        <input
          id="liv-pays"
          type="text"
          name="pays"
          value={form.pays}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );

  return (
    <div className="step-section">
      {onBack && (
        <button type="button" className="btn-text step-back-link" onClick={onBack}>← Retour</button>
      )}
      <h2 className="step-title">Livraison</h2>

      {/* Saved address compact view */}
      {isAuthenticated && saved && useSaved && (
        <div className="step-saved-address">
          <p>{saved.adresse}</p>
          {saved.complement && <p>{saved.complement}</p>}
          <p>{saved.codePostal} {saved.ville}, {saved.pays || "France"}</p>
          <button
            type="button"
            className="step-change-account"
            onClick={() => setUseSaved(false)}
          >
            Changer d'adresse
          </button>
        </div>
      )}

      <form className="step-form" onSubmit={handleSubmit}>
        {/* Show address fields if no saved address or user chose to change */}
        {(!isAuthenticated || !saved || !useSaved) && addressFields}

        <fieldset className="step-fieldset">
          <legend>Mode de livraison</legend>
          {SHIPPING_OPTIONS.map((opt) => (
            <label key={opt.id} className="step-radio-label">
              <input
                type="radio"
                name="modeLivraison"
                value={opt.id}
                checked={form.modeLivraison === opt.id}
                onChange={handleChange}
              />
              <span>{opt.label}</span>
              <span className="step-radio-price">
                {opt.price === 0 ? "Gratuit" : `${opt.price.toFixed(2)} €`}
              </span>
            </label>
          ))}
        </fieldset>

        <button className="btn-filled step-btn" type="submit">
          Continuer
        </button>
      </form>
    </div>
  );
};

export default Livraison;
