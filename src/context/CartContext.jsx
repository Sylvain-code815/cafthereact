import { useState, useEffect, createContext } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Je récupère mon panier
  const [cart, setCart] = useState(() => {
    // Pour que le code ne s'exécute qu'une fois
    const savedCart = localStorage.getItem("panier");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Màj panier dans le localStorage
  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(cart));
  }, [cart]);

  // Je cherche le produit, soit je mets à jour la quantité, soit j'ajoute un produit différent au panier
  // Pour le vrac, on passe un poids optionnel (100, 200, 500, 1000)
  const addToCart = (produit, poids = null) => {
    const isVrac = produit.type_vente === "Vrac";
    const cartKey = isVrac
      ? `${produit.code_produit}_${poids}`
      : produit.code_produit;

    const existing = cart.find((p) => p._cartKey === cartKey);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._cartKey === cartKey
            ? { ...item, quantite: item.quantite + 1 }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...produit,
          quantite: 1,
          _cartKey: cartKey,
          ...(isVrac ? { poids } : {}),
        },
      ]);
    }
  };

  // Si L'utilisateur veut modifier la quantité, prévoir si je supprime la ligne ou non
  const decreaseQuantity = (cartKey) => {
    const itemToChange = cart.find((p) => (p._cartKey || p.code_produit) === cartKey);
    if (!itemToChange) return;
    if (itemToChange.quantite > 1) {
      setCart(
        cart.map((item) =>
          (item._cartKey || item.code_produit) === cartKey
            ? { ...item, quantite: item.quantite - 1 }
            : item,
        ),
      );
    } else {
      removeFromCart(cartKey);
    }
  };

  const removeFromCart = (cartKey) => {
    const newCart = cart.filter((item) => (item._cartKey || item.code_produit) !== cartKey);
    setCart(newCart);
  };

  // Calculs automatiques
  const totalArticles = cart.reduce((acc, item) => acc + item.quantite, 0);
  const totalPrix = cart.reduce((acc, item) => {
    if (item.type_vente === "Vrac" && item.poids) {
      return acc + item.prix_ttc * (item.poids / 100) * item.quantite;
    }
    return acc + item.prix_ttc * item.quantite;
  }, 0);

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
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
