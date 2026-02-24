import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerReview from "../components/CustomerReview.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import "./styles/Home.css";

const Home = () => {
  const [promoProducts, setPromoProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [promoRes, allRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/articles/promo`),
          fetch(`${import.meta.env.VITE_API_URL}/api/articles`),
        ]);

        if (!promoRes.ok || !allRes.ok) throw new Error("Erreur");

        const promoData = await promoRes.json();
        const allData = await allRes.json();

        setPromoProducts(promoData.articles);
        const featured = allData.articles.filter((p) => p.produit_promotion !== 1).slice(0, 5);
        setFeaturedProducts(featured);
      } catch (err) {
        console.error("Erreur chargement produits:", err);
      }
    };
    fetchProducts();
  }, []);

  const reviews = [
    { id: 1, name: "Marie L.", review: "Un thé d'une qualité exceptionnelle, les arômes sont incroyables. Je recommande vivement !", rating: 5 },
    { id: 2, name: "Pierre D.", review: "Le café est torréfié à la perfection. Un vrai plaisir chaque matin.", rating: 5 },
    { id: 3, name: "Sophie M.", review: "Service client au top et livraison rapide. Les produits sont excellents.", rating: 4 },
    { id: 4, name: "Jean-Paul R.", review: "J'ai découvert des saveurs que je ne connaissais pas. Merci Cafthé !", rating: 5 },
    { id: 5, name: "Camille B.", review: "Parfait pour les amateurs de thé comme moi. Grande variété de choix.", rating: 4 },
    { id: 6, name: "Lucas T.", review: "Qualité premium, on sent la différence avec les produits du commerce.", rating: 5 },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="hero-left">
          <h2>nos thés</h2>
          <Link to="/the">
          <button>découvrir</button>
          </Link>
        </div>
        <div className="hero-right">
          <h2>nos cafés</h2>
          <Link to="/cafe">
            <button>découvrir</button>
          </Link>
        </div>
      </section>

      <section className="products-section">
        <ProductCarousel
          products={promoProducts}
          title="Promotions"
          linkTo="/promotions"
          linkText="en voir plus"
        />
        <ProductCarousel
          products={featuredProducts}
          title="Produits phares"
          linkTo="/produits-phares"
          linkText="en voir plus"
        />
      </section>

      <section className="engagements-section">
        <h2>Nos engagements</h2>
        <p className="p-engagement">Des valeurs qui guident notre sélection et notre service</p>
        <div className="engagements-grid">
          <div className="engagement-item">
            <img src="/src/Images/Icon/engagement-agriculture.svg" alt="agriculture" role="img" />
            <h3>Agriculture Durable</h3>
            <p>Produits issus de l'agriculture biologique et du commerce équitable</p>
          </div>
          <div className="engagement-item">
            <img src="/src/Images/Icon/engagement-qualite.svg" alt="qualité" role="img" />
            <h3>Qualité Premium</h3>
            <p>Sélection rigoureuse des meilleurs terroirs mondiaux</p>
          </div>
          <div className="engagement-item">
            <img src="/src/Images/Icon/engagement-passion.svg" alt="passion" role="img" />
            <h3>Passion & Expertise</h3>
            <p>Plus de 20 ans d'expérience dans l'art du thé et du café</p>
          </div>
          <div className="engagement-item">
            <img src="/src/Images/Icon/engagement-livraison.svg" alt="livraison" role="img" />
            <h3>Livraison Gratuite</h3>
            <p>Dès 50€ d'achat, partout en France métropolitaine</p>
          </div>
        </div>
      </section>

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

    </main>
  );
};

export default Home;
