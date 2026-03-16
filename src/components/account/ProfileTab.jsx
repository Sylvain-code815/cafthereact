import React, { useState } from "react";
import AddressCard from "./AddressCard";
import { getSavedAddresses, saveAddresses } from "../../utils/savedAddress";

const defaultAddresses = [
  {
    id_adresse: 1,
    type: "Domicile",
    rue: "25 rue de la République",
    code_postal: "69002",
    ville: "Lyon",
    pays: "France",
    telephone: "+33 6 12 34 56 78",
    par_defaut: true,
  },
  {
    id_adresse: 2,
    type: "Bureau",
    rue: "10 avenue des Champs",
    code_postal: "69003",
    ville: "Lyon",
    pays: "France",
    telephone: "+33 6 12 34 56 78",
    par_defaut: false,
  },
];

const emptyForm = {
  type: "",
  rue: "",
  code_postal: "",
  ville: "",
  pays: "France",
  telephone: "",
};

const ProfileTab = ({ prenom, nom, email }) => {
  const [addresses, setAddresses] = useState(() => {
    const saved = getSavedAddresses();
    return saved.length > 0 ? saved : defaultAddresses;
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (/\d/.test(form.type))
      errs.type = "Le type ne doit pas contenir de chiffres";
    if (!form.rue.trim()) errs.rue = "La rue est requise";
    if (!/^\d{5}$/.test(form.code_postal))
      errs.code_postal = "Le code postal doit contenir exactement 5 chiffres";
    if (/\d/.test(form.ville))
      errs.ville = "La ville ne doit pas contenir de chiffres";
    if (/\d/.test(form.pays))
      errs.pays = "Le pays ne doit pas contenir de chiffres";
    if (form.telephone) {
      const digits = form.telephone.replace(/[\s+()-]/g, "");
      const isValid = /^0\d{9}$/.test(digits) || /^33\d{9}$/.test(digits);
      if (!isValid)
        errs.telephone = "Le téléphone doit contenir 10 chiffres (ex : 06 12 34 56 78)";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const newAddress = {
      ...form,
      id_adresse: Date.now(),
      par_defaut: false,
    };
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    saveAddresses(updated);
    setForm(emptyForm);
    setErrors({});
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updated = addresses.filter((a) => a.id_adresse !== id);
    setAddresses(updated);
    saveAddresses(updated);
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
            <div className="info-group full-width">
              <span className="label">Téléphone</span>
              <span className="value">+33 6 12 34 56 78</span>
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
              <label>Type</label>
              <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Ex : Domicile, Bureau..."
                className={errors.type ? "input-error" : ""}
                required
              />
              {errors.type && <span className="field-error">{errors.type}</span>}
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
                  name="code_postal"
                  value={form.code_postal}
                  onChange={handleChange}
                  placeholder="Ex : 69002"
                  maxLength={5}
                  className={errors.code_postal ? "input-error" : ""}
                  required
                />
                {errors.code_postal && <span className="field-error">{errors.code_postal}</span>}
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
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="text"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                placeholder="Ex : +33 6 12 34 56 78"
                className={errors.telephone ? "input-error" : ""}
              />
              {errors.telephone && <span className="field-error">{errors.telephone}</span>}
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

        {addresses.map((addr) => (
          <AddressCard
            key={addr.id_adresse}
            type={addr.type}
            nom={nom}
            prenom={prenom}
            rue={addr.rue}
            codePostal={addr.code_postal}
            ville={addr.ville}
            pays={addr.pays}
            telephone={addr.telephone}
            isDefault={addr.par_defaut}
            onEdit={() => {}}
            onDelete={() => handleDelete(addr.id_adresse)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileTab;
