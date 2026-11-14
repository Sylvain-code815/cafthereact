/**
 * Modes de livraison du site : une seule source de vérité pour le panier,
 * l'étape Livraison et le récapitulatif de commande.
 * Les identifiants et les prix sont ceux de l'API (config/constants.js, DELIVERY_MODES) :
 * c'est l'API qui recalcule les frais, seul l'identifiant lui est envoyé.
 * Le transporteur est un libellé d'affichage uniquement (l'API enregistre
 * l'identifiant du mode dans livraison.choix_transporteur).
 */
export const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard", delay: "3-5 jours", carrier: "Colissimo", price: 4.99 },
  { id: "express", label: "Express", delay: "1-2 jours", carrier: "Chronopost", price: 9.99 },
  { id: "free", label: "Gratuit", delay: "5-7 jours", carrier: "La Poste", price: 0 },
  { id: "pickup", label: "Retrait en magasin", delay: null, carrier: null, price: 0 },
];

export const DEFAULT_SHIPPING_MODE = "standard";

export const getShippingOption = (id) =>
  SHIPPING_OPTIONS.find((opt) => opt.id === id) || null;

/** Libellé complet, ex. « Standard (3-5 jours) » ou « Retrait en magasin » */
export const getShippingLabel = (id) => {
  const opt = getShippingOption(id);
  if (!opt) return id;
  return opt.delay ? `${opt.label} (${opt.delay})` : opt.label;
};

/** Prix affiché : « Gratuit » ou « 4.99 € » */
export const formatShippingPrice = (price) =>
  price === 0 ? "Gratuit" : `${price.toFixed(2)} €`;

/**
 * Estimation des frais de livraison affichée dans le panier (CDC 4.3)
 * Renvoie chaque mode avec le total estimé de la commande (arrondi au centime)
 * et le total avec le mode proposé par défaut dans le tunnel (standard).
 */
export const getShippingEstimate = (subtotal) => {
  const options = SHIPPING_OPTIONS.map((opt) => ({
    ...opt,
    total: Math.round((subtotal + opt.price) * 100) / 100,
  }));

  return {
    options,
    defaultTotal: options.find((opt) => opt.id === DEFAULT_SHIPPING_MODE).total,
  };
};
