import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCarousel.css";

const ProductCarousel = ({ products, title, linkTo, linkText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  if (!products || products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex];
  const imageURL = currentProduct.image
    ? `${import.meta.env.VITE_API_URL}/images/${currentProduct.image}`
    : "https://placehold.co/600x400";

  return (
    <div className="product-carousel">
      <h2>{title}</h2>

      <Link to={`/produit/${currentProduct.code_produit}`} className="carousel-image-link">
        <img
          src={imageURL}
          alt={currentProduct.nom_produit}
          className="carousel-image"
        />
      </Link>

      <div className="carousel-controls">
        <button onClick={handlePrev} className="carousel-btn">
          <img src="/src/Images/Icon/carousel-left.svg" alt="Précédent" />
        </button>

        <button onClick={handleNext} className="carousel-btn">
          <img src="/src/Images/Icon/carousel-right.svg" alt="Suivant" />
        </button>
      </div>

      <Link to={linkTo} className="btn-section">{linkText}</Link>
    </div>
  );
};

export default ProductCarousel;
