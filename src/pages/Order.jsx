import React, { useState, useContext } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import Identification from "../components/Identification.jsx";
import Livraison from "../components/Livraison.jsx";
import Paiement from "../components/Paiement.jsx";
import Confirmation from "../components/Confirmation.jsx";
import "./styles/Order.css";

const STEPS = [
  { number: 1, label: "Identification" },
  { number: 2, label: "Livraison" },
  { number: 3, label: "Paiement" },
  { number: 4, label: "Confirmation" },
];

const Order = () => {
  const { cart } = useContext(CartContext);
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

  // Redirige si panier vide et pas encore en confirmation
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
      {/* Indicateur d'étapes */}
      <div className="order-steps">
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
      </div>

      {currentStep < 4 ? (
        <div className="checkout-layout">
          <div className="checkout-left">
            {renderStepContent()}
          </div>
          <div className="checkout-right">
            <OrderSummary shippingCost={orderData.shippingCost} />
          </div>
        </div>
      ) : (
        <Confirmation orderData={orderData} />
      )}
    </div>
  );
};

export default Order;
