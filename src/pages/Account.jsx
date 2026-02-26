import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import ProfileTab from '../components/account/ProfileTab';
import OrdersTab from '../components/account/OrdersTab';
import './styles/Account.css';

const Account = () => {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profil');
    const prenom = user?.prenom || "Jean";
    const nom = user?.nom || "Dupont";
    const email = user?.email || "jean.dupont@example.com";

    return (
        <div className="account-page container">

            <Breadcrumb items={[{ label: "Mon compte" }]} />

            <header className="account-header">
                <div className="account-titles">
                    <h1>Mon Compte</h1>
                    <p>Bienvenue {prenom} {nom}</p>
                </div>
                <button className="logout-button" onClick={logout}>
                    Se déconnecter
                </button>
            </header>

            <nav className="account-tabs">
                <button
                    className={`tab-button ${activeTab === 'profil' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profil')}
                >
                    <img src="/src/Images/Icon/header-Login.svg" alt="" />
                    <span>Profil</span>
                </button>
                <button
                    className={`tab-button ${activeTab === 'commandes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('commandes')}
                >
                    <img src="/src/Images/Icon/commande.svg" alt="" />
                    <span>Commandes</span>
                </button>
            </nav>

            {activeTab === 'profil' && (
                <ProfileTab prenom={prenom} nom={nom} email={email} />
            )}

            {activeTab === 'commandes' && (
                <OrdersTab />
            )}
        </div>
    );
};

export default Account;
