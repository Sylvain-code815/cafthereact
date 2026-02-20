import React from 'react';
import ProductList from "../components/ProductList.jsx";

const Phare = () => {
    return (
        <main>
            <h1>Nos meilleures ventes</h1>
            <ProductList categorie="produit_phare" />
        </main>
    );
};

export default Phare;