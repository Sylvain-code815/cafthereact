import React from "react";
import ProductList from "../components/ProductList/ProductList";
import SEO from "../components/SEO.jsx";

const ThePage = () => {
  return (
    <>
      <SEO title="Nos Thés" description="Découvrez notre collection de thés d'exception. Thés verts, noirs, blancs et infusions issus des meilleurs terroirs." />
      <ProductList categorie="the" />
    </>
  );
};

export default ThePage;