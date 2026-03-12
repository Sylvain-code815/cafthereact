import { useState, useRef, createContext } from "react";

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const fetchedRef = useRef(false);

  const fetchProducts = async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setIsLoadingProducts(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles`
      );
      if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
      const data = await response.json();
      setAllProducts(data.articles);
      setProductsLoaded(true);
    } catch (err) {
      console.error("Erreur lors du chargement des produits :", err);
      fetchedRef.current = false;
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    if (!fetchedRef.current) {
      fetchProducts();
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        openSearch,
        closeSearch,
        allProducts,
        productsLoaded,
        isLoadingProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
