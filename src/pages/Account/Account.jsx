import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProfileTab from '../../components/account/ProfileTab';
import OrdersTab from '../../components/account/OrdersTab';
import SEO from '../../components/SEO.jsx';
import './Account.css';

const Account = () => {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profil');
    const prenom = user?.prenom || "Jean";
    const nom = user?.nom || "Dupont";
    const email = user?.email || "jean.dupont@example.com";

    return (
        <div className="account-page">
            <SEO title="Mon Compte" description="Gérez votre compte CafThé : informations personnelles, adresses de livraison et historique de commandes." />

            <Breadcrumb items={[{ label: "Mon compte" }]} />

            <header className="account-header">
                <div className="account-titles">
                    <h1>Mon Compte</h1>
                    <p>Bienvenue {prenom} {nom}</p>
                </div>
                <button className="btn-outline logout-button" onClick={logout}>
                    Se déconnecter
                </button>
            </header>

            <div className="account-tabs" role="tablist">
                <button
                    className={`tab-button ${activeTab === 'profil' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profil')}
                    role="tab"
                    aria-selected={activeTab === 'profil'}
                    aria-controls="panel-profil"
                >
                    <img src="/src/Images/Icon/header-Login.svg" alt="section-profil" />
                    <span>Profil</span>
                </button>
                <button
                    className={`tab-button ${activeTab === 'commandes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('commandes')}
                    role="tab"
                    aria-selected={activeTab === 'commandes'}
                    aria-controls="panel-commandes"
                >
                    <img src="/src/Images/Icon/commande.svg" alt="section-commande" />
                    <span>Commandes</span>
                </button>
            </div>

            {activeTab === 'profil' && (
                <div role="tabpanel" id="panel-profil">
                    <ProfileTab prenom={prenom} nom={nom} email={email} />
                </div>
            )}

            {activeTab === 'commandes' && (
                <div role="tabpanel" id="panel-commandes">
                    <OrdersTab />
                </div>
            )}
        </div>
    );
};

export default Account;
