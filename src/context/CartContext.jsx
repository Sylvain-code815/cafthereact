// Même méthode que pour l'authContext sauf qu'ici on se sert du produit et du token
// 3 fonctions : ajouter, ajouter la quantité, supprimer la ligne
// Prendre en compte que si on ajoute 2 fois le même produit, on ajoute juste 1 quantité

import {createContext, useCallback, useContext, useEffect, useState} from "react";

export const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    const handleCart = useCallback(() => { // Pour que ce ne soit pas redéfinit pour rien, optimisation
        fetch('/api/cart').then((response) => {
            if (!response.ok) {
                throw new Error(`impossible d'accéder au panier`);
            }
            return response.json();
        })
            .then((data) => {
                setCart(data);
            })
        .catch((error) => {
            console.error(`Erreur d'accès au panier :`, error);
        });
    }, []);

    const addToCart = (event, formData) => {
        event.preventDefault();
        fetch(`/api/cart`, {
            method: 'POST',
            headers: { 'Content-Type": "application/json' },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Échec d'ajouter au panier");
            }
            return response.json();
        })
            .then((data) => {
                console.log("Objet ajouté au panier: ", data);
                handleCart(); // On rafraîchit le panier
            })
            .catch((error) => {
                console.error("Erreur d'ajout au panier", error);
            });
    }

    const updateQuantity = (newQuantity, code_produit) => {
        fetch(`/api/cart/${code_produit}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: newQuantity }),
        })
    }

    return useContext(CartContext)
}




// Tentive n°1

// export function useCart({ children }) {
//     const [token, setToken] = useState(null);
//     const [product, setProduct] = useState(null);
//     const [quantite, setQuantite] = useState(null);
//
//     useEffect(() => {
//         const storedProduct = localStorage.getItem("product");
//         const storedToken = localStorage.getItem("token");
//         const storedQuantite = localStorage.getItem("quantite");
//
//         if (storedProduct && storedToken) {
//             setToken(storedProduct);
//             setProduct(storedProduct);
//             setQuantite(storedQuantite);
//         }
//     }, []);
//
//     useEffect(() => {
//         if (product && token) {
//             localStorage.setItem("product", JSON.stringify(product));
//             localStorage.setItem("token");
//             localStorage.setItem("quantite");
//         } else {
//             localStorage.removeItem("product");
//             localStorage.removeItem("token");
//             localStorage.removeItem("quantite");
//         }
//     }, [product, token]);
//
//     const basketFill = (jwt, userData) => {
//         setToken(jwt);
//         setProduct(productData);
//         setQuantite(quantiteCount);
//     }
//
//     const basketEmpty = () => {
//         setProduct(null);
//         setToken(null);
//         setQuantite(null);
//     }
//
//     const value = {
//         token,
//         product,
//         quantite,
//         basketFill,
//         basketEmpty,
//         isFill: !!token, // Vérifie s"il y a déjà une ligne, il faudrait un else
//     };

    // Supprimer une ligne


    //

