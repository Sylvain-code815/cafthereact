import React from 'react';
import ProductList from "../components/ProductList/ProductList.jsx";
import SEO from "../components/SEO.jsx";

const Promotion = () => {
    return (
        <>
            <SEO title="Promotions" description="Profitez de nos offres promotionnelles sur une sélection de thés et cafés. Des réductions exclusives toute l'année." />
            <ProductList categorie="produit_promotion" />
        </>
    );
};


export default Promotion;