// Même méthode que pour l'authContext sauf qu'ici on se sert du produit et du token
// 3 fonctions : ajouter, ajouter la quantité, supprimer la ligne
// Prendre en compte que si on ajoute 2 fois le même produit, on ajoute juste 1 quantité

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
  const addToCart = (produit) => {
    const newCart = cart.find((p) => p.code_produit === produit.code_produit);
    if (newCart) {
      setCart(
        cart.map((item) =>
          item.code_produit === produit.code_produit
            ? {
                // Retour de la copie de l'objet avec une quantité modifiée
                ...item,
                quantite: item.quantite + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...produit, quantite: 1 }]);
    }
  };

  // Si L'utilisateur veut modifier la quantité, prévoir si je supprime la ligne ou non
  const decreaseQuantity = (code_produit) => {
    const itemToChange = cart.find((p) => p.code_produit === code_produit);
    if (itemToChange.quantite > 1) {
      setCart(
        cart.map((item) =>
          item.code_produit === code_produit
            ? { ...item, quantite: item.quantite - 1 } // Retour de la copie de l'objet avec une quantité modifiée
            : item,
        ),
      );
    } else {
      removeFromCart(code_produit);
    }
  };

  const removeFromCart = (code_produit) => {
    const newCart = cart.filter((item) => item.code_produit !== code_produit);
    setCart(newCart);
  };

  // Calculs automatiques
  const totalArticles = cart.reduce((acc, item) => acc + item.quantite, 0);
  const totalPrix = cart.reduce(
    (acc, item) => acc + item.prix_ttc * item.quantite,
    0,
  );

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
