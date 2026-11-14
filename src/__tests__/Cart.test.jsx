// @vitest-environment jsdom

import { describe, test, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../contexts/CartContext.jsx";
import Cart from "../pages/Cart/Cart.jsx";

const item = { code_produit: 1, nom_produit: "Thé vert sachet", type_vente: "Sachet", prix_ttc: "8.50", quantite: 1, _cartKey: 1 };

const renderCart = (overrides = {}) => {
  const value = {
    cart: [item],
    addToCart: vi.fn(),
    decreaseQuantity: vi.fn(),
    removeFromCart: vi.fn(),
    clearCart: vi.fn(),
    totalArticles: 1,
    totalPrix: 8.5,
    ...overrides,
  };
  render(
    <CartContext.Provider value={value}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </CartContext.Provider>,
  );
  return value;
};

describe("Panier — suppression avec confirmation et estimation de livraison", () => {
  test("demande confirmation avant de retirer une ligne", () => {
    const { removeFromCart } = renderCart();

    fireEvent.click(screen.getByRole("button", { name: /supprimer thé vert sachet/i }));
    expect(screen.getByRole("dialog", { name: /retirer l'article/i })).toBeInTheDocument();
    // Le focus est sur « Annuler » par sécurité
    expect(screen.getByRole("button", { name: "Annuler" })).toHaveFocus();

    fireEvent.click(screen.getByRole("button", { name: "Annuler" }));
    expect(removeFromCart).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /supprimer thé vert sachet/i }));
    fireEvent.click(screen.getByRole("button", { name: "Retirer" }));
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  test("le bouton « − » sur la dernière unité demande aussi confirmation, Échap annule", () => {
    const { decreaseQuantity, removeFromCart } = renderCart();

    fireEvent.click(screen.getByRole("button", { name: /acheter moins/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(decreaseQuantity).not.toHaveBeenCalled();
    expect(removeFromCart).not.toHaveBeenCalled();
  });

  test("affiche l'estimation des frais de livraison avec les transporteurs", () => {
    renderCart();

    expect(screen.getByText(/estimation de la livraison/i)).toBeInTheDocument();
    expect(screen.getByText(/colissimo/i)).toBeInTheDocument();
    expect(screen.getByText("4.99 €")).toBeInTheDocument();
    expect(screen.getByText(/retrait en magasin/i)).toBeInTheDocument();
    expect(screen.getByText("13.49 €")).toBeInTheDocument(); // 8,50 + 4,99
  });
});
