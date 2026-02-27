import React from 'react';

const OrderSummury = () => {
    return (
        <div className="Summary-Container">
            <h2>Récapitulatif</h2>
            <div className="Total-detail">
                <div className="Detail1">
                    <p>Sous-total</p>
                    <p>{itemTotal}</p>
                </div>
                <div className="Detail2">
                    <p>Livraison</p>
                    <p>Je ne sais pas comment calculer</p>
                </div>
            </div>
        </div>
    );
};

export default OrderSummury;