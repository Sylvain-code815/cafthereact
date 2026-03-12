import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import SearchOverlay from "../components/SearchOverlay/SearchOverlay.jsx";
import { SearchContext } from "../contexts/SearchContext.jsx";

const Layout = () => {
  const { isSearchOpen, closeSearch } = useContext(SearchContext);
  const location = useLocation();

  // Fermer la recherche quand l'utilisateur navigue
  useEffect(() => {
    closeSearch();
  }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">Aller au contenu principal</a>
      <Navbar />
      {isSearchOpen ? (
        <SearchOverlay />
      ) : (
        <>
          <main id="main-content">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
