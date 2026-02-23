import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./styles/Login.css"

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mdp, setmdp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            mdp,
          }),
        },
      );

      const data = await response.json();

      if (!response.error) {
        setErrorMsg(data.message || "Erreur de connexion");
        return;
      }

      // Appel au login via le contexte
      login(data.client);

      // Puis retour à l'accueil
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la connexion", error);
      setErrorMsg("Une erreur s'est produit lors de la connexion");
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>Connexion</h2>

        <form  className="form-container" onSubmit={handelSubmit}>
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

          <div className="form-group">
            <label htmlFor="password">Mot de passe *</label>
            <input
                value={mdp}
                required
                type="password"
                className="form-control"
                id="password"
                placeholder="••••••••"
                onChange={(e) => setmdp(e.target.value)}
            />

            <div className="forgot-password">
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </div>
          </div>

          {errorMsg && <div className="error-message">{errorMsg}</div>}

          <button type="submit" className="login-button">
            Se connecter
          </button>

          <p className="signup-link">
            Vous n'avez pas encore de compte ? <Link to="/signup">Créer un compte</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
