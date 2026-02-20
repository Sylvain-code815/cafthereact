import React from "react";
import ProductList from "../components/ProductList";

const ThePage = () => {
  return (
      <main>
        <h1>Nos Thés</h1>
        <ProductList categorie="the" />
      </main>
  );
};

export default ThePage;