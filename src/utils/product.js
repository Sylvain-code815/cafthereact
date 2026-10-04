/**
 * Retourne true si le produit est vendu au poids (prix au 100g).
 * Tout ce qui n'est pas Sachet/Boite/Unité est vendu au 100g.
 * Séparation des responsabilités
 */
export const isPoids = (typeVente) =>
  typeVente !== "Sachet" && typeVente !== "Boite" && typeVente !== "Unité";

/**
 * Prix réellement payé : prix TTC moins la remise si le produit est en promotion.
 * Même règle que l'API (utils/pricing.js), qui recalcule le total de la commande.
 */
export const getEffectivePrice = (produit) => {
  const prix = Number(produit.prix_ttc);
  if (produit.produit_promotion === 1 && produit.taux_remise > 0) {
    return Math.round(prix * (1 - produit.taux_remise / 100) * 100) / 100;
  }
  return prix;
};

/**
 * Total d'une ligne du panier (au poids : prix pour 100 g x poids x quantité)
 */
export const getLineTotal = (item) => {
  const prix = getEffectivePrice(item);
  if (isPoids(item.type_vente) && item.poids) {
    return prix * (item.poids / 100) * item.quantite;
  }
  return prix * item.quantite;
};
