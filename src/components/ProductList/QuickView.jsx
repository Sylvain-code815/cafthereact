import React from 'react';
import './QuickViewModal.css';

// Pour avoir un aperçu du produit
const QuickViewModal = ({ produit, onClose }) => {
    if (!produit) return null;

    return (
        <div className="quickview-overlay" onClick={onClose}>

            <div className="quickview-content" onClick={(e) => e.stopPropagation()}>

                <button className="quickview-close" onClick={onClose}>
                    &times;
                </button>

                <div className="quickview-body">
                    <div className="quickview-image-container">
                        <img
                            src={produit.image_url || "/placeholder.jpg"}
                            alt={produit.nom_produit}
                            className="quickview-image"
                        />
                    </div>

                    <div className="quickview-info">
                        <h2 className="quickview-title">{produit.nom_produit}</h2>
                        <p className="quickview-category">{produit.categorie}</p>
                        <p className="quickview-price">{produit.prix_ttc} €</p>

                        <p className="quickview-description">
                            {produit.description || "Aucune description disponible pour ce produit."}
                        </p>

                        <button className="quickview-add-btn black-btn">
                            Ajouter au panier
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default QuickViewModal;