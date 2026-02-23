import "./styles/LegalPage.css";

const CGV = () => {
  return (
    <div className="legal-page">
      <h1>Conditions Générales de Vente</h1>
      <p className="legal-updated">Dernière mise à jour : 23 février 2026</p>

      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes conditions générales de vente (CGV) régissent l'ensemble des ventes
        effectuées sur le site cafthe.fr, édité par la société CafThé, située au 15 rue de la Paix,
        75002 Paris, France.
      </p>

      <h2>Article 2 — Produits</h2>
      <p>
        CafThé propose à la vente des thés, cafés et accessoires associés. Les produits sont
        décrits et présentés avec la plus grande exactitude possible. Toutefois, des variations
        mineures de couleur ou de présentation peuvent survenir en raison du caractère artisanal
        de certains produits.
      </p>

      <h2>Article 3 — Prix</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises (TTC). CafThé se réserve le droit
        de modifier ses prix à tout moment, étant entendu que le prix applicable est celui en
        vigueur au moment de la validation de la commande par le client.
      </p>

      <h2>Article 4 — Commande</h2>
      <p>
        Le client passe commande sur le site cafthe.fr en ajoutant les produits souhaités à son
        panier, puis en validant sa commande après avoir renseigné ses informations de livraison
        et de paiement. Un e-mail de confirmation est envoyé au client après validation de la
        commande.
      </p>

      <h2>Article 5 — Paiement</h2>
      <p>
        Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard) via une plateforme
        de paiement sécurisée. Le montant est débité au moment de la validation de la commande.
      </p>

      <h2>Article 6 — Livraison</h2>
      <p>
        Les commandes sont livrées à l'adresse indiquée par le client lors de la commande. Les
        délais de livraison sont indicatifs et varient généralement entre 3 et 7 jours ouvrés pour
        la France métropolitaine. Les frais de livraison sont offerts à partir de 49€ d'achat.
      </p>

      <h2>Article 7 — Droit de rétractation</h2>
      <p>
        Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un
        délai de 14 jours à compter de la réception de sa commande pour exercer son droit de
        rétractation, sans avoir à justifier de motif. Les produits doivent être retournés dans
        leur état et emballage d'origine. Les frais de retour sont à la charge du client.
      </p>

      <h2>Article 8 — Réclamations</h2>
      <p>
        Pour toute réclamation, le client peut contacter le service client de CafThé par e-mail à
        l'adresse contact@cafthe.fr ou par téléphone au +33 1 23 45 67 89, du lundi au vendredi
        de 9h à 18h.
      </p>

      <h2>Article 9 — Données personnelles</h2>
      <p>
        Les données personnelles collectées lors de la commande sont traitées conformément à
        notre <a href="/politique-confidentialite">politique de confidentialité</a>. Le client
        dispose d'un droit d'accès, de rectification et de suppression de ses données.
      </p>

      <h2>Article 10 — Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux de
        Paris seront seuls compétents.
      </p>
    </div>
  );
};

export default CGV;
