import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './styles/Account.css';

const Account = () => {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profil');
    const prenom = user?.prenom || "Jean";
    const nom = user?.nom || "Dupont";
    const email = user?.email || "jean.dupont@example.com";

    console.log(window.history)

    return (
        <div className="account-page container">

            <div className="breadcrumb">
                <Link to="/">Accueil</Link> / <span>Mon compte</span>
            </div>

            <header className="account-header">
                <div className="account-titles">
                    <h1>Mon Compte</h1>
                    <p>Bienvenue {prenom} {nom}</p>
                </div>
                <button className="logout-button" onClick={logout}>
                    <span className="icon">🚪</span> Se déconnecter
                </button>
            </header>

            <nav className="account-tabs">
                <button
                    className={`tab-button ${activeTab === 'profil' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profil')}
                >
                    <img src="/src/Images/Icon/header-Login.svg" alt="onglet-profil" />
                    <span className="tab-profil">Profil</span>
                </button>
                <button
                    className={`tab-button ${activeTab === 'commandes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('commandes')}
                >
                    <img src="/src/Images/Icon/commande.svg" alt="onglet-commande" />
                    <span> Commandes</span>
                </button>
            </nav>

            {activeTab === 'profil' && (
                <div className="account-content">

                    <div className="account-grid">

                        <div className="info-card">
                            <h3>Informations personnelles</h3>
                            <div className="info-details">
                                <div className="info-group">
                                    <span className="label">Prénom</span>
                                    <span className="value">{prenom}</span>
                                </div>
                                <div className="info-group">
                                    <span className="label">Nom</span>
                                    <span className="value">{nom}</span>
                                </div>
                                <div className="info-group full-width">
                                    <span className="label">Email</span>
                                    <span className="value">{email}</span>
                                </div>
                                <div className="info-group full-width">
                                    <span className="label">Téléphone</span>
                                    <span className="value">+33 6 12 34 56 78</span>
                                </div>
                            </div>
                            <button className="black-btn full-width-btn">
                                Modifier mes informations
                            </button>
                        </div>

                        <div className="security-card">
                            <h3>Sécurité</h3>
                            <div className="info-group">
                                <span className="label">Mot de passe</span>
                                <span className="value">••••••••</span>
                            </div>
                            <button className="outline-btn full-width-btn">
                                <img src="/src/Images/Icon/signup-mdp.svg" alt="mot de passe bouton"/>
                                <span> Changer mon mot de passe </span>
                            </button>
                        </div>
                    </div>

                    <div className="addresses-section">
                        <h3 className="section-title">Mes adresses</h3>

                        <div className="address-card">
                            <div className="address-info">
                                <h4>Domicile <span className="badge">Par défaut</span></h4>
                                <p>{prenom} {nom}</p>
                                <p>25 rue de la République</p>
                                <p>69002 Lyon</p>
                                <p>France</p>
                                <p>+33 6 12 34 56 78</p>
                            </div>
                            <div className="address-actions">
                                <button className="text-btn">Modifier</button>
                                <button className="text-btn">Supprimer</button>
                            </div>
                        </div>

                        <div className="address-card">
                            <div className="address-info">
                                <h4>Bureau</h4>
                                <p>{prenom} {nom}</p>
                                <p>10 avenue des Champs</p>
                                <p>69003 Lyon</p>
                                <p>France</p>
                                <p>+33 6 12 34 56 78</p>
                            </div>
                            <div className="address-actions">
                                <button className="text-btn">Modifier</button>
                                <button className="text-btn">Supprimer</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {activeTab === 'commandes' && (
                <div className="account-content">
                    <p style={{textAlign: "center", padding: "40px"}}>Vous n'avez pas encore de commandes.</p>
                </div>
            )}
        </div>
    );
};

export default Account;