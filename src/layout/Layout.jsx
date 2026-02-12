// Pour que le footer soit toujours footer, pareil pour header etc, c'est la structure

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// But d'avoir une structure : Navbar, Outlet (contenu variable), Footer

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
