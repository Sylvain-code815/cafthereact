import { describe, test, expect } from "vitest";
import { buildReorder } from "../utils/reorder.js";

const sachet = { code_produit: 1, nom_produit: "Thé vert sachet", type_vente: "Sachet", prix_ttc: "8.50", stock: 10 };
const vrac = { code_produit: 2, nom_produit: "Café vrac", type_vente: "Vrac", prix_ttc: "6.00", stock: 50 };

const byId = (...produits) => new Map(produits.map((p) => [p.code_produit, p]));

describe("Commander à l'identique — préparation des lignes", () => {
  test("reprend les produits disponibles avec les données actuelles du catalogue", () => {
    const lignes = [{ code_produit: 1, nom_produit: "Ancien nom", quantite: 3 }];
    const { toAdd, unavailable, capped } = buildReorder(lignes, byId(sachet));

    expect(toAdd).toEqual([{ produit: sachet, poids: null, qty: 3 }]);
    expect(unavailable).toEqual([]);
    expect(capped).toEqual([]);
  });

  test("ignore les produits désactivés et en rupture de stock", () => {
    const lignes = [
      { code_produit: 1, nom_produit: "Thé vert sachet", quantite: 1 },
      { code_produit: 9, nom_produit: "Produit retiré", quantite: 2 },
    ];
    const { toAdd, unavailable } = buildReorder(lignes, byId({ ...sachet, stock: 0 }));

    expect(toAdd).toEqual([]);
    expect(unavailable).toEqual(["Thé vert sachet", "Produit retiré"]);
  });

  test("plafonne la quantité au stock, en tenant compte du panier actuel", () => {
    const lignes = [{ code_produit: 1, nom_produit: "Thé vert sachet", quantite: 8 }];
    const cart = [{ ...sachet, quantite: 4, _cartKey: 1 }];
    const { toAdd, capped } = buildReorder(lignes, byId(sachet), cart);

    expect(toAdd).toEqual([{ produit: sachet, poids: null, qty: 6 }]);
    expect(capped).toEqual(["Thé vert sachet"]);
  });

  test("convertit les tranches de 100 g du vrac en paquets du panier", () => {
    // 13 tranches de 100 g = 1 paquet de 1 kg + 1 paquet de 300 g
    const lignes = [{ code_produit: 2, nom_produit: "Café vrac", quantite: 13 }];
    const { toAdd } = buildReorder(lignes, byId(vrac));

    expect(toAdd).toEqual([
      { produit: vrac, poids: 1000, qty: 1 },
      { produit: vrac, poids: 300, qty: 1 },
    ]);
  });
});
