import { isPoids } from "./product.js";

// Pour un produit au poids, l'API compte la quantité et le stock en tranches de 100 g
const WEIGHT_UNIT_GRAMS = 100;
// Poids maximal d'une ligne du panier (même limite que l'API)
const MAX_LINE_GRAMS = 1000;

/** Unités déjà présentes dans le panier pour un produit (tranches de 100 g pour le vrac) */
const unitsInCart = (cart, codeProduit) =>
  cart
    .filter((item) => item.code_produit === codeProduit)
    .reduce(
      (acc, item) =>
        acc + (isPoids(item.type_vente) && item.poids
          ? (item.poids / WEIGHT_UNIT_GRAMS) * item.quantite
          : item.quantite),
      0,
    );

/**
 * Découpe un nombre de tranches de 100 g en lignes du panier :
 * des paquets de 1 kg, puis le reste en un seul paquet (ex. 13 tranches -> 1 x 1kg + 1 x 300g)
 */
const splitWeight = (slices) => {
  const perKg = MAX_LINE_GRAMS / WEIGHT_UNIT_GRAMS;
  const lines = [];
  const kilos = Math.floor(slices / perKg);
  const rest = slices % perKg;
  if (kilos > 0) lines.push({ poids: MAX_LINE_GRAMS, qty: kilos });
  if (rest > 0) lines.push({ poids: rest * WEIGHT_UNIT_GRAMS, qty: 1 });
  return lines;
};

/**
 * Prépare la recommande d'une commande passée (CDC 4.5)
 * - lignes : lignes de la commande renvoyées par l'API (code_produit, nom_produit, quantite)
 * - productsById : Map code_produit -> produit actuel (absent si désactivé ou introuvable)
 * - cart : panier actuel, pour ne pas dépasser le stock avec ce qui y est déjà
 *
 * Renvoie :
 * - toAdd : [{ produit, poids, qty }] à passer à addToCart (prix actuels du catalogue)
 * - unavailable : noms des produits ignorés (plus vendus ou en rupture)
 * - capped : noms des produits dont la quantité a été réduite au stock disponible
 */
export const buildReorder = (lignes, productsById, cart = []) => {
  const toAdd = [];
  const unavailable = [];
  const capped = [];

  // Une même référence peut apparaître sur plusieurs lignes : on les regroupe
  const wanted = new Map();
  for (const ligne of lignes) {
    const prev = wanted.get(ligne.code_produit);
    wanted.set(ligne.code_produit, {
      nom: ligne.nom_produit,
      units: (prev?.units || 0) + Number(ligne.quantite),
    });
  }

  for (const [code, { nom, units }] of wanted) {
    const produit = productsById.get(code);
    const name = produit?.nom_produit || nom;
    const available = produit ? Number(produit.stock) - unitsInCart(cart, code) : 0;

    if (!produit || available <= 0) {
      unavailable.push(name);
      continue;
    }

    const qty = Math.min(units, available);
    if (qty < units) capped.push(name);

    if (isPoids(produit.type_vente)) {
      for (const line of splitWeight(qty)) {
        toAdd.push({ produit, poids: line.poids, qty: line.qty });
      }
    } else {
      toAdd.push({ produit, poids: null, qty });
    }
  }

  return { toAdd, unavailable, capped };
};
