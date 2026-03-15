/** Mapping catégorie DB : route URL */
export const CATEGORY_TO_ROUTE = {
  the: "/the",
  Cafe: "/cafe",
  Accessoire: "/accessory",
  produit_phare: "/produits-phares",
  produit_promotion: "/promotions",
};

/** Labels lisibles pour chaque catégorie */
export const CATEGORY_LABELS = {
  the: "Thés",
  Cafe: "Cafés",
  Accessoire: "Accessoires",
  produit_phare: "Produits phares",
  produit_promotion: "Promotions",
};

/**
 * Retourne la route URL pour une catégorie donnée
 * API native NFD (suppression accents)
 */
export function categoryToRoute(categorie) {
  if (!categorie) return "/";
  if (CATEGORY_TO_ROUTE[categorie]) return CATEGORY_TO_ROUTE[categorie];
  // Fallback : suppression accents + lowercase
  return "/" + categorie.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
