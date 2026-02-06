import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({ produit }) => {

    const imageURL = produit.image ? `${import.meta.env.VITE_API_URL}/images/${produit.image}` :
        "https://placehold.co/600x400";

    return (
        <div className="product-card">

            <img
                src={imageURL}
                alt={produit.nom_produit}
                className="product-card-img"
            />

            <h3>{produit.nom_produit}</h3>
            <p>{produit.prix_HT} €</p>

            <Link to={`/produit/${produit.code_produit}`} className="details-btn">
                Voir détails
            </Link>
        </div>
    );
};

export default ProductCard;