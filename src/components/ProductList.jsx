import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ProductCard from "./ProductCard.jsx";
import "./styles/ProductList.css";

// Ajout de la prop pour filtrer par catégorie
const ProductList = ({ categorie }) => {
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // URL dynamique selon la catégorie demandée
        // Si une catégorie est fournie, on utilise la route "categorie", sinon on prend tout
        const fetchUrl = categorie
            ? `${import.meta.env.VITE_API_URL}/api/articles/categorie/${categorie}`
            : `${import.meta.env.VITE_API_URL}/api/articles`;

        const response = await fetch(fetchUrl);

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        setProduits(data.articles);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
        setError("Impossible de charger les produits");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProduits();
  }, [categorie]);

  if (isLoading) {
    return (
        <div className="product-list">
          {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="product-skeleton">
                <Skeleton height={200} width={300} />
                <div style={{ marginTop: "0.5rem" }}><Skeleton height={20} width="70%" /></div>
              </div>
          ))}
        </div>
    );
  }
  if (error) {
    return (
        <div className="product-list-error">
          <div className="error-container">
            <h3>Une erreur est survenue</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Réessayer
            </button>
          </div>
        </div>
    );
  }

  const produitsEnPromo = produits.filter((produit) => {
    return produit.produit_promotion === 1;
  });

  return (
      <div>
        {/* Affichage des promos de la catégorie */}
        {produitsEnPromo.length > 0 && (
            <div className="product-list promo-list">
              <h2>Découvrez nos promotions sur le {categorie}</h2>
              {produitsEnPromo.map((produit) => (
                  <ProductCard key={`promo-${produit.code_produit}`} produit={produit} />
              ))}
            </div>
        )}

        {/* Affichage de tous les produits de la catégorie */}
        <div className="product-list">
          {produits.map((produit) => (
              <ProductCard key={produit.code_produit} produit={produit} />
          ))}
        </div>

        <div className="category-page-container">

          {/* ZONE 1 : Fil d'Ariane */}
          <nav className="breadcrumb">
            <span>Accueil</span> &gt; <span>Cafés</span>
          </nav>

          {/* ZONE 2 : L'en-tête (Titre + Outils) */}
          <header className="category-header">
            <h1 className="category-title">Cafés</h1>

            <div className="category-toolbar">
              <div className="toolbar-filters">
                <span className="filter-label">Filtres</span>

                {/* Le curseur de prix */}
                <div className="price-slider-container">
                  <span className="price-label">Prix (€)</span>
                  {/* Ton input range ira ici */}
                  <div className="price-values">
                    <span>0€</span>
                    <span>100€</span>
                  </div>
                </div>

                <button className="reset-filters-btn">Réinitialiser les filtres</button>
              </div>

              <div className="toolbar-actions">
                <span className="product-count">4 produits</span>
                <button className="main-filter-btn">FILTRES</button>
              </div>
            </div>
          </header>

          {/* ZONE 3 : La Grille (Tu l'as déjà !) */}
          <section className="product-grid">
            {/* Tes <ProductCard /> viendront se boucler ici */}
          </section>

          {/* ZONE 4 : La Pagination */}
          <nav className="pagination">
            <button className="page-nav">← Précédent</button>
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
            <button className="page-nav">Suivant →</button>
          </nav>

        </div>

      </div>
  );
};

export default ProductList;