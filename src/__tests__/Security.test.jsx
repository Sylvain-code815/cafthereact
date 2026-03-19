// @vitest-environment jsdom

import { describe, test, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// IMPORT CORRIGÉ : On pointe bien vers ton fichier SignUp.jsx
import Register from "../pages/SignUp.jsx";

// ─── Mock de useNavigate (nécessaire car Register utilise ce hook) ─────────────
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// ─── Helper de rendu ──────────────────────────────────────────────────────────
const renderRegister = () =>
    render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
    );

// ─── Suite de tests sécurité ──────────────────────────────────────────────────
describe("Sécurité — Protection contre les injections XSS", () => {

  test("neutralise une saisie XSS malveillante grâce à la Regex stricte", () => {
    // ARRANGE : Le code pirate classique
    const xssPayload = '<script>alert("XSS")</script>';

    // Le résultat attendu APRÈS le passage de ta Regex /[^a-zA-ZÀ-ÿ\s'-]/g
    // Les caractères < > ( ) " et / doivent être supprimés instantanément !
    const expectedSanitizedValue = 'scriptalertXSSscript';

    renderRegister();

    // ACT : On simule la saisie dans le champ "Nom" ou "Prénom"
    // (Note: on utilise getByRole ou une expression régulière souple pour trouver le bon champ)
    const nomInput = screen.getByLabelText(/nom/i);

    fireEvent.change(nomInput, { target: { value: xssPayload } });

    // ── ASSERT 1 : La valeur a été nettoyée par TA Regex ! ──────────────────
    // C'est la preuve ultime pour ton jury que ton contrôle de saisie fonctionne.
    expect(nomInput.value).toBe(expectedSanitizedValue);

    // ── ASSERT 2 : Sécurité React native (Sécurité de repli) ─────────────────
    // On s'assure qu'absolument aucun script n'a pu s'infiltrer dans le DOM.
    const allScripts = document.querySelectorAll("script");
    allScripts.forEach((scriptEl) => {
      expect(scriptEl.textContent).not.toContain('alert("XSS")');
    });
  });
});