import { describe, test, expect } from "vitest";
import {
  SHIPPING_OPTIONS,
  getShippingLabel,
  formatShippingPrice,
  getShippingEstimate,
} from "../utils/shipping.js";

// Les identifiants et prix doivent rester ceux de l'API (config/constants.js, DELIVERY_MODES)
describe("Livraison — modes et estimation des frais", () => {
  test("reprend les modes et les prix de l'API", () => {
    const prices = Object.fromEntries(SHIPPING_OPTIONS.map((o) => [o.id, o.price]));
    expect(prices).toEqual({ standard: 4.99, express: 9.99, free: 0, pickup: 0 });
  });

  test("affiche un transporteur pour chaque livraison à domicile, aucun pour le retrait", () => {
    SHIPPING_OPTIONS.filter((o) => o.id !== "pickup").forEach((o) => {
      expect(o.carrier).toBeTruthy();
    });
    expect(SHIPPING_OPTIONS.find((o) => o.id === "pickup").carrier).toBeNull();
  });

  test("garde les libellés du tunnel de commande", () => {
    expect(getShippingLabel("standard")).toBe("Standard (3-5 jours)");
    expect(getShippingLabel("pickup")).toBe("Retrait en magasin");
    expect(formatShippingPrice(0)).toBe("Gratuit");
    expect(formatShippingPrice(4.99)).toBe("4.99 €");
  });

  test("calcule le total estimé de chaque mode, arrondi au centime", () => {
    const { options, defaultTotal } = getShippingEstimate(10.1);
    const totals = Object.fromEntries(options.map((o) => [o.id, o.total]));
    expect(totals).toEqual({ standard: 15.09, express: 20.09, free: 10.1, pickup: 10.1 });
    expect(defaultTotal).toBe(15.09);
  });
});
