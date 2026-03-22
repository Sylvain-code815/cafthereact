// @vitest-environment jsdom

import { describe, test, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Register from "../pages/SignUp.jsx";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const renderRegister = () =>
    render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
    );

// Vérifie que la regex de sanitisation neutralise les caractères dangereux
describe("Sécurité — Protection contre les injections XSS", () => {

  test("neutralise une saisie XSS malveillante grâce à la Regex stricte", () => {
    const xssPayload = '<script>alert("XSS")</script>';
    // Résultat attendu après filtrage par /[^a-zA-ZÀ-ÿ\s'-]/g
    const expectedSanitizedValue = 'scriptalertXSSscript';

    renderRegister();

    const nomInput = screen.getByLabelText(/^nom/i);
    fireEvent.change(nomInput, { target: { value: xssPayload } });

    // La valeur doit être nettoyée par la regex côté composant
    expect(nomInput.value).toBe(expectedSanitizedValue);

    // Aucun script malveillant ne doit être injecté dans le DOM
    const allScripts = document.querySelectorAll("script");
    allScripts.forEach((scriptEl) => {
      expect(scriptEl.textContent).not.toContain('alert("XSS")');
    });
  });
});
