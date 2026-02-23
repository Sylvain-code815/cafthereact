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
import { SearchProvider } from "./context/SearchContext.jsx";
import Cart from "./pages/Cart.jsx";
import Phare from "./pages/Phare.jsx";
import Promotion from "./pages/Promotion.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="produit/:id" element={<ProductDetails />} />
              <Route path="login" element={<Login />} />
              <Route path="cafe" element={<Cafe />} />
              <Route path="the" element={<The />} />
              <Route path="accessory" element={<Accessory />} />
              <Route path="panier" element={<Cart />} />
              <Route path="promotions" element={<Promotion />} />
              <Route path="produits-phares" element={<Phare />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
          </Routes>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
