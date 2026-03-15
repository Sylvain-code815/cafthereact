import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { CartContext } from "../../contexts/CartContext.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";
import Breadcrumb from "../Breadcrumb/Breadcrumb.jsx";
import { CATEGORY_LABELS } from "../../utils/categories.js";
import PriceSlider from "./RangeSlider.jsx";
import "./ProductList.css";

const ITEMS_PER_PAGE = 6;

const ProductList = ({ categorie }) => {
  const { addToCart } = useContext(CartContext);
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const label = CATEGORY_LABELS[categorie] || categorie;

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let fetchUrl;
        if (categorie === "produit_promotion") {
          fetchUrl = `${import.meta.env.VITE_API_URL}/api/articles/promo`;
        } else if (categorie === "produit_phare") {
          fetchUrl = `${import.meta.env.VITE_API_URL}/api/articles/phares`;
        } else if (categorie) {
          fetchUrl = `${import.meta.env.VITE_API_URL}/api/articles/categorie/${categorie}`;
        } else {
          fetchUrl = `${import.meta.env.VITE_API_URL}/api/articles`;
        }

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

  // Reset page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, sortOrder, selectedCategory]);

  const resetFilters = () => {
    setPriceRange([0, 100]);
    setSortOrder("default");
    setSelectedCategory("all");
  };

  // Catégories disponibles dans les produits chargés
  const categories = [...new Set(produits.map((p) => p.categorie).filter(Boolean))];

  // Filtrage par prix + catégorie
  const filtered = produits
    .filter((p) => p.prix_ttc >= priceRange[0] && p.prix_ttc <= priceRange[1])
    .filter((p) => selectedCategory === "all" || p.categorie === selectedCategory);

  // Tri par prix
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") return a.prix_ttc - b.prix_ttc;
    if (sortOrder === "desc") return b.prix_ttc - a.prix_ttc;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paged = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="pl-container">
        <div className="pl-grid">
          {Array.from({ length: 6 }).map((_, i) => (
              // Skeletons de chargement
            <div key={i} className="product-skeleton">
              <Skeleton height={250} />
              <div style={{ marginTop: "0.5rem" }}>
                <Skeleton height={20} width="70%" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-error">
        <div className="error-container">
          <h3>Une erreur est survenue</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-filled retry-button">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-container">
      <Breadcrumb items={[{ label: label }]} />

      <div className="pl-top-section">
        <h1 className="pl-title">{label}</h1>

        <div className="pl-controls">
          {/* Filtre prix desktop */}
          <div className="pl-filter-bar">
            <PriceSlider
                min={0}
                max={100}
                value={priceRange}
                onChange={setPriceRange}
            />
          </div>

          {/* Filtre catégorie */}
          {categories.length > 1 && (
            <select
              className="pl-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat] || cat}
                </option>
              ))}
            </select>
          )}

          <select
            className="pl-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Trier par</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>

          <span className="pl-product-count">{sorted.length} produit{sorted.length > 1 ? "s" : ""}</span>

          <button className="pl-reset-btn" onClick={resetFilters}>
            Réinitialiser
          </button>

          <button
            className="pl-filters-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            FILTRES
          </button>
        </div>
      </div>


      {/* Distinction filtres mobile pour perf (chargement) et UX (vrai fenêtre modale)*/}
      <div className={`pl-mobile-filter-panel ${filtersOpen ? "open" : ""}`}>
        <PriceSlider
            min={0}
            max={100}
            value={priceRange}
            onChange={setPriceRange}
        />
        {categories.length > 1 && (
          <select
            className="pl-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat] || cat}
              </option>
            ))}
          </select>
        )}
        <select
          className="pl-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Trier par</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
        <button className="pl-reset-btn" onClick={resetFilters}>
          Réinitialiser
        </button>
      </div>

      <div className="pl-grid">
        {paged.map((produit, index) => (
          <ProductCard
            key={produit.code_produit}
            produit={produit}
            onAddToCart={addToCart}
            index={index}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="pl-no-results">Aucun produit ne correspond à vos filtres.</p>
      )}

      {totalPages > 1 && (
        <nav className="pl-pagination" aria-label="Pagination">
          <button
            className="pl-page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ← Précédent
          </button>
          {/*1er paramètre l'élément qu'on ignore + décalage de l'index pour avoir le numéro réel*/}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={`pl-page-num ${n === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(n)}
              aria-label={`Page ${n}`}
              aria-current={n === currentPage ? "page" : undefined}
            >
              {n}
            </button>
          ))}
          <button
            className="pl-page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Suivant →
          </button>
        </nav>
      )}
    </div>
  );
};

export default ProductList;
