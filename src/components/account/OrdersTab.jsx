import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import { useToast } from "../../contexts/ToastContext";
import { buildReorder } from "../../utils/reorder.js";

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
  const [reorderingId, setReorderingId] = useState(null);
  const { cart, addToCart } = useContext(CartContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

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

  // Commander à l'identique une commande passée (CDC 4.5) :
  // les lignes sont relues dans l'API, avec les prix et stocks actuels du catalogue
  const handleReorder = async (numCommande) => {
    setReorderingId(numCommande);
    try {
      const res = await fetch(`${API}/api/orders/${numCommande}`, { credentials: "include" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { commande } = await res.json();
      const lignes = commande.lignes || [];

      // Produit désactivé ou supprimé : l'API répond 404, il est simplement ignoré
      const codes = [...new Set(lignes.map((l) => l.code_produit))];
      const produits = await Promise.all(
        codes.map((code) =>
          fetch(`${API}/api/articles/${code}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => data?.article || null)
            .catch(() => null),
        ),
      );
      const productsById = new Map(produits.filter(Boolean).map((p) => [p.code_produit, p]));

      const { toAdd, unavailable, capped } = buildReorder(lignes, productsById, cart);

      if (toAdd.length === 0) {
        showToast("Aucun produit de cette commande n'est disponible actuellement", "error");
        return;
      }

      toAdd.forEach(({ produit, poids, qty }) => addToCart(produit, poids, qty));

      // Un seul message pour ne pas empiler les notifications
      const notes = [];
      if (unavailable.length) notes.push(`indisponible : ${unavailable.join(", ")}`);
      if (capped.length) notes.push(`quantité limitée au stock : ${capped.join(", ")}`);
      showToast(
        notes.length ? `Produits ajoutés au panier (${notes.join(" ; ")})` : "Produits ajoutés au panier",
        notes.length ? "error" : "success",
      );
      navigate("/panier");
    } catch (err) {
      console.error("Erreur recommande:", err);
      showToast("Impossible de recommander cette commande", "error");
    } finally {
      setReorderingId(null);
    }
  };

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
              <button
                type="button"
                className="btn-outline order-reorder-btn"
                onClick={() => handleReorder(order.num_commande)}
                disabled={reorderingId !== null}
                aria-label={`Commander à nouveau la commande ${order.num_commande}`}
              >
                {reorderingId === order.num_commande ? "Ajout en cours..." : "Commander à nouveau"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
