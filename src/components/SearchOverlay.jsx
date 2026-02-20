import React, { useState, useEffect, useRef, useContext } from "react";
import { SearchContext } from "../context/SearchContext.jsx";
import ProductCard from "./ProductCard.jsx";
import "./styles/SearchOverlay.css";

const SearchOverlay = () => {
  const {
    isSearchOpen,
    closeSearch,
    allProducts,
    productsLoaded,
    isLoadingProducts,
  } = useContext(SearchContext);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef(null);

  // Auto-focus à l'ouverture
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isSearchOpen) {
      setQuery("");
      setDebouncedQuery("");
    }
  }, [isSearchOpen]);

  // Debounce 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Fermeture par Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const trimmed = debouncedQuery.trim().toLowerCase();
  const filteredProducts = trimmed
    ? allProducts.filter((p) => {
        const nom = (p.nom_produit || "").toLowerCase();
        const origine = (p.origine || "").toLowerCase();
        return nom.includes(trimmed) || origine.includes(trimmed);
      })
    : [];

  const showHint = !trimmed && productsLoaded;
  const showLoading = isLoadingProducts;
  const showNoResults = trimmed && productsLoaded && filteredProducts.length === 0;
  const showResults = trimmed && filteredProducts.length > 0;

  return (
    <div className="search-overlay">
      <div className="search-overlay-header">
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher un produit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="search-clear-btn"
              onClick={() => setQuery("")}
              aria-label="Effacer"
            >
              &times;
            </button>
          )}
        </div>
        <button className="search-close-btn" onClick={closeSearch}>
          Fermer
        </button>
      </div>

      <div className="search-overlay-body">
        {showLoading && (
          <p className="search-message">Chargement des produits...</p>
        )}

        {showHint && (
          <p className="search-message">
            Tapez votre recherche pour trouver un produit
          </p>
        )}

        {showNoResults && (
          <p className="search-message">
            Aucun produit ne correspond à &laquo; {debouncedQuery} &raquo;
          </p>
        )}

        {showResults && (
          <>
            <p className="search-results-count">
              {filteredProducts.length} résultat
              {filteredProducts.length > 1 ? "s" : ""}
            </p>
            <div className="product-list">
              {filteredProducts.map((produit) => (
                <ProductCard
                  key={produit.code_produit}
                  produit={produit}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
