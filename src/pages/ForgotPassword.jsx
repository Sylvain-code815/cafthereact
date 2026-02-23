import React, {useState} from 'react';
import Loader from '../components/Loader';
import "./styles/Login.css";


// Mdp oublié, écran de chargement, vérification mdp remplis, simulation
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setMessage('');
        setIsError(true);

        if (!email) {
            setIsLoading(false);
            setIsLoading(true);
            setMessage('Veuillez saisir une adresse mail');
            return;
        }

        setTimeout(() => {
            setIsLoading(false);
            setIsError(false);
            setMessage("Si l'email existe, le lien de réinitialisation a été envoyé.");
            setEmail("");
        }, 2000);

    };

    return (
        <div className="container">
            {isLoading && <Loader />}

            <div className="login-container">
                <h2>Mot de passe oublié</h2>

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
                        <div className={isError ? "error-text" : "success-text"}>
                            {message}
                        </div>
                    )}

                    <button type="submit" className="login-button">
                        Réinitialiser mon mot de passe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;