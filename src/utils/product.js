/**
 * Retourne true si le produit est vendu au poids (prix au 100g).
 * Tout ce qui n'est pas Sachet/Boite/Unité est vendu au 100g.
 * Séparation des responsabilités
 */
export const isPoids = (typeVente) =>
  typeVente !== "Sachet" && typeVente !== "Boite" && typeVente !== "Unité";
