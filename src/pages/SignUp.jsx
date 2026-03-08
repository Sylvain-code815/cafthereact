import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import "./Login/Login.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [mdp, setMdp] = useState("");
    const [confirmMdp, setConfirmMdp] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    // Vérification du double mot de passe identique et envoi à l'API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mdp !== confirmMdp) {
            setErrorMsg("Veuillez indiquer deux mots de passe identiques.");
            return;
        }

        setErrorMsg("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    prenom,
                    nom,
                    telephone,
                    mdp
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Échec de l'inscription");
                return;
            }

            navigate("/login");

        } catch (error) {
            console.error("Erreur réseau :", error);
            setErrorMsg("Une erreur s'est produite lors de l'inscription.");
        }
    };

    return (
        <div className="container">
            <SEO title="Inscription" description="Créez votre compte CafThé pour commander vos thés et cafés préférés et suivre vos commandes." />
            <div className="signup-box">

                <div className="signup-header">
                    <h1>CafThé</h1>
                    <h2>Créer un compte</h2>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    {errorMsg && <div className="error-message">{errorMsg}</div>}

                    <div className="form-group">
                        <div className="input-with-icon">
                            <img src="/src/Images/Icon/signup-mail.svg" alt="" aria-hidden="true" />
                            <div className="floating-input-wrapper">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" id="email" placeholder=" " />
                                <label htmlFor="email">Email *</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <div className="input-with-icon">
                                <img src="/src/Images/Icon/header-Login.svg" alt="" aria-hidden="true" />
                                <div className="floating-input-wrapper">
                                    <input value={prenom} onChange={(e) => setPrenom(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, ""))} required type="text" id="prenom" placeholder=" " />
                                    <label htmlFor="prenom">Prénom *</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group half-width">
                            <div className="input-with-icon">
                                <img src="/src/Images/Icon/header-Login.svg" alt="" aria-hidden="true" />
                                <div className="floating-input-wrapper">
                                    <input value={nom} onChange={(e) => setNom(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, ""))} required type="text" id="nom" placeholder=" " />
                                    <label htmlFor="nom">Nom *</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-with-icon">
                            <img src="/src/Images/Icon/signup-telephone.svg" alt="" aria-hidden="true" />
                            <div className="floating-input-wrapper">
                                <input value={telephone} onChange={(e) => setTelephone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} type="tel" id="telephone" placeholder=" " pattern="[0-9]{10}" maxLength={10} />
                                <label htmlFor="telephone">Téléphone</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-with-icon">
                            <img src="/src/Images/Icon/signup-mdp.svg" alt="" aria-hidden="true" />
                            <div className="floating-input-wrapper">
                                <input value={mdp} onChange={(e) => setMdp(e.target.value)} required type={showPassword ? "text" : "password"} id="password" placeholder=" " />
                                <label htmlFor="password">Mot de passe *</label>
                            </div>
                            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}>
                                <img src="/src/Images/Icon/signup-mdp.svg" alt="" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-with-icon">
                            <img src="/src/Images/Icon/signup-mdp.svg" alt="" aria-hidden="true" />
                            <div className="floating-input-wrapper">
                                <input value={confirmMdp} onChange={(e) => setConfirmMdp(e.target.value)} required type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder=" " />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
                            </div>
                            <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? "Masquer la confirmation" : "Afficher la confirmation"}>
                                <img src="/src/Images/Icon/signup-mdp.svg" alt="" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-filled login-button valid-btn-local">
                        Créer mon compte
                    </button>

                    <p className="signup-link">
                        Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
