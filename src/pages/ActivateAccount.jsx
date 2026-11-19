import React, { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import SEO from "../components/SEO.jsx";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { PASSWORD_RULE, validateNewPassword } from "../utils/password.js";
import "./Login/Login.css";

// Compte créé en boutique par un vendeur : aucun email n'est envoyé,
// le client prouve son identité avec son email et son téléphone, puis choisit son mot de passe
const ActivateAccount = () => {
    const { login } = useContext(AuthContext);
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [telephone, setTelephone] = useState("");
    const [mdp, setMdp] = useState("");
    const [confirmMdp, setConfirmMdp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!/^0\d{9}$/.test(telephone)) {
            setErrorMsg("Saisissez le numéro de téléphone donné en boutique (10 chiffres).");
            return;
        }
        const validationError = validateNewPassword(mdp, confirmMdp);
        if (validationError) {
            setErrorMsg(validationError);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/activate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, telephone, mdp }),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setErrorMsg(data.message || "Impossible d'activer ce compte, vérifiez vos informations");
                return;
            }

            // L'API ouvre directement la session : le client est connecté
            login(data.client);
            showToast(`Compte activé, bienvenue ${data.client.prenom} !`);
            navigate("/account");
        } catch (error) {
            console.error("Erreur réseau :", error);
            setErrorMsg("Une erreur s'est produite, veuillez réessayer plus tard.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <SEO title="Activer mon compte" description="Vous avez acheté en boutique CafThé ? Activez votre compte en ligne pour retrouver vos achats." />
            {isLoading && <Loader />}

            <div className="login-container">
                <h1>Activer mon compte</h1>
                <p className="reset-password-rule">
                    Votre compte a été créé en boutique ? Saisissez l'email et le téléphone donnés au vendeur,
                    puis choisissez votre mot de passe. Vous retrouverez ensuite tous vos achats dans votre espace client.
                </p>

                <form className="form-container" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="activate-email">Email *</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            className="form-control"
                            id="activate-email"
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="activate-phone">Téléphone *</label>
                        <input
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                            required
                            type="tel"
                            className="form-control"
                            id="activate-phone"
                            autoComplete="tel"
                            placeholder="0612345678"
                        />
                    </div>

                    <p className="reset-password-rule" id="password-rule">{PASSWORD_RULE}.</p>

                    <div className="form-group">
                        <label htmlFor="activate-password">Mot de passe *</label>
                        <input
                            value={mdp}
                            onChange={(e) => setMdp(e.target.value)}
                            required
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="activate-password"
                            autoComplete="new-password"
                            aria-describedby="password-rule"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="activate-confirm">Confirmer le mot de passe *</label>
                        <input
                            value={confirmMdp}
                            onChange={(e) => setConfirmMdp(e.target.value)}
                            required
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="activate-confirm"
                            autoComplete="new-password"
                        />
                    </div>

                    <label className="reset-password-show">
                        <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
                        Afficher les mots de passe
                    </label>

                    {errorMsg && <div className="error-text" role="alert">{errorMsg}</div>}

                    <button type="submit" className="btn-filled login-button" disabled={isLoading}>
                        Activer mon compte
                    </button>

                    <p className="signup-link">
                        <Link to="/login">Retour à la connexion</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ActivateAccount;
