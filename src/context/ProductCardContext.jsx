import { useEffect } from "react";

// Màj panier
useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(cart));
}, [cart]);

// Je cherche le produit, soit je mets à jour la quantité, soit j'ajoute un produit différent au panier
const addToCart = (produit) => {
    console.log("1");
    const newCart = cart.find((p) => p.code_produit === produit.code_produit);
    if (newCart) {
        console.log("2")
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
        console.log("3")
        setCart([...cart, { ...produit, quantite: 1 }]);
    }
};