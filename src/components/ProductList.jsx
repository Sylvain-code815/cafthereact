import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { CartContext } from "../context/CartContext.jsx";
import ProductCard from "./ProductCard.jsx";
import "./styles/ProductList.css";

const ITEMS_PER_PAGE = 6;

const CATEGORY_LABELS = {
  the: "Thés",
  Cafe: "Cafés",
  Accessory: "Accessoires",
  produit_phare: "Produits phares",
  produit_promotion: "Promotions",
};

function RangeSlider({ min, max, value, onChange }) {
  const trackRef = useRef(null);

  const getPercent = useCallback(
    (v) => ((v - min) / (max - min)) * 100,
    [min, max]
  );

  const handlePointer = (index) => (e) => {
    e.preventDefault();
    const track = trackRef.current;
    const move = (ev) => {
      const rect = track.getBoundingClientRect();
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      const val = Math.round(min + (pct / 100) * (max - min));
      const next = [...value];
      next[index] = val;
      if (next[0] > next[1]) return;
      onChange(next);
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
  };

  return (
    <div className="pl-range-slider">
      <span className="pl-range-label">Prix (€)</span>
      <div className="pl-range-track-wrap" ref={trackRef}>
        <div className="pl-range-track" />
        <div
          className="pl-range-fill"
          style={{
            left: `${getPercent(value[0])}%`,
            width: `${getPercent(value[1]) - getPercent(value[0])}%`,
          }}
        />
        <div
          className="pl-range-thumb"
          style={{ left: `${getPercent(value[0])}%` }}
          onMouseDown={handlePointer(0)}
          onTouchStart={handlePointer(0)}
        />
        <div
          className="pl-range-thumb"
          style={{ left: `${getPercent(value[1])}%` }}
          onMouseDown={handlePointer(1)}
          onTouchStart={handlePointer(1)}
        />
      </div>
      <div className="pl-range-bounds">
        <span>{value[0]}€</span>
        <span>{value[1]}€</span>
      </div>
    </div>
  );
}

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

  // Pagination
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
          <button onClick={() => window.location.reload()} className="retry-button">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-container">
      {/* Breadcrumb */}
      <nav className="pl-breadcrumb">
        <Link to="/">Accueil</Link>
        <span>/</span>
        <span>{label}</span>
      </nav>

      {/* Header : titre + contrôles */}
      <div className="pl-top-section">
        <h1 className="pl-title">{label}</h1>

        <div className="pl-controls">
          {/* Filtre prix desktop */}
          <div className="pl-filter-bar">
            <RangeSlider
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

          {/* Tri par prix */}
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

          {/* Toggle filtres mobile */}
          <button
            className="pl-filters-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="18" x2="12" y2="18" />
            </svg>
            FILTRES
          </button>
        </div>
      </div>

      {/* Filtres mobile */}
      <div className={`pl-mobile-filter-panel ${filtersOpen ? "open" : ""}`}>
        <RangeSlider
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

      {/* Grille produits */}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="pl-pagination">
          <button
            className="pl-page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ← Précédent
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={`pl-page-num ${n === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(n)}
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
