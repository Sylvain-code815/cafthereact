import { Link } from "react-router-dom";
import "./styles/LegalPage.css";

const Sitemap = () => {
  return (
    <div className="legal-page">
      <h1>Plan du site</h1>

      <div className="sitemap-section">
        <h2>Accueil</h2>
        <ul>
          <li><Link to="/">Page d'accueil</Link></li>
        </ul>
      </div>

      <div className="sitemap-section">
        <h2>Nos produits</h2>
        <ul>
          <li><Link to="/the">Nos thés</Link></li>
          <li><Link to="/cafe">Nos cafés</Link></li>
          <li><Link to="/accessory">Accessoires</Link></li>
          <li><Link to="/promotions">Nos promotions</Link></li>
          <li><Link to="/produits-phares">Produits phares</Link></li>
        </ul>
      </div>

      <div className="sitemap-section">
        <h2>Mon compte</h2>
        <ul>
          <li><Link to="/login">Connexion</Link></li>
          <li><Link to="/signup">Inscription</Link></li>
          <li><Link to="/panier">Mon panier</Link></li>
        </ul>
      </div>

      <div className="sitemap-section">
        <h2>Informations légales</h2>
        <ul>
          <li><Link to="/conditions-generales">Conditions générales de vente</Link></li>
          <li><Link to="/politique-confidentialite">Politique de confidentialité</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sitemap;
