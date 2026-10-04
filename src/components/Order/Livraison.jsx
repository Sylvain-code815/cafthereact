import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";

const API = import.meta.env.VITE_API_URL;

// Identifiants identiques à ceux de l'API (DELIVERY_MODES) : l'API recalcule les frais
const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard (3-5 jours)", price: 4.99 },
  { id: "express", label: "Express (1-2 jours)", price: 9.99 },
  { id: "free", label: "Gratuit (5-7 jours)", price: 0 },
  { id: "pickup", label: "Retrait en magasin", price: 0 },
];

// Étape 2 du tunnel : mode de livraison et adresse (CDC 4.4)
const Livraison = ({ onNext, onBack, orderData, setOrderData }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Chargement des adresses depuis l'API
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoadingAddresses(true);
    fetch(`${API}/api/adresses`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setSavedAddresses(data.adresses))
      .catch((err) => console.error("Erreur chargement adresses:", err))
      .finally(() => setLoadingAddresses(false));
  }, [isAuthenticated]);

  const [selectedAddressId, setSelectedAddressId] = useState(
    orderData?._selectedAddressId ?? null
  );
  const [showCustomForm, setShowCustomForm] = useState(
    orderData?._showCustomForm || false
  );

  // Met à jour la sélection par défaut quand les adresses sont chargées
  useEffect(() => {
    if (savedAddresses.length > 0 && selectedAddressId === null && !orderData?._showCustomForm) {
      setSelectedAddressId(savedAddresses[0].id_adresse);
      setShowCustomForm(false);
    }
  }, [savedAddresses]);

  const [form, setForm] = useState({
    adresse: orderData?.adresse || "",
    complement: orderData?.complement || "",
    ville: orderData?.ville || "",
    codePostal: orderData?.codePostal || "",
    pays: orderData?.pays || "France",
    modeLivraison: orderData?.modeLivraison || "standard",
  });

  const isPickup = form.modeLivraison === "pickup";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "codePostal") {
      setForm((prev) => ({ ...prev, [name]: value.replace(/[^0-9]/g, "").slice(0, 5) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "modeLivraison") {
      const selected = SHIPPING_OPTIONS.find((o) => o.id === value);
      setOrderData((prev) => ({
        ...prev,
        modeLivraison: value,
        shippingCost: selected?.price || 0,
      }));
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

  // Enregistre la nouvelle adresse dans le carnet du client : l'API a besoin
  // de son identifiant pour la commande (et le client la retrouvera la prochaine fois)
  const createAddress = async () => {
    const rue = form.complement ? `${form.adresse}, ${form.complement}` : form.adresse;
    const res = await fetch(`${API}/api/adresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ titre: "Livraison", rue, cp: form.codePostal, ville: form.ville, pays: form.pays }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Adresse invalide");
    return data.adresse_id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const selected = SHIPPING_OPTIONS.find((o) => o.id === form.modeLivraison);
    const base = { modeLivraison: form.modeLivraison, shippingCost: selected?.price || 0 };

    // Retrait en magasin : pas d'adresse de livraison
    if (isPickup) {
      setOrderData((prev) => ({ ...prev, ...base, _selectedAddressId: null }));
      onNext();
      return;
    }

    const useSaved = !showCustomForm && savedAddresses.length > 0 && selectedAddressId;
    if (useSaved) {
      const addr = savedAddresses.find((a) => a.id_adresse === selectedAddressId);
      setOrderData((prev) => ({
        ...prev,
        ...base,
        adresse: addr.rue,
        ville: addr.ville,
        codePostal: addr.cp,
        pays: addr.pays || "France",
        _selectedAddressId: selectedAddressId,
        _showCustomForm: false,
      }));
      onNext();
      return;
    }

    try {
      setSubmitting(true);
      const newId = await createAddress();
      setOrderData((prev) => ({
        ...prev,
        ...form,
        ...base,
        _selectedAddressId: newId,
        _showCustomForm: false,
      }));
      onNext();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const showAddressFields = !isPickup && (showCustomForm || (!loadingAddresses && savedAddresses.length === 0));

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

      {!isPickup && loadingAddresses && <p>Chargement des adresses...</p>}

      {!isPickup && !loadingAddresses && savedAddresses.length > 0 && (
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
                <span className="liv-address-type">{addr.titre}</span>
                <span>{addr.rue}</span>
                <span>{addr.cp} {addr.ville}, {addr.pays || "France"}</span>
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
        {showAddressFields && addressFields}

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

        {errorMsg && <div className="error-message" role="alert">{errorMsg}</div>}

        <button className="btn-filled step-btn" type="submit" disabled={submitting}>
          Continuer
        </button>
      </form>
    </div>
  );
};

export default Livraison;
