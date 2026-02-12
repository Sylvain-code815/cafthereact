import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Cafe from "./pages/Cafe.jsx";
import Accessory from "./pages/Accessory.jsx";
import The from "./pages/The.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    // AuthProvider enveloppe toute l'app pour partager l'état de l'authentification
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Route parent : Layout contient navbar + outlet + footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="produit/:id" element={<ProductDetails />} />
              <Route path="login" element={<Login />} />
              <Route path="cafe" element={<Cafe />} />
              <Route path="the" element={<The />} />
              <Route path="accessoires" element={<Accessory />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
