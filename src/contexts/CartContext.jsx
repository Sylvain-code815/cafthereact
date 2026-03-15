import { useState, useEffect, createContext } from "react";
import { isPoids } from "../utils/product.js";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

  // Lazy initial state, empêche React de lire le localStorage à chaque rendu
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("panier");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(cart));
  }, [cart]);

  // Ajouter au panier avec quantité optionnelle
  const addToCart = (produit, poids = null, qty = 1) => {
    const isVrac = isPoids(produit.type_vente);
    const cartKey = isVrac
      ? `${produit.code_produit}_${poids}`
      : produit.code_produit;

    setCart((prev) => {
      const existing = prev.find((p) => p._cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item._cartKey === cartKey
            ? { ...item, quantite: item.quantite + qty }
            : item,
        );
      }
      return [
        ...prev,
        {
          ...produit,
          quantite: qty,
          _cartKey: cartKey,
          ...(isVrac ? { poids } : {}),
        },
      ];
    });
  };

  const decreaseQuantity = (cartKey) => {
    setCart((prev) => {
      const item = prev.find((p) => (p._cartKey || p.code_produit) === cartKey);
      if (!item) return prev;
      if (item.quantite > 1) {
        return prev.map((p) =>
          (p._cartKey || p.code_produit) === cartKey
            ? { ...p, quantite: p.quantite - 1 }
            : p,
        );
      }
      return prev.filter((p) => (p._cartKey || p.code_produit) !== cartKey);
    });
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => (item._cartKey || item.code_produit) !== cartKey));
  };

  const removeMultiple = (cartKeys) => {
    setCart((prev) => prev.filter((item) => !cartKeys.has(item._cartKey || item.code_produit)));
  };

  const totalArticles = cart.reduce((acc, item) => acc + item.quantite, 0);
  const totalPrix = cart.reduce((acc, item) => {
    if (isPoids(item.type_vente) && item.poids) {
      return acc + item.prix_ttc * (item.poids / 100) * item.quantite;
    }
    return acc + item.prix_ttc * item.quantite;
  }, 0);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeMultiple,
        totalArticles,
        totalPrix,
        clearCart,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
