import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { CartContext } from "../context/CartContext";
import CustomerReview from "../components/CustomerReview.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import "./styles/ProductDetails.css";

const reviews = [
  { id: 1, name: "Marie L.", review: "Un thé d'une qualité exceptionnelle, les arômes sont incroyables. Je recommande vivement !", rating: 5 },
  { id: 2, name: "Pierre D.", review: "Le café est torréfié à la perfection. Un vrai plaisir chaque matin.", rating: 5 },
  { id: 3, name: "Sophie M.", review: "Service client au top et livraison rapide. Les produits sont excellents.", rating: 4 },
  { id: 4, name: "Jean-Paul R.", review: "J'ai découvert des saveurs que je ne connaissais pas. Merci Cafthé !", rating: 5 },
  { id: 5, name: "Camille B.", review: "Parfait pour les amateurs de thé comme moi. Grande variété de choix.", rating: 4 },
  { id: 6, name: "Lucas T.", review: "Qualité premium, on sent la différence avec les produits du commerce.", rating: 5 },
];

const WEIGHT_OPTIONS = [
  { value: 100, label: "100g" },
  { value: 200, label: "200g" },
  { value: 500, label: "500g" },
  { value: 1000, label: "1kg" },
];

const getUnitLabel = (typeVente) => {
  switch (typeVente) {
    case "Vrac": return "/ 100g";
    case "Sachet": return "/ sachet";
    case "Boite": return "/ boîte";
    case "Unité": return "/ unité";
    default: return "/ 100g";
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [produit, setProduit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(100);

  // Fetch produit principal
  useEffect(() => {
    const fetchProduit = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setQuantity(1);
        setSelectedWeight(100);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/${id}`
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        setProduit(data.article);
      } catch (err) {
        console.error("Erreur lors du chargement du produit :", err);
        setError("Impossible de charger le produit");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProduit();
  }, [id]);

  // Fetch suggestions par catégorie
  useEffect(() => {
    if (!produit?.categorie) return;

    const fetchSuggested = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/categorie/${produit.categorie}`
        );

        if (!response.ok) return;

        const data = await response.json();
        const filtered = (data.articles || [])
          .filter((a) => a.code_produit !== produit.code_produit)
          .slice(0, 3);
        setSuggested(filtered);
      } catch {
        setSuggested([]);
      }
    };

    void fetchSuggested();
  }, [produit]);

  const getImageUrl = (img, name) =>
    img
      ? `${import.meta.env.VITE_API_URL}/images/${img}`
      : `https://placehold.co/600x600?text=${encodeURIComponent(name)}`;

  // Skeleton
  if (isLoading) {
    return (
      <div className="pd-skeleton">
        <Skeleton width={200} height={16} />
        <div className="pd-skeleton-grid">
          <Skeleton height={400} />
          <div className="pd-skeleton-info">
            <Skeleton height={32} width="70%" />
            <Skeleton height={16} width="30%" />
            <Skeleton height={24} width="40%" />
            <Skeleton height={80} />
            <Skeleton height={16} width="50%" />
            <Skeleton height={40} width="60%" />
          </div>
        </div>
      </div>
    );
  }

  // Erreur
  if (error) {
    return (
      <div className="pd-error">
        <h3>Une erreur est survenue</h3>
        <p>{error}</p>
        <Link to="/" className="pd-error-link">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const isVrac = produit.type_vente === "Vrac";
  const imageUrl = getImageUrl(produit.image, produit.nom_produit);

  const totalPrice = isVrac
    ? (produit.prix_ttc * (selectedWeight / 100)).toFixed(2)
    : (produit.prix_ttc * quantity).toFixed(2);

  const handleAddToCart = () => {
    if (!produit) return;
    if (isVrac) {
      addToCart(produit, selectedWeight);
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart(produit);
      }
    }
  };

  return (
    <div className="pd-container">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: produit.categorie, to: `/${produit.categorie.toLowerCase()}` },
        { label: produit.nom_produit },
      ]} />

      {/* Bouton retour */}
      <button className="pd-back-btn" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      {/* Section produit */}
      <div className="pd-section">
        <div className="pd-gallery">
          <img
            src={imageUrl}
            alt={produit.nom_produit}
            className="pd-main-image"
          />
        </div>

        {/* Infos */}
        <div className="pd-info">
          <h1 className="pd-title">{produit.nom_produit}</h1>

          {produit.origine && (
            <p className="pd-origin">Origine : {produit.origine}</p>
          )}

          {produit.rating && (
            <div className="pd-rating-row">
              <Stars rating={produit.rating} />
              {produit.reviewCount && (
                <span className="pd-rating-count">
                  ({produit.reviewCount} avis)
                </span>
              )}
            </div>
          )}

          <div className="pd-price-row">
            <span className="pd-price">{produit.prix_ttc}€</span>
            <span className="pd-unit">{getUnitLabel(produit.type_vente)}</span>
          </div>

          {produit.description && (
            <div className="pd-description-block">
              <h2 className="pd-description-label">Description</h2>
              <p className="pd-description-text">{produit.description}</p>
            </div>
          )}

          <p
            className={`pd-stock ${produit.stock <= 5 ? "pd-stock--low" : ""}`}
          >
            {produit.stock > 0
              ? `${produit.stock} unités disponibles`
              : "Rupture de stock"}
          </p>

          {/* Box achat : quantité/poids + total + bouton */}
          <div className="pd-purchase-box">
            {isVrac ? (
              /* Sélecteur de poids pour le vrac */
              <div className="pd-quantity-row">
                <span className="pd-quantity-label">Poids</span>
                <select
                  className="pd-weight-select"
                  value={selectedWeight}
                  onChange={(e) => setSelectedWeight(Number(e.target.value))}
                >
                  {WEIGHT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              /* Quantité classique pour sachet/boite/unité */
              <div className="pd-quantity-row">
                <span className="pd-quantity-label">Quantité</span>
                <div className="pd-qty-control">
                  <button
                    className="pd-qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Diminuer la quantité"
                  >
                    −
                  </button>
                  <span className="pd-qty-value">{quantity}</span>
                  <button
                    className="pd-qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Augmenter la quantité"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="pd-total-row">
              <span className="pd-total-label">Total</span>
              <span className="pd-total-price">{totalPrice}€</span>
            </div>

            {/* Bouton ajouter au panier */}
            <button
              className="pd-add-to-cart"
              onClick={handleAddToCart}
              disabled={produit.stock <= 0}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {suggested.length > 0 && (
        <section className="pd-suggested-section">
          <h2 className="pd-suggested-title">Vous aimerez aussi</h2>
          <div className="pd-suggested-grid">
            {suggested.map((s) => {
              const sgImage = getImageUrl(s.image, s.nom_produit);
              return (
                <Link
                  to={`/produit/${s.code_produit}`}
                  key={s.code_produit}
                  className="pd-sg-card"
                >
                  <div className="pd-sg-image-wrap">
                    <img src={sgImage} alt={s.nom_produit} loading="lazy" />
                    {s.produit_promotion === 1 && (
                      <span className="pd-sg-discount">Promo</span>
                    )}
                  </div>
                  <div className="pd-sg-body">
                    <h4>{s.nom_produit}</h4>
                    {s.origine && (
                      <span className="pd-sg-origin">{s.origine}</span>
                    )}
                    <span className="pd-sg-price">{s.prix_ttc}€</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Témoignages — comme sur la Home */}
      <section className="testimonials-section">
        <h2>Témoignages</h2>
        <div className="testimonials-grid">
          {reviews.map((review) => (
            <CustomerReview
              key={review.id}
              name={review.name}
              review={review.review}
              rating={review.rating}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
