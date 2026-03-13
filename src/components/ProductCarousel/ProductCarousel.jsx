import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./ProductCarousel.css";

const ProductCarousel = ({ products, title, linkTo, linkText }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!products || products.length === 0) return null;

  const getImageURL = (product) =>
    product.image
      ? `${import.meta.env.VITE_API_URL}/images/${product.image}`
      : "https://placehold.co/600x400";

  return (
    <div className="product-carousel">
      <h2>{title}</h2>

      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={products.length > 1}
        spaceBetween={0}
        slidesPerView={1}
        className="carousel-swiper"
      >
        {products.map((product) => {
          const isPromo = product.produit_promotion === 1 && product.taux_remise > 0;
          return (
            <SwiperSlide key={product.code_produit}>
              <Link to={`/produit/${product.code_produit}`} className="carousel-image-link">
                <div className="carousel-image-wrap">
                  <img
                    src={getImageURL(product)}
                    alt={product.nom_produit}
                    className="carousel-image"
                  />
                  {isPromo && (
                    <span className="carousel-badge badge-promo">-{product.taux_remise}%</span>
                  )}
                  {!isPromo && product.produit_phare === 1 && (
                    <span className="carousel-badge badge-phare">Best-seller</span>
                  )}
                  {!isPromo && product.produit_phare !== 1 && product.nouveaute === 1 && (
                    <span className="carousel-badge badge-nouveaute">Nouveauté</span>
                  )}
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {products.length > 1 && (
        <div className="carousel-controls">
          <button
            className="carousel-btn"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Produit précédent"
          >
            <img src="/src/Images/Icon/carousel-left.svg" alt="" aria-hidden="true" />
          </button>
          <span className="carousel-product-name">{products[activeIndex]?.nom_produit}</span>
          <button
            className="carousel-btn"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Produit suivant"
          >
            <img src="/src/Images/Icon/carousel-right.svg" alt="" aria-hidden="true" />
          </button>
        </div>
      )}

      <Link to={linkTo} className="btn-section">{linkText}</Link>
    </div>
  );
};

export default ProductCarousel;
