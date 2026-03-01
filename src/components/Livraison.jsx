import React, { useState } from "react";

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard (3-5 jours)", price: 4.99 },
  { id: "express", label: "Express (1-2 jours)", price: 9.99 },
  { id: "gratuit", label: "Gratuit (5-7 jours)", price: 0 },
];

const Livraison = ({ onNext, onBack, orderData, setOrderData }) => {
  const [form, setForm] = useState({
    adresse: orderData?.adresse || "",
    complement: orderData?.complement || "",
    ville: orderData?.ville || "",
    codePostal: orderData?.codePostal || "",
    pays: orderData?.pays || "France",
    modeLivraison: orderData?.modeLivraison || "standard",
  });

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
    setOrderData((prev) => ({
      ...prev,
      ...form,
      shippingCost: selected?.price || 0,
    }));
    onNext();
  };

  return (
    <div className="step-section">
      {onBack && (
        <button type="button" className="step-back-link" onClick={onBack}>← Retour</button>
      )}
      <h2 className="step-title">Livraison</h2>
      <form className="step-form" onSubmit={handleSubmit}>
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

        <button className="step-btn" type="submit">
          Continuer
        </button>
      </form>
    </div>
  );
};

export default Livraison;
