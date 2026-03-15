import React from "react";

const statusClass = (statut) => {
  if (statut === "Livrée") return "delivered";
  if (statut === "En cours") return "in-progress";
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

const OrdersTab = () => {
  const orders = getSavedOrders();

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
          <div key={order.id_commande} className="order-card">
            <div className="order-info">
              <span className="order-id">Commande #{order.id_commande}</span>
              <span className="order-date">{formatDate(order.date)}</span>
              <span className="order-articles">{order.articles} article{order.articles > 1 ? "s" : ""}</span>
            </div>
            <div className="order-meta">
              <span className={`order-status ${statusClass(order.statut)}`}>{order.statut}</span>
              <span className="order-total">{order.total.toFixed(2)} €</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
