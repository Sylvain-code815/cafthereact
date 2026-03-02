import React from "react";
import ProductList from "../components/ProductList.jsx";
import SEO from "../components/seo.js";

const Accessory = () => {
  return (
      <main>
          <SEO
              title="Vente d'accessoires"
              description="Découvrez ici les meilleur accessoires, adaptés au mieux pour nos produits"
          />
        <ProductList categorie="Accessoire" />
      </main>
  );
};

export default Accessory;
