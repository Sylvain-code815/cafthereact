import React, { useState } from 'react';
import OrderSummury from "../OrderSummury.jsx";
import Confirmation from "../components/Confirmation.jsx";

const Order = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => setCurrentStep(prev => prev + 1);

    // On affiche la section correspondante à l'étape
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Identification onNext={nextStep} />;
            case 2:
                return <Livraison onNext={nextStep} />;
            case 3:
                return <Paiement onNext={nextStep} />;
            default:
                return null;
        }
    };

    return (
        <div className="order-container">

            {currentStep < 4 ? (
                <div className="checkout-layout">

                    <div className="layout-left">
                        {renderStepContent()}
                    </div>

                    <div className="layout-right">
                        <OrderSummary />
                    </div>

                </div>
            ) : (
                <Confirmation />
            )}

        </div>
    );
};

export default Order;