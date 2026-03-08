import React, { useState, useEffect, useRef, useContext } from "react";
import { SearchContext } from "../../context/SearchContext.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";
import "./SearchOverlay.css";

const SearchOverlay = () => {
  const { isSearchOpen, closeSearch, allProducts, productsLoaded, isLoadingProducts } = useContext(SearchContext);

  // Un seul state pour la recherche (plus de debounce)
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // 1. Auto-focus à l'ouverture et remise à zéro à la fermeture
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isSearchOpen) {
      setQuery("");
    }
  }, [isSearchOpen]);

  // 2. Fermeture simple avec la touche "Échap" (fini le Focus Trap complexe !)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isSearchOpen) closeSearch();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  // 3. Filtrage direct et ultra simple
  const trimmed = query.trim().toLowerCase();
  const filteredProducts = trimmed
    ? allProducts.filter((p) => {
        const nom = (p.nom_produit || "").toLowerCase();
        const origine = (p.origine || "").toLowerCase();
        return nom.includes(trimmed) || origine.includes(trimmed);
      })
    : [];

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Recherche">
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
            <button className="search-clear-btn" onClick={() => setQuery("")}>&times;</button>
          )}
        </div>
        <button className="btn-outline search-close-btn" onClick={closeSearch}>
          Fermer
        </button>
      </div>

      <div className="search-overlay-body">
        {/* Affichage conditionnel simplifié au maximum */}

        {isLoadingProducts && <p className="search-message">Chargement des produits...</p>}

        {!trimmed && productsLoaded && (
          <p className="search-message">Tapez votre recherche pour trouver un produit</p>
        )}

        {trimmed && productsLoaded && filteredProducts.length === 0 && (
          <p className="search-message">Aucun produit ne correspond à &laquo; {query} &raquo;</p>
        )}

        {trimmed && filteredProducts.length > 0 && (
          <>
            <p className="search-results-count">
              {filteredProducts.length} résultat{filteredProducts.length > 1 ? "s" : ""}
            </p>
            <div className="product-list">
              {filteredProducts.map((produit) => (
                <ProductCard key={produit.code_produit} produit={produit} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
