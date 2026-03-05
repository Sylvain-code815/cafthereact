import React from 'react';
import ProductList from "../components/ProductList/ProductList.jsx";
import SEO from "../components/SEO.jsx";

const Phare = () => {
    return (
        <>
            <SEO title="Produits Phares" description="Nos produits phares : les thés et cafés les plus appréciés par nos clients. Une sélection de qualité premium." />
            <ProductList categorie="produit_phare" />
        </>
    );
};

export default Phare;