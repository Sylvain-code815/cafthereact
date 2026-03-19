// @vitest-environment jsdom

import { describe, test, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// IMPORT CORRIGÉ : On importe bien ton composant SignUp
import Register from "../pages/SignUp.jsx";

// ─── Mock de useNavigate ──────────────────────────────────────────────────────
const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ─── Fonction utilitaire de rendu ─────────────────────────────────────────────
const renderRegister = () =>
    render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
    );

// ─── Suite de tests ───────────────────────────────────────────────────────────
describe("Register — Formulaire d'inscription", () => {

  beforeEach(() => {
    mockNavigate.mockClear();
    global.fetch = vi.fn(); // On simule la fonction fetch de l'API
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 1 — Rendu initial
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche tous les champs et le bouton au rendu initial", () => {
    renderRegister();

    // NOTE : Si le test échoue ici, c'est que tes balises <label> ne correspondent pas
    // exactement à ces mots, ou que tu as utilisé des placeholders.
    // Dans ce cas, remplace "getByLabelText" par "getByPlaceholderText".
    expect(screen.getByLabelText(/^nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // On cherche les mots de passe (on différencie le premier de la confirmation)
    const passwordInputs = screen.getAllByLabelText(/mot de passe/i);
    expect(passwordInputs.length).toBeGreaterThanOrEqual(1);

    // Vérifie que le bouton de validation est bien là
    // Si ton bouton s'appelle "Créer mon compte", change /s'inscrire/i par /créer/i
    expect(screen.getByRole("button", { name: /s'inscrire/i })).toBeInTheDocument();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 2 — Interaction utilisateur réussie
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche le message de succès après une inscription valide", async () => {
    // On simule que l'API a répondu "OK"
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Compte créé" }),
    });

    renderRegister();

    // Remplissage des champs
    fireEvent.change(screen.getByLabelText(/^nom/i), { target: { value: "Dupont" } });
    fireEvent.change(screen.getByLabelText(/prénom/i), { target: { value: "Marie" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "marie.dupont@email.fr" } });

    // Remplissage des mots de passe (Identiques !)
    fireEvent.change(screen.getByLabelText(/^mot de passe/i), { target: { value: "MotDePasse123!" } });
    fireEvent.change(screen.getByLabelText(/confirmer/i), { target: { value: "MotDePasse123!" } });

    // On clique sur le bouton de soumission
    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    // On attend que le message de succès apparaisse à l'écran
    await waitFor(() => {
      // Modifie cette phrase si ton message de succès est différent dans SignUp.jsx
      expect(screen.getByText(/compte créé avec succès/i)).toBeInTheDocument();
    });

    // On vérifie que le faux serveur a bien été appelé une fois
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 3 — Gestion d'erreur : mots de passe non identiques
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche une erreur si les mots de passe ne correspondent pas", () => {
    renderRegister();

    // On saisit deux mots de passe DIFFÉRENTS
    fireEvent.change(screen.getByLabelText(/^mot de passe/i), { target: { value: "MotDePasseA1!" } });
    fireEvent.change(screen.getByLabelText(/confirmer/i), { target: { value: "MotDePasseB2!" } });

    // On force la soumission du formulaire
    fireEvent.submit(screen.getByRole("button", { name: /s'inscrire/i }).closest("form"));

    // Le message d'erreur doit s'afficher
    // Modifie cette phrase si ton erreur est différente (ex: "Mots de passe différents")
    expect(screen.getByText(/les mots de passe ne correspondent pas/i)).toBeInTheDocument();

    // On vérifie que la requête vers l'API a bien été BLOQUÉE par ta sécurité front-end
    expect(global.fetch).not.toHaveBeenCalled();
  });
});