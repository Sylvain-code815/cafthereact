import React, {useState} from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/login`,
                {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        email,
                        mdp: motDePasse,
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Erreur de connexion");
                return;
            }

            const {token, client} = data;

            // Appel au login via le contexte


            // Puis retour à l'accueil

        } catch (err) {
            console.err("Erreur lors de la connexion", err);
            setErrorMsg("Une erreur s'est produit lors de la connexion");
        }
    }

    return <div className="login-container">
            <h2>Connexion</h2>

            <form onSubmit={handelSubmit}>

                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input value={email} required type="email" className="form-control" id="email" placeholder="Votre email" onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe :</label>
                    <input value={motDePasse} required type="password" className="form-control" id="password" placeholder="Votre mot de passe" onChange={(e) => setMotDePasse(e.target.value)}/>
                </div>

            {/*    Affichage conditionnel du message d'erreur */}
                {errorMsg && <div className="error-message">{errorMsg}</div>}

                <button type="submit" className="login-button">Se connecter</button>

            </form>
        </div>
};

export default Login;