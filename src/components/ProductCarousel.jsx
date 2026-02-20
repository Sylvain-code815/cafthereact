import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/ProductCarousel.css";

const ProductCarousel = ({ products, title, linkTo, linkText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetIndex, setTargetIndex] = useState(null);
  const trackRef = useRef(null);

  // Preload adjacent images
  useEffect(() => {
    if (!products || products.length <= 1) return;
    const prevIdx = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    const nextIdx = currentIndex === products.length - 1 ? 0 : currentIndex + 1;

    [prevIdx, nextIdx].forEach((idx) => {
      const p = products[idx];
      if (p?.image) {
        const img = new Image();
        img.src = `${import.meta.env.VITE_API_URL}/images/${p.image}`;
      }
    });
  }, [currentIndex, products]);

  const getImageURL = (product) =>
    product.image
      ? `${import.meta.env.VITE_API_URL}/images/${product.image}`
      : "https://placehold.co/600x400";

  const handlePrev = () => {
    if (isAnimating || !products || products.length <= 1) return;
    const prevIdx = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    setTargetIndex(prevIdx);
    setIsAnimating(true);
    setSlideDirection("right-init");
  };

  const handleNext = () => {
    if (isAnimating || !products || products.length <= 1) return;
    const nextIdx = currentIndex === products.length - 1 ? 0 : currentIndex + 1;
    setTargetIndex(nextIdx);
    setIsAnimating(true);
    setSlideDirection("left");
  };

  // Pour le slide à droite, d'abord le render, puis déclenche l'animation
  useEffect(() => {
    if (slideDirection === "right-init" && trackRef.current) {
      // Force browser to compute layout at the offset position
      trackRef.current.getBoundingClientRect();
      setSlideDirection("right");
    }
  }, [slideDirection]);

  // Finalise la transition après l'animation
  useEffect(() => {
    if (slideDirection !== "left" && slideDirection !== "right") return;
    const timeout = setTimeout(() => {
      setCurrentIndex(targetIndex);
      setSlideDirection(null);
      setIsAnimating(false);
      setTargetIndex(null);
    }, 400);
    return () => clearTimeout(timeout);
  }, [slideDirection, targetIndex]);

  if (!products || products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex];

  const renderSlide = (product) => (
    <div className="carousel-slide" key={product.code_produit}>
      <Link to={`/produit/${product.code_produit}`} className="carousel-image-link">
        <img
          src={getImageURL(product)}
          alt={product.nom_produit}
          className="carousel-image"
        />
      </Link>
    </div>
  );

  const buildTrackContent = () => {
    if ((!slideDirection && !isAnimating) || targetIndex === null) {
      return renderSlide(currentProduct);
    }
    if (slideDirection === "left") {
      return (
        <>
          {renderSlide(currentProduct)}
          {renderSlide(products[targetIndex])}
        </>
      );
    }
    // "right-init" or "right": track is [target, current]
    return (
      <>
        {renderSlide(products[targetIndex])}
        {renderSlide(currentProduct)}
      </>
    );
  };

  const getTrackClass = () => {
    const classes = ["carousel-track"];
    if (slideDirection === "left") classes.push("slide-left");
    if (slideDirection === "right-init") classes.push("slide-right-init");
    if (slideDirection === "right") classes.push("slide-right");
    return classes.join(" ");
  };

  return (
    <div className="product-carousel">
      <h2>{title}</h2>

      <div className="carousel-viewport">
        <div className={getTrackClass()} ref={trackRef}>
          {buildTrackContent()}
        </div>
      </div>

      {products.length > 1 && (
        <div className="carousel-controls">
          <button onClick={handlePrev} className="carousel-btn" disabled={isAnimating}>
            <img src="/src/Images/Icon/carousel-left.svg" alt="Précédent" />
          </button>

          <button onClick={handleNext} className="carousel-btn" disabled={isAnimating}>
            <img src="/src/Images/Icon/carousel-right.svg" alt="Suivant" />
          </button>
        </div>
      )}

      <Link to={linkTo} className="btn-section">{linkText}</Link>
    </div>
  );
};

export default ProductCarousel;
