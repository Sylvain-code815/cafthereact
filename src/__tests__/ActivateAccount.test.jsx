// @vitest-environment jsdom

import { describe, test, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";
import ActivateAccount from "../pages/ActivateAccount.jsx";

const { mockNavigate } = vi.hoisted(() => ({ mockNavigate: vi.fn() }));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const STRONG = "MotDePasse123!";
const login = vi.fn();

const renderPage = (entry = "/activate-account") =>
  render(
    <AuthContext.Provider value={{ login }}>
      <ToastProvider>
        <MemoryRouter initialEntries={[entry]}>
          <ActivateAccount />
        </MemoryRouter>
      </ToastProvider>
    </AuthContext.Provider>,
  );

const fill = ({ email = "marie@email.com", telephone = "0601020304", mdp = STRONG, confirm = STRONG } = {}) => {
  fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/^téléphone/i), { target: { value: telephone } });
  fireEvent.change(screen.getByLabelText(/^mot de passe/i), { target: { value: mdp } });
  fireEvent.change(screen.getByLabelText(/^confirmer/i), { target: { value: confirm } });
  fireEvent.click(screen.getByRole("button", { name: /activer mon compte/i }));
};

describe("Activation d'un compte créé en boutique", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockNavigate.mockReset();
    login.mockReset();
  });

  test("préremplit l'email transmis par la page d'inscription", () => {
    renderPage("/activate-account?email=marie%40email.com");
    expect(screen.getByLabelText(/^email/i)).toHaveProperty("value", "marie@email.com");
  });

  test("refuse un mot de passe faible sans appeler l'API", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    renderPage();
    fill({ mdp: "faible", confirm: "faible" });
    expect(screen.getByRole("alert").textContent).toMatch(/12 caractères/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test("connecte le client et l'envoie sur son espace après activation", async () => {
    const client = { id: 1, prenom: "Marie", nom: "Dupont", email: "marie@email.com" };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Compte activé avec succès", client }),
    });
    renderPage();
    fill();

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/account"));
    expect(login).toHaveBeenCalledWith(client);
    const [url, options] = fetchSpy.mock.calls[0];
    expect(url).toMatch(/\/api\/clients\/activate$/);
    expect(options.credentials).toBe("include");
    expect(JSON.parse(options.body)).toEqual({ email: "marie@email.com", telephone: "0601020304", mdp: STRONG });
  });

  test("affiche le message de l'API si les informations ne correspondent pas", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: "Impossible d'activer ce compte, vérifiez vos informations" }),
    });
    renderPage();
    fill();

    expect(await screen.findByRole("alert")).toHaveProperty("textContent", "Impossible d'activer ce compte, vérifiez vos informations");
    expect(login).not.toHaveBeenCalled();
  });
});
