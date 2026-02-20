import React from "react";
import "../styles/CustomerReview.css";

const CustomerReview = ({ name, review, rating }) => {
  return (
    <div className="customer-review">
      <div className="review-rating">
        {"★".repeat(rating)}{"☆".repeat(5 - rating)}
      </div>
      <p className="review-text">{review}</p>
      <p className="review-author">{name}</p>
    </div>
  );
};

export default CustomerReview;
