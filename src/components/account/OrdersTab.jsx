import React from "react";

const mockOrders = [
  { id_commande: 1, date: "2025-01-15", statut: "Livrée", total: 45.90, articles: 3 },
  { id_commande: 2, date: "2025-02-10", statut: "En cours", total: 28.50, articles: 2 },
];

const statusClass = (statut) => {
  if (statut === "Livrée") return "delivered";
  if (statut === "En cours") return "in-progress";
  return "";
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const OrdersTab = () => {
  if (mockOrders.length === 0) {
    return (
      <div className="account-content">
        <p className="empty-orders">Vous n'avez pas encore de commandes.</p>
      </div>
    );
  }

  return (
    <div className="account-content">
      <div className="orders-list">
        {mockOrders.map((order) => (
          <div key={order.id_commande} className="order-card">
            <div className="order-info">
              <span className="order-id">Commande #{order.id_commande}</span>
              <span className="order-date">{formatDate(order.date)}</span>
              <span className="order-articles">{order.articles} article{order.articles > 1 ? "s" : ""}</span>
            </div>
            <div className="order-meta">
              <span className={`order-status ${statusClass(order.statut)}`}>{order.statut}</span>
              <span className="order-total">{order.total.toFixed(2)}€</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
