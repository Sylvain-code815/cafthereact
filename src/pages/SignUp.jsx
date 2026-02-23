import React, { useState } from 'react';
import "./styles/Login.css";
import Loader from "../components/Loader.jsx";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [mdp, setMdp] = useState("");
    const [confirmMdp, setConfirmMdp] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container">
            <div className="signup-box">

                <div className="signup-header">
                    <h1>CafThé</h1>
                    <h2>Créer un compte</h2>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>

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

                    <button type="submit" className="login-button black-btn">
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