import React from 'react';
import ProductList from "../components/ProductList.jsx";

const Promotion = () => {
    return (
        <main>
            <h1>Nos produits en réduction</h1>
            <ProductList categorie="produit_promotion" />
        </main>
    );
};


export default Promotion;