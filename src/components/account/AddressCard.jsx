import React from "react";

const AddressCard = ({ type, nom, prenom, rue, codePostal, ville, pays, telephone, isDefault, onEdit, onDelete }) => {
  return (
    <div className="address-card">
      <div className="address-info">
        <h4>
          {type}
          {isDefault && <span className="badge">Par défaut</span>}
        </h4>
        <p>{prenom} {nom}</p>
        <p>{rue}</p>
        <p>{codePostal} {ville}</p>
        <p>{pays}</p>
        <p>{telephone}</p>
      </div>
      <div className="address-actions">
        <button className="text-btn" onClick={onEdit}>Modifier</button>
        <button className="text-btn" onClick={onDelete}>Supprimer</button>
      </div>
    </div>
  );
};

export default AddressCard;
