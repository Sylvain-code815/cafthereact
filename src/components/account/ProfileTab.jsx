import React, { useState, useEffect } from "react";
import AddressCard from "./AddressCard";

const API = import.meta.env.VITE_API_URL;

const emptyForm = {
  titre: "",
  rue: "",
  cp: "",
  ville: "",
  pays: "France",
};

const ProfileTab = ({ prenom, nom, email }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Chargement des adresses depuis l'API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`${API}/api/adresses`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setAddresses(data.adresses);
        }
      } catch (err) {
        console.error("Erreur chargement adresses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const validate = () => {
    const errs = {};
    if (/\d/.test(form.titre))
      errs.titre = "Le titre ne doit pas contenir de chiffres";
    if (!form.rue.trim()) errs.rue = "La rue est requise";
    if (!/^\d{5}$/.test(form.cp))
      errs.cp = "Le code postal doit contenir exactement 5 chiffres";
    if (/\d/.test(form.ville))
      errs.ville = "La ville ne doit pas contenir de chiffres";
    if (/\d/.test(form.pays))
      errs.pays = "Le pays ne doit pas contenir de chiffres";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const res = await fetch(`${API}/api/adresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        setAddresses([...addresses, { id_adresse: data.adresse_id, ...form }]);
        setForm(emptyForm);
        setErrors({});
        setShowForm(false);
      }
    } catch (err) {
      console.error("Erreur ajout adresse:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/api/adresses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setAddresses(addresses.filter((a) => a.id_adresse !== id));
      }
    } catch (err) {
      console.error("Erreur suppression adresse:", err);
    }
  };

  return (
    <div className="account-content">
      <div className="account-grid">
        <div className="info-card">
          <h3>Informations personnelles</h3>
          <div className="info-details">
            <div className="info-group">
              <span className="label">Prénom</span>
              <span className="value">{prenom}</span>
            </div>
            <div className="info-group">
              <span className="label">Nom</span>
              <span className="value">{nom}</span>
            </div>
            <div className="info-group full-width">
              <span className="label">Email</span>
              <span className="value">{email}</span>
            </div>
          </div>
          <button className="btn-filled full-width-btn">
            Modifier mes informations
          </button>
        </div>

        <div className="security-card">
          <h3>Sécurité</h3>
          <div className="info-group">
            <span className="label">Mot de passe</span>
            <span className="value">••••••••</span>
          </div>
          <button className="outline-btn full-width-btn">
            <img src="/Images/Icon/signup-mdp.svg" alt="" />
            <span>Changer mon mot de passe</span>
          </button>
        </div>
      </div>

      <div className="addresses-section">
        <div className="addresses-header">
          <h3 className="section-title">Mes adresses</h3>
          <button
            className="outline-btn add-address-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "- Annuler" : "+ Ajouter une adresse"}
          </button>
        </div>
        {showForm && (
          <form className="add-address-form" onSubmit={handleAdd}>
            <h4>Nouvelle adresse</h4>
            <div className="form-group">
              <label>Titre</label>
              <input
                type="text"
                name="titre"
                value={form.titre}
                onChange={handleChange}
                placeholder="Ex : Domicile, Bureau..."
                className={errors.titre ? "input-error" : ""}
                required
              />
              {errors.titre && <span className="field-error">{errors.titre}</span>}
            </div>
            <div className="form-group">
              <label>Rue</label>
              <input
                type="text"
                name="rue"
                value={form.rue}
                onChange={handleChange}
                placeholder="Adresse complète"
                className={errors.rue ? "input-error" : ""}
                required
              />
              {errors.rue && <span className="field-error">{errors.rue}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Code postal</label>
                <input
                  type="text"
                  name="cp"
                  value={form.cp}
                  onChange={handleChange}
                  placeholder="Ex : 69002"
                  maxLength={5}
                  className={errors.cp ? "input-error" : ""}
                  required
                />
                {errors.cp && <span className="field-error">{errors.cp}</span>}
              </div>
              <div className="form-group">
                <label>Ville</label>
                <input
                  type="text"
                  name="ville"
                  value={form.ville}
                  onChange={handleChange}
                  placeholder="Ex : Lyon"
                  className={errors.ville ? "input-error" : ""}
                  required
                />
                {errors.ville && <span className="field-error">{errors.ville}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Pays</label>
              <input
                type="text"
                name="pays"
                value={form.pays}
                onChange={handleChange}
                className={errors.pays ? "input-error" : ""}
                required
              />
              {errors.pays && <span className="field-error">{errors.pays}</span>}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-filled">
                Ajouter
              </button>
              <button
                type="button"
                className="outline-btn"
                onClick={() => {
                  setShowForm(false);
                  setForm(emptyForm);
                  setErrors({});
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p>Chargement...</p>
        ) : addresses.length === 0 ? (
          <p className="empty-orders">Aucune adresse enregistrée.</p>
        ) : (
          addresses.map((addr) => (
            <AddressCard
              key={addr.id_adresse}
              type={addr.titre}
              nom={nom}
              prenom={prenom}
              rue={addr.rue}
              codePostal={addr.cp}
              ville={addr.ville}
              pays={addr.pays}
              onEdit={() => {}}
              onDelete={() => handleDelete(addr.id_adresse)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
