import React from "react";
import AddressCard from "./AddressCard";

const mockAddresses = [
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

const ProfileTab = ({ prenom, nom, email }) => {
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
          <button className="black-btn full-width-btn">
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
            <img src="/src/Images/Icon/signup-mdp.svg" alt="" />
            <span>Changer mon mot de passe</span>
          </button>
        </div>
      </div>

      <div className="addresses-section">
        <h3 className="section-title">Mes adresses</h3>
        {mockAddresses.map((addr) => (
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
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileTab;
