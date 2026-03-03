import React from "react";
import ProductList from "../components/ProductList/ProductList.jsx";
import SEO from "../components/SEO.jsx";

const Accessory = () => {
  return (
    <>
      <SEO title="Accessoires" description="Retrouvez nos accessoires pour la préparation du thé et du café : théières, filtres, tasses et plus encore." />
      <ProductList categorie="Accessoire" />
    </>
  );
};

export default Accessory;
