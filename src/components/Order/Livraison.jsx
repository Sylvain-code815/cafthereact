import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { getSavedAddress, saveAddress, getSavedAddresses } from "../../utils/savedAddress.js";

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard (3-5 jours)", price: 4.99 },
  { id: "express", label: "Express (1-2 jours)", price: 9.99 },
  { id: "gratuit", label: "Gratuit (5-7 jours)", price: 0 },
];

const defaultAddresses = [
  {
    id_adresse: 1,
    type: "Domicile",
    rue: "25 rue de la République",
    code_postal: "69002",
    ville: "Lyon",
    pays: "France",
    par_defaut: true,
  },
  {
    id_adresse: 2,
    type: "Bureau",
    rue: "10 avenue des Champs",
    code_postal: "69003",
    ville: "Lyon",
    pays: "France",
    par_defaut: false,
  },
];

const Livraison = ({ onNext, onBack, orderData, setOrderData }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const savedAddresses = isAuthenticated ? (() => {
    const addrs = getSavedAddresses();
    return addrs.length > 0 ? addrs : defaultAddresses;
  })() : [];

  const defaultAddr = savedAddresses.find((a) => a.par_defaut) || savedAddresses[0];

  const [selectedAddressId, setSelectedAddressId] = useState(
    orderData?._selectedAddressId ?? (defaultAddr?.id_adresse || null)
  );
  const [showCustomForm, setShowCustomForm] = useState(
    orderData?._showCustomForm || !isAuthenticated || savedAddresses.length === 0
  );

  const getInitialForm = () => {
    if (orderData?.adresse) {
      return {
        adresse: orderData.adresse,
        complement: orderData.complement || "",
        ville: orderData.ville,
        codePostal: orderData.codePostal,
        pays: orderData.pays || "France",
        modeLivraison: orderData.modeLivraison || "standard",
      };
    }
    return {
      adresse: "",
      complement: "",
      ville: "",
      codePostal: "",
      pays: "France",
      modeLivraison: orderData?.modeLivraison || "standard",
    };
  };

  const [form, setForm] = useState(getInitialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "codePostal") {
      setForm((prev) => ({ ...prev, [name]: value.replace(/[^0-9]/g, "").slice(0, 5) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr.id_adresse);
    setShowCustomForm(false);
  };

  const handleShowCustomForm = () => {
    setSelectedAddressId(null);
    setShowCustomForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = SHIPPING_OPTIONS.find((o) => o.id === form.modeLivraison);

    if (isAuthenticated && !showCustomForm && selectedAddressId) {
      const addr = savedAddresses.find((a) => a.id_adresse === selectedAddressId);
      if (addr) {
        const addressData = {
          adresse: addr.rue,
          complement: "",
          ville: addr.ville,
          codePostal: addr.code_postal,
          pays: addr.pays || "France",
        };
        saveAddress(addressData);
        setOrderData((prev) => ({
          ...prev,
          ...addressData,
          modeLivraison: form.modeLivraison,
          shippingCost: selected?.price || 0,
          _selectedAddressId: selectedAddressId,
          _showCustomForm: false,
        }));
        onNext();
        return;
      }
    }

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
      _selectedAddressId: null,
      _showCustomForm: true,
    }));
    onNext();
  };

  const addressFields = (
    <>
      <div className="step-form-group">
        <label htmlFor="liv-adresse">Adresse</label>
        <input id="liv-adresse" type="text" name="adresse" value={form.adresse} onChange={handleChange} required />
      </div>
      <div className="step-form-group">
        <label htmlFor="liv-complement">Compl&eacute;ment d'adresse</label>
        <input id="liv-complement" type="text" name="complement" value={form.complement} onChange={handleChange} />
      </div>
      <div className="step-form-row">
        <div className="step-form-group">
          <label htmlFor="liv-ville">Ville</label>
          <input id="liv-ville" type="text" name="ville" value={form.ville} onChange={handleChange} required />
        </div>
        <div className="step-form-group">
          <label htmlFor="liv-cp">Code postal</label>
          <input id="liv-cp" type="text" name="codePostal" value={form.codePostal} onChange={handleChange} pattern="[0-9]{5}" maxLength={5} placeholder="75000" required />
        </div>
      </div>
      <div className="step-form-group">
        <label htmlFor="liv-pays">Pays</label>
        <input id="liv-pays" type="text" name="pays" value={form.pays} onChange={handleChange} required />
      </div>
    </>
  );

  return (
    <div className="step-section">
      {onBack && (
        <button type="button" className="btn-text step-back-link" onClick={onBack}>&#8592; Retour</button>
      )}
      <h2 className="step-title">Livraison</h2>

      {isAuthenticated && savedAddresses.length > 0 && (
        <div className="liv-addresses">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id_adresse}
              className={`liv-address-card${selectedAddressId === addr.id_adresse && !showCustomForm ? " liv-address-card--selected" : ""}`}
              onClick={() => handleSelectAddress(addr)}
            >
              <div className="liv-address-radio">
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={selectedAddressId === addr.id_adresse && !showCustomForm}
                  onChange={() => handleSelectAddress(addr)}
                />
              </div>
              <div className="liv-address-details">
                <span className="liv-address-type">
                  {addr.type}
                  {addr.par_defaut && <span className="badge">Par d&eacute;faut</span>}
                </span>
                <span>{addr.rue}</span>
                <span>{addr.code_postal} {addr.ville}, {addr.pays || "France"}</span>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={`liv-other-address-btn${showCustomForm ? " liv-other-address-btn--active" : ""}`}
            onClick={handleShowCustomForm}
          >
            Envoyer &agrave; une autre adresse
          </button>
        </div>
      )}

      <form className="step-form" onSubmit={handleSubmit}>
        {(showCustomForm || !isAuthenticated || savedAddresses.length === 0) && addressFields}

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
                {opt.price === 0 ? "Gratuit" : `${opt.price.toFixed(2)} \u20AC`}
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
