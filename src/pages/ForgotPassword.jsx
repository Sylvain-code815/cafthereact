import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Loader from '../components/Loader';
import SEO from "../components/SEO.jsx";
import "./Login/Login.css";


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setIsError(false);

        if (!email) {
            setIsError(true);
            setMessage('Veuillez saisir une adresse mail');
            return;
        }

        setIsLoading(true);

        // Réponse volontairement neutre de l'API (200 même si l'email est inconnu) :
        // on ne révèle pas quels emails possèdent un compte
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json().catch(() => ({}));

            if (response.status === 429) {
                setIsError(true);
                setMessage(data.message || "Trop de tentatives, veuillez réessayer dans quelques minutes.");
                return;
            }
            if (!response.ok) {
                setIsError(true);
                setMessage(data.message || "Une erreur s'est produite, veuillez réessayer plus tard.");
                return;
            }

            setMessage(data.message || "Si un compte est associé à cet email, vous recevrez un mail pour changer votre mot de passe");
            setEmail("");
        } catch (error) {
            console.error("Erreur réseau :", error);
            setIsError(true);
            setMessage("Une erreur s'est produite, veuillez réessayer plus tard.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <SEO title="Mot de passe oublié" description="Réinitialisez votre mot de passe CafThé. Entrez votre adresse email pour recevoir un lien de réinitialisation." />
            {isLoading && <Loader />}

            <div className="login-container">
                <h1>Mot de passe oublié</h1>

                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            value={email}
                            required
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="votre@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {message && (
                        <div className={isError ? "error-text" : "success-text"} role={isError ? "alert" : "status"}>
                            {message}
                        </div>
                    )}

                    <button type="submit" className="btn-filled login-button" disabled={isLoading}>
                        Réinitialiser mon mot de passe
                    </button>

                    <p className="signup-link">
                        <Link to="/login">Retour à la connexion</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;