import React from "react";
import ProductList from "../components/ProductList.jsx";
import SEO from "../components/seo.js";

const Cafe = () => {
  return (
      <main>
          <SEO
              title="Ventes de cafés"
              description="Découvrez notre sélection de cafés torréfiés."
          />
        <ProductList categorie="Cafe" />
      </main>
  );
};

export default Cafe;
