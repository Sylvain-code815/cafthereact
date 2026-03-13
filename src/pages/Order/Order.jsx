import React, { useState, useContext } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import OrderSummary from "../../components/Order/OrderSummary.jsx";
import Identification from "../../components/Order/Identification.jsx";
import Livraison from "../../components/Order/Livraison.jsx";
import Paiement from "../../components/Order/Paiement.jsx";
import Confirmation from "../../components/Order/Confirmation.jsx";
import SEO from "../../components/SEO.jsx";
import "./Order.css";

const STEPS = [
  { number: 1, label: "Identification" },
  { number: 2, label: "Livraison" },
  { number: 3, label: "Paiement" },
  { number: 4, label: "Confirmation" },
];

const Order = () => {
  const { cart } = useContext(CartContext);
  // modifie l'URL pour rester à l'étape actuelle quand il y a un refresh
  const [searchParams, setSearchParams] = useSearchParams();
  const stepParam = parseInt(searchParams.get("step"), 10);
  const currentStep = (stepParam >= 1 && stepParam <= 4) ? stepParam : 1;

  const [orderData, setOrderData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    complement: "",
    ville: "",
    codePostal: "",
    pays: "France",
    modeLivraison: "standard",
    shippingCost: 4.99,
    methodePaiement: "cb",
  });

  // Redirige si panier vide + empêche de taper directement /order dans url
  if (cart.length === 0 && currentStep < 4) {
    return <Navigate to="/panier" replace />;
  }

  const nextStep = () => setSearchParams({ step: currentStep + 1 });
  const prevStep = () => {
    if (currentStep > 1) setSearchParams({ step: currentStep - 1 });
  };
  const goToStep = (n) => setSearchParams({ step: n });
  const confirmOrder = () => setSearchParams({ step: 4 }, { replace: true });

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Identification onNext={nextStep} orderData={orderData} setOrderData={setOrderData} />;
      case 2:
        return <Livraison onNext={nextStep} onBack={prevStep} orderData={orderData} setOrderData={setOrderData} />;
      case 3:
        return <Paiement onNext={confirmOrder} onBack={prevStep} orderData={orderData} setOrderData={setOrderData} />;
      default:
        return null;
    }
  };

  return (
    <div className="order-container">
      <SEO title="Commande" description="Finalisez votre commande CafThé. Livraison rapide et paiement sécurisé." />
      <h1 className="sr-only">Commande</h1>

      <nav className="order-steps" aria-label="Étapes de commande">
        {STEPS.map((step, i) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          const isClickable = isCompleted && currentStep < 4;

          return (
            <React.Fragment key={step.number}>
              <button
                type="button"
                className={`order-step ${isActive ? "order-step--active" : ""} ${isCompleted ? "order-step--completed" : ""}`}
                onClick={() => isClickable && goToStep(step.number)}
                disabled={!isClickable}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="order-step-number">
                  {isCompleted ? "✓" : step.number}
                </span>
                <span className="order-step-label">{step.label}</span>
              </button>
              {i < STEPS.length - 1 && <div className="order-step-divider" />}
            </React.Fragment>
          );
        })}
      </nav>

      {currentStep < 4 ? (
        <div className="checkout-layout">
          <div className="checkout-left">
            {renderStepContent()}
          </div>
          <aside className="checkout-right">
            <OrderSummary shippingCost={orderData.shippingCost} modeLivraison={orderData.modeLivraison} />
          </aside>
        </div>
      ) : (
        <Confirmation orderData={orderData} />
      )}
    </div>
  );
};

export default Order;
