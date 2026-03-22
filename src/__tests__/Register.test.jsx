// @vitest-environment jsdom

import { describe, test, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Register from "../pages/SignUp.jsx";

// Mock de useNavigate pour vérifier les redirections
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

const renderRegister = () =>
    render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
    );

describe("Register — Formulaire d'inscription", () => {

  beforeEach(() => {
    mockNavigate.mockClear();
    global.fetch = vi.fn();
  });

  // Vérifie la présence de tous les champs et du bouton submit
  test("affiche tous les champs et le bouton au rendu initial", () => {
    renderRegister();

    expect(screen.getByLabelText(/^nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    const passwordInputs = screen.getAllByLabelText(/mot de passe/i);
    expect(passwordInputs.length).toBeGreaterThanOrEqual(1);

    expect(screen.getAllByRole("button", { name: /créer mon compte/i }).length).toBeGreaterThanOrEqual(1);
  });

  // Simule une inscription valide et vérifie la redirection vers /login
  test("redirige vers /login après une inscription valide", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Compte créé" }),
    });

    renderRegister();

    fireEvent.change(screen.getByLabelText(/^nom/i), { target: { value: "Dupont" } });
    fireEvent.change(screen.getByLabelText(/prénom/i), { target: { value: "Marie" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "marie.dupont@email.fr" } });
    fireEvent.change(screen.getByLabelText(/^mot de passe/i), { target: { value: "MotDePasse123!" } });
    fireEvent.change(screen.getByLabelText(/confirmer/i), { target: { value: "MotDePasse123!" } });

    fireEvent.click(screen.getAllByRole("button", { name: /créer mon compte/i })[0]);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // Vérifie que le formulaire bloque la soumission si les mots de passe diffèrent
  test("affiche une erreur si les mots de passe ne correspondent pas", () => {
    renderRegister();

    fireEvent.change(screen.getByLabelText(/^mot de passe/i), { target: { value: "MotDePasseA1!" } });
    fireEvent.change(screen.getByLabelText(/confirmer/i), { target: { value: "MotDePasseB2!" } });

    fireEvent.submit(screen.getAllByRole("button", { name: /créer mon compte/i })[0].closest("form"));

    expect(screen.getByText(/veuillez indiquer deux mots de passe identiques/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
