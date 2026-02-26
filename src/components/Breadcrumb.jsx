import React from "react";
import { Link } from "react-router-dom";
import "./styles/Breadcrumb.css";

const Breadcrumb = ({ items = [] }) => {
  const allItems = [{ label: "Accueil", to: "/" }, ...items];

  return (
    <nav className="bc-breadcrumb" aria-label="Fil d'Ariane">
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="bc-separator" aria-hidden="true">/</span>
            )}
            {isLast || !item.to ? (
              <span className="bc-current" aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="bc-link">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
