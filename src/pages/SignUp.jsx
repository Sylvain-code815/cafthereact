import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./styles/Login.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [mdp, setMdp] = useState("");
    const [confirmMdp, setConfirmMdp] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
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
            <div className="signup-box">

                <div className="signup-header">
                    <h1>CafThé</h1>
                    <h2>Créer un compte</h2>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    {errorMsg && <div className="error-message">{errorMsg}</div>}

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <div className="input-with-icon">
                            <img src="/src/Images/Icon/signup-mail.svg" alt="mail" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" id="email" placeholder="votre@email.com" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="prenom">Prénom *</label>
                            <div className="input-with-icon">
                                <img src="/src/Images/Icon/header-Login.svg" alt="prenom-logo" />
                                <input value={prenom} onChange={(e) => setPrenom(e.target.value)} required type="text" id="prenom" placeholder="Prénom" />
                            </div>
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="nom">Nom *</label>
                            <div className="input-with-icon">
                                <img src="/src/Images/Icon/header-Login.svg" alt="nom-logo" />
                                <input value={nom} onChange={(e) => setNom(e.target.value)} required type="text" id="nom" placeholder="Nom" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="telephone">Téléphone</label>
                        <div className="input-with-icon">
                            <img src="/src/Images/Icon/signup-telephone.svg" alt="telephone-logo" />
                            <input value={telephone} onChange={(e) => setTelephone(e.target.value)} type="tel" id="telephone" placeholder="Votre numéro de téléphone" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe *</label>
                        <div className="input-with-icon">
                            <img src="/src/Images/Icon/signup-mdp.svg" alt="mdp-logo" />
                            <input value={mdp} onChange={(e) => setMdp(e.target.value)} required type="password" id="password" placeholder="••••••••" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
                        <div className="input-with-icon">
                            <img src="/src/Images/Icon/signup-mdp.svg" alt="mdp-logo" />
                            <input value={confirmMdp} onChange={(e) => setConfirmMdp(e.target.value)} required type="password" id="confirmPassword" placeholder="••••••••" />
                        </div>
                    </div>

                    <button type="submit" className="login-button valid-btn">
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