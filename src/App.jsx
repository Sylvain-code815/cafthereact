import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookieManager } from "react-cookie-manager";
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
import Sitemap from "./pages/Sitemap.jsx";
import CGV from "./pages/CGV.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Account from "./pages/Account.jsx";

function App() {
  return (
    <BrowserRouter>
      <CookieManager
        translations={{
          title: "Gestion des cookies",
          message:
            "CafThé utilise des cookies pour améliorer votre expérience de navigation, personnaliser le contenu et analyser notre trafic. Vous pouvez accepter ou refuser ces cookies.",
          buttonText: "Accepter tout",
          declineButtonText: "Refuser tout",
          manageButtonText: "Gérer les cookies",
          privacyPolicyText: "Politique de confidentialité",
          manageTitle: "Préférences de cookies",
          manageMessage:
            "Gérez vos préférences de cookies ci-dessous. Les cookies essentiels sont toujours activés car ils sont nécessaires au bon fonctionnement du site.",
          manageEssentialTitle: "Essentiels",
          manageEssentialSubtitle:
            "Nécessaires au bon fonctionnement du site",
          manageEssentialStatus: "Statut : Toujours activé",
          manageEssentialStatusButtonText: "Toujours activé",
          manageAnalyticsTitle: "Analytiques",
          manageAnalyticsSubtitle:
            "Nous aident à comprendre comment les visiteurs interagissent avec notre site",
          manageSocialTitle: "Réseaux sociaux",
          manageSocialSubtitle:
            "Activent les fonctionnalités de partage sur les réseaux sociaux",
          manageAdvertTitle: "Publicité",
          manageAdvertSubtitle:
            "Personnalisent les publicités et mesurent leur performance",
          manageCookiesStatus: "Statut : {{status}} le {{date}}",
          manageCookiesStatusConsented: "Accepté",
          manageCookiesStatusDeclined: "Refusé",
          manageCancelButtonText: "Annuler",
          manageSaveButtonText: "Enregistrer",
        }}
        privacyPolicyUrl="/politique-confidentialite"
        theme="light"
        displayType="popup"
        showManageButton={true}
      >
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
                </Route>
              </Routes>
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </CookieManager>
    </BrowserRouter>
  );
}

export default App;
