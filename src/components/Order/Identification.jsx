import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";

const Identification = ({ onNext, orderData, setOrderData }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const [form, setForm] = useState({
    prenom: orderData?.prenom || "",
    nom: orderData?.nom || "",
    email: orderData?.email || "",
    telephone: orderData?.telephone || "",
  });

  const nameRegex = /[^a-zA-ZÀ-ÿ\s'-]/g;

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

  // Empêche physiquement l'utilisateur de taper des chiffres dans son prénom
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "prenom" || name === "nom") {
      setForm((prev) => ({ ...prev, [name]: value.replace(nameRegex, "") }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setOrderData((prev) => ({ ...prev, ...form }));
    }
    onNext();
  };

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
        <Link to="/login" className="step-change-account">Changer de compte</Link>
        <button className="btn-filled step-btn" onClick={handleSubmit}>
          Continuer
        </button>
      </div>
    );
  }

  // Si non connecté
  return (
    <div className="step-section">
      <Link to="/panier" className="btn-text step-back-link">← Retour au panier</Link>
      <h2 className="step-title">Identification</h2>
      <p className="step-subtitle">Renseignez vos informations pour continuer.</p>
      <form className="step-form" onSubmit={handleSubmit}>
        <div className="step-form-row">
          <div className="step-form-group">
            <label htmlFor="oi-prenom">Prénom</label>
            <input
              id="oi-prenom"
              type="text"
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="step-form-group">
            <label htmlFor="oi-nom">Nom</label>
            <input
              id="oi-nom"
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="step-form-group">
          <label htmlFor="oi-email">Email</label>
          <input
            id="oi-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="step-form-group">
          <label htmlFor="oi-telephone">Téléphone</label>
          <input
            id="oi-telephone"
            type="tel"
            name="telephone"
            value={form.telephone}
            onChange={(e) => {
              // Empêche tout ce qui n'est pas chiffre
              const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
              setForm((prev) => ({ ...prev, telephone: val }));
            }}
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="0612345678"
          />
        </div>
        <button className="btn-filled step-btn" type="submit">
          Continuer
        </button>
      </form>
    </div>
  );
};

export default Identification;
