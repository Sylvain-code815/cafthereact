import React from 'react';
import { Link } from "react-router-dom";
import '../styles/ProductCard.css';

const ProductCard = ({ produit }) => {

    const imageURL = produit.image ? `${import.meta.env.VITE_API_URL}/images/${produit.image}` :
        "https://placehold.co/600x400";

    return (
        <div className="product-card">

            <Link to={`/produit/${produit.code_produit}`} className="details-btn">
                <img
                    src={imageURL}
                    alt={produit.nom_produit}
                    className="product-card-img"
                />
            </Link>

            <h3>{produit.nom_produit}</h3>
            <p>{produit.prix_HT} €</p>

        </div>
    );
};

export default ProductCard;