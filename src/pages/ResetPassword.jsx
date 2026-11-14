import React, { useState } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import Loader from '../components/Loader';
import SEO from "../components/SEO.jsx";
import { PASSWORD_RULE, validateNewPassword, isValidResetToken } from "../utils/password.js";
import "./Login/Login.css";

// Page ouverte depuis le lien de l'email « mot de passe oublié » :
// <front>/#/reset-password?token=<64 caractères hexadécimaux>
const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";

    const [mdp, setMdp] = useState("");
    const [confirmMdp, setConfirmMdp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        // Vérifications côté client avant l'appel (l'API refait les mêmes contrôles)
        const validationError = validateNewPassword(mdp, confirmMdp);
        if (validationError) {
            setErrorMsg(validationError);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, mdp }),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                // 400 : lien invalide / expiré / déjà utilisé, ou mot de passe trop faible
                setErrorMsg(data.message || "La réinitialisation a échoué, veuillez réessayer.");
                return;
            }

            setSuccessMsg(data.message || "Votre mot de passe a été modifié, vous pouvez vous connecter");
            setMdp("");
            setConfirmMdp("");
        } catch (error) {
            console.error("Erreur réseau :", error);
            setErrorMsg("Une erreur s'est produite, veuillez réessayer plus tard.");
        } finally {
            setIsLoading(false);
        }
    };

    const seo = <SEO title="Nouveau mot de passe" description="Choisissez un nouveau mot de passe pour votre compte CafThé." />;

    // Lien absent ou mal formé : inutile d'afficher le formulaire
    if (!isValidResetToken(token)) {
        return (
            <div className="container">
                {seo}
                <div className="login-container">
                    <h1>Nouveau mot de passe</h1>
                    <div className="error-text" role="alert">
                        Ce lien de réinitialisation est invalide ou incomplet.
                    </div>
                    <p className="signup-link">
                        <Link to="/forgot-password">Demander un nouveau lien</Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {seo}
            {isLoading && <Loader />}

            <div className="login-container">
                <h1>Nouveau mot de passe</h1>

                {successMsg ? (
                    <>
                        <div className="success-text" role="status">{successMsg}</div>
                        <Link to="/login" className="btn-filled login-button">
                            Se connecter
                        </Link>
                    </>
                ) : (
                    <form className="form-container" onSubmit={handleSubmit} noValidate>
                        <p className="reset-password-rule" id="password-rule">{PASSWORD_RULE}.</p>

                        <div className="form-group">
                            <label htmlFor="new-password">Nouveau mot de passe *</label>
                            <input
                                value={mdp}
                                onChange={(e) => setMdp(e.target.value)}
                                required
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="new-password"
                                autoComplete="new-password"
                                aria-describedby="password-rule"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-new-password">Confirmer le mot de passe *</label>
                            <input
                                value={confirmMdp}
                                onChange={(e) => setConfirmMdp(e.target.value)}
                                required
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="confirm-new-password"
                                autoComplete="new-password"
                            />
                        </div>

                        <label className="reset-password-show">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                            Afficher les mots de passe
                        </label>

                        {errorMsg && (
                            <div className="error-text" role="alert">
                                {errorMsg}
                                {/* Lien expiré ou déjà utilisé : on propose d'en redemander un */}
                                {/lien/i.test(errorMsg) && (
                                    <> <Link to="/forgot-password">Demander un nouveau lien</Link></>
                                )}
                            </div>
                        )}

                        <button type="submit" className="btn-filled login-button" disabled={isLoading}>
                            Enregistrer mon nouveau mot de passe
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
