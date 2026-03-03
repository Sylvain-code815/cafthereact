import React from "react";
import "./CustomerReview.css";

const CustomerReview = ({ name, review, rating }) => {
  return (
    <article className="customer-review">
      <div className="review-rating">

      </div>
      <p className="review-text">{review}</p>
      <p className="review-author">{name}</p>
    </article>
  );
};

export default CustomerReview;
