// @vitest-environment jsdom

import { describe, test, expect } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../contexts/CartContext.jsx";
import MiniCart from "../components/MiniCart/MiniCart.jsx";

const cart = [
  { code_produit: 1, nom_produit: "Thé vert sachet", type_vente: "Sachet", prix_ttc: "8.50", quantite: 2, _cartKey: 1 },
  { code_produit: 2, nom_produit: "Café vrac", type_vente: "Vrac", prix_ttc: "6.00", quantite: 1, poids: 500, _cartKey: "2_500" },
];

const renderMiniCart = (value) =>
  render(
    <CartContext.Provider value={value}>
      <MemoryRouter>
        <MiniCart />
      </MemoryRouter>
    </CartContext.Provider>,
  );

describe("Mini-panier", () => {
  test("s'ouvre depuis l'icône et liste les lignes, quantités, totaux et raccourcis", () => {
    renderMiniCart({ cart, totalArticles: 3, totalPrix: 47 });

    const toggle = screen.getByRole("button", { name: /panier, 3 articles/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    expect(screen.getByText("Thé vert sachet")).toBeInTheDocument();
    expect(screen.getByText(/café vrac — 500g/i)).toBeInTheDocument();
    expect(screen.getByText("17.00 €")).toBeInTheDocument(); // 2 x 8,50
    expect(screen.getByText("30.00 €")).toBeInTheDocument(); // 6,00 / 100 g x 500 g
    expect(screen.getByText("47.00 €")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /voir le panier/i })).toHaveAttribute("href", "/panier");
    expect(screen.getByRole("link", { name: /^commander$/i })).toHaveAttribute("href", "/order");
  });

  test("se ferme avec Échap et par un clic en dehors", () => {
    renderMiniCart({ cart, totalArticles: 3, totalPrix: 47 });
    const toggle = screen.getByRole("button", { name: /panier/i });

    fireEvent.click(toggle);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("region", { name: /mini-panier/i })).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();

    fireEvent.click(toggle);
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("region", { name: /mini-panier/i })).not.toBeInTheDocument();
  });

  test("indique un panier vide", () => {
    renderMiniCart({ cart: [], totalArticles: 0, totalPrix: 0 });
    fireEvent.click(screen.getByRole("button", { name: /panier/i }));
    expect(screen.getByText(/votre panier est vide/i)).toBeInTheDocument();
  });
});
