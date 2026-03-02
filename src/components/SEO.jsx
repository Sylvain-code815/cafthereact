import React from 'react';

const SEO = ({ title, description }) => {
    return (
        <>
            <title>{title} | CafThé</title>

            <meta name="description" content={description} />

            {/* (Optionnel) Balises pour les réseaux sociaux */}
            <meta property="og:title" content={`${title} | CafThé`} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
        </>
    );
};

export default SEO;