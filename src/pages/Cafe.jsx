import React from "react";
import ProductList from "../components/ProductList/ProductList.jsx";
import SEO from "../components/SEO.jsx";

const Cafe = () => {
  return (
    <>
      <SEO title="Nos Cafés" description="Explorez notre sélection de cafés torréfiés avec soin. Des origines variées pour satisfaire tous les palais." />
      <ProductList categorie="Cafe" />
    </>
  );
};

export default Cafe;
