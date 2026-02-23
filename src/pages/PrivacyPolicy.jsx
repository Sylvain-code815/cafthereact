import "./styles/LegalPage.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <h1>Politique de Confidentialité</h1>
      <p className="legal-updated">Dernière mise à jour : 23 février 2026</p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données personnelles est la société CafThé, située au
        15 rue de la Paix, 75002 Paris, France. Contact : contact@cafthe.fr.
      </p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons les données suivantes :</p>
      <ul>
        <li>Données d'identification : nom, prénom, adresse e-mail</li>
        <li>Données de livraison : adresse postale, numéro de téléphone</li>
        <li>Données de paiement : traitées de manière sécurisée par notre prestataire de paiement</li>
        <li>Données de navigation : cookies, adresse IP, pages consultées</li>
      </ul>

      <h2>3. Finalités du traitement</h2>
      <p>Vos données personnelles sont utilisées pour :</p>
      <ul>
        <li>La gestion et le suivi de vos commandes</li>
        <li>La communication relative à vos achats</li>
        <li>L'amélioration de nos services et de votre expérience utilisateur</li>
        <li>L'envoi de newsletters et d'offres promotionnelles (avec votre consentement)</li>
        <li>Le respect de nos obligations légales et réglementaires</li>
      </ul>

      <h2>4. Base légale</h2>
      <p>
        Le traitement de vos données repose sur l'exécution du contrat de vente (commandes),
        votre consentement (newsletters, cookies non essentiels) et nos obligations légales
        (facturation, conservation des données).
      </p>

      <h2>5. Destinataires des données</h2>
      <p>
        Vos données peuvent être transmises à nos prestataires techniques (hébergement, paiement,
        livraison) dans le strict cadre de l'exécution de nos services. Aucune donnée n'est vendue
        à des tiers.
      </p>

      <h2>6. Durée de conservation</h2>
      <p>
        Les données liées à votre compte client sont conservées pendant toute la durée de votre
        inscription, puis 3 ans après votre dernière activité. Les données de facturation sont
        conservées 10 ans conformément aux obligations comptables.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Notre site utilise des cookies essentiels au fonctionnement du site, ainsi que des cookies
        d'analyse et de personnalisation soumis à votre consentement. Vous pouvez gérer vos
        préférences à tout moment via le bandeau cookies.
      </p>

      <h2>8. Vos droits</h2>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
        des droits suivants :
      </p>
      <ul>
        <li>Droit d'accès à vos données personnelles</li>
        <li>Droit de rectification des données inexactes</li>
        <li>Droit à l'effacement de vos données</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité de vos données</li>
        <li>Droit d'opposition au traitement</li>
      </ul>
      <p>
        Pour exercer vos droits, contactez-nous à contact@cafthe.fr. Vous pouvez également
        introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et
        des Libertés).
      </p>

      <h2>9. Sécurité</h2>
      <p>
        Nous mettons en oeuvre des mesures techniques et organisationnelles appropriées pour
        protéger vos données personnelles contre tout accès non autorisé, modification,
        divulgation ou destruction.
      </p>

      <h2>10. Modification</h2>
      <p>
        CafThé se réserve le droit de modifier la présente politique de confidentialité à tout
        moment. Les modifications prennent effet dès leur publication sur le site.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
