import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SearchOverlay from "../components/SearchOverlay.jsx";
import { SearchContext } from "../context/SearchContext.jsx";

const Layout = () => {
  const { isSearchOpen, closeSearch } = useContext(SearchContext);
  const location = useLocation();

  // Fermer la recherche quand l'utilisateur navigue
  useEffect(() => {
    closeSearch();
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      {isSearchOpen ? (
        <SearchOverlay />
      ) : (
        <>
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
