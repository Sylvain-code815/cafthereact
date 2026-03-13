import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import Cafe from "./pages/Cafe.jsx";
import Accessory from "./pages/Accessory.jsx";
import The from "./pages/The.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Phare from "./pages/Phare.jsx";
import Promotion from "./pages/Promotion.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import SignUp from "./pages/SignUp.jsx";
import Sitemap from "./pages/Sitemap.jsx";
import CGV from "./pages/CGV.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Account from "./pages/Account/Account.jsx";
import Order from "./pages/Order/Order.jsx";
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <BrowserRouter>
        <ThemeProvider>
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
                  <Route path="plan-du-site" element={<Sitemap />} />
                  <Route path="conditions-generales" element={<CGV />} />
                  <Route path="politique-confidentialite" element={<PrivacyPolicy />} />
                  <Route path="account" element={<Account />} />
                  <Route path="order" element={<Order />} />
                </Route>
              </Routes>

                <CookieConsent
                    location="bottom"
                    buttonText="J'accepte"
                    declineButtonText="Je refuse"
                    enableDeclineButton
                    cookieName="cafthe_rgpd_consent"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ background: "#4caf50", color: "white", fontSize: "14px", borderRadius: "4px" }}
                    declineButtonStyle={{ background: "transparent", color: "white", fontSize: "14px" }}
                    expires={150}
                >
                    CafThé utilise des cookies pour améliorer votre expérience de navigation.{" "}
                    <a href="/politique-confidentialite" style={{ color: "#fff", textDecoration: "underline" }}>
                        En savoir plus
                    </a>
            </CookieConsent>
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
