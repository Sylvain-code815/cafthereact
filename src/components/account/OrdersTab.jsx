import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

// Libellés affichés pour les statuts techniques de l'API
const STATUS_LABELS = {
  pending: "En attente",
  preparing: "En préparation",
  shipped: "Expédiée",
  delivered: "Livrée",
};

const statusClass = (statut) => {
  if (statut === "delivered") return "delivered";
  if (statut === "pending" || statut === "preparing" || statut === "shipped") return "in-progress";
  return "";
};

// API native Intl pour gestion des dates
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Historique unifié : commandes passées sur le site ET achats faits en boutique (CDC 4.5)
const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/api/orders/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => setOrders(data.commandes))
      .catch((err) => {
        console.error("Erreur chargement commandes:", err);
        setError("Impossible de charger vos commandes");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="account-content"><p>Chargement des commandes...</p></div>;
  }

  if (error) {
    return <div className="account-content"><p className="empty-orders">{error}</p></div>;
  }

  if (orders.length === 0) {
    return (
      <div className="account-content">
        <p className="empty-orders">Vous n'avez pas encore de commandes.</p>
      </div>
    );
  }

  return (
    <div className="account-content">
      <h2 className="section-title">Mes commandes</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.num_commande} className="order-card">
            <div className="order-info">
              <span className="order-id">Commande #{order.num_commande}</span>
              <span className="order-date">{formatDate(order.date_commande)}</span>
              <span className="order-articles">
                {order.nombre_produits} produit{order.nombre_produits > 1 ? "s" : ""}
                {order.mode_commande === "store" ? " · achat en boutique" : ""}
              </span>
            </div>
            <div className="order-meta">
              <span className={`order-status ${statusClass(order.statut_commande)}`}>
                {STATUS_LABELS[order.statut_commande] || order.statut_commande}
              </span>
              <span className="order-total">{Number(order.total).toFixed(2)} €</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
