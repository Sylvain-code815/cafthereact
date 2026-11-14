// @vitest-environment jsdom

import { describe, test, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "../pages/ResetPassword.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import { isStrongPassword, validateNewPassword, PASSWORD_RULE } from "../utils/password.js";

const TOKEN = "a".repeat(64);
const STRONG = "MotDePasse123!";

const renderReset = (search = `?token=${TOKEN}`) =>
  render(
    <MemoryRouter initialEntries={[`/reset-password${search}`]}>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </MemoryRouter>,
  );

const fillAndSubmit = (mdp, confirm) => {
  fireEvent.change(screen.getByLabelText(/^nouveau mot de passe/i), { target: { value: mdp } });
  fireEvent.change(screen.getByLabelText(/^confirmer/i), { target: { value: confirm } });
  fireEvent.click(screen.getByRole("button", { name: /enregistrer/i }));
};

describe("Mot de passe — règle de robustesse (identique à l'API)", () => {
  test("exige 12 caractères, majuscule, minuscule, chiffre et caractère spécial", () => {
    expect(isStrongPassword(STRONG)).toBe(true);
    expect(isStrongPassword("Court1!")).toBe(false);
    expect(isStrongPassword("motdepasse123!")).toBe(false);
    expect(isStrongPassword("MotDePasse1234")).toBe(false);
    expect(validateNewPassword(STRONG, "Autre123!abcd")).toMatch(/identiques/);
    expect(validateNewPassword(STRONG, STRONG)).toBe("");
  });
});

describe("Réinitialisation du mot de passe", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  test("refuse un lien sans jeton valide", () => {
    renderReset("?token=abc");
    expect(screen.getByText(/lien de réinitialisation est invalide/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /enregistrer/i })).not.toBeInTheDocument();
  });

  test("bloque un mot de passe trop faible ou une confirmation différente sans appeler l'API", () => {
    renderReset();

    fillAndSubmit("faible", "faible");
    expect(screen.getByRole("alert")).toHaveTextContent(PASSWORD_RULE);

    fillAndSubmit(STRONG, "MotDePasse123?");
    expect(screen.getByRole("alert")).toHaveTextContent(/identiques/i);

    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  test("envoie le jeton et le mot de passe puis propose de se connecter", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Votre mot de passe a été modifié, vous pouvez vous connecter" }),
    });
    renderReset();

    fillAndSubmit(STRONG, STRONG);

    expect(await screen.findByText(/mot de passe a été modifié/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /se connecter/i })).toHaveAttribute("href", "/login");
    const [url, options] = globalThis.fetch.mock.calls[0];
    expect(url).toMatch(/\/api\/clients\/reset-password$/);
    expect(JSON.parse(options.body)).toEqual({ token: TOKEN, mdp: STRONG });
  });

  test("affiche le message d'erreur de l'API (lien expiré)", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: "Lien invalide ou expiré" }),
    });
    renderReset();

    fillAndSubmit(STRONG, STRONG);

    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Lien invalide ou expiré"));
    expect(screen.getByRole("link", { name: /demander un nouveau lien/i })).toBeInTheDocument();
  });
});

describe("Mot de passe oublié", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  const submitEmail = () => {
    render(<MemoryRouter><ForgotPassword /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "marie@email.fr" } });
    fireEvent.click(screen.getByRole("button", { name: /réinitialiser/i }));
  };

  test("appelle l'API et affiche son message neutre", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ message: "Si un compte existe, un email a été envoyé" }),
    });
    submitEmail();

    expect(await screen.findByText(/si un compte existe/i)).toBeInTheDocument();
    const [url, options] = globalThis.fetch.mock.calls[0];
    expect(url).toMatch(/\/api\/clients\/forgot-password$/);
    expect(JSON.parse(options.body)).toEqual({ email: "marie@email.fr" });
  });

  test("signale la limitation de tentatives (429)", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ message: "Trop de tentatives, réessayez dans 15 minutes" }),
    });
    submitEmail();

    expect(await screen.findByRole("alert")).toHaveTextContent(/trop de tentatives/i);
  });
});
