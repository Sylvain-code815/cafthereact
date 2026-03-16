# CafThé - Application E-commerce

CafThé est une application web e-commerce premium proposant une sélection harmonieuse de thés et de cafés d'exception, alliant vente physique et digitale.

## Prérequis
- [Node.js](https://nodejs.org/) >= 18
- npm
- Une API back-end fonctionnelle (Serveur local XAMPP avec base de données MySQL/MariaDB)

## Quickstart

```bash
# 1. Cloner le depot
git clone [https://github.com/VOTRE_PROFIL/CafThe-Front.git](https://github.com/VOTRE_PROFIL/CafThe-Front.git)
cd CafThe-Front

# 2. Installer les dependances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Editer .env et renseigner les variables necessaires

# 4. Lancer le serveur de developpement
npm run dev

L'application sera accessible sur http://localhost:5173.Variables d'environnementVariableDescriptionExempleVITE_API_URLURL de base pour communiquer avec l'API Back-Endhttp://localhost:8000/apiScripts disponiblesCommandeDescriptionnpm run devLancer le serveur de developpementnpm run buildConstruire le projet pour la prodnpm run previewPrevisualiser le build de prodnpm run lintLancer ESLint sur le projetExemples d'utilisationVoici les principales routes de l'application Front-End :URLDescriptionhttp://localhost:5173/Page d'accueil, présentation de l'univers et des produits phareshttp://localhost:5173/thesCatalogue dynamique filtrable des théshttp://localhost:5173/cafesCatalogue dynamique filtrable des caféshttp://localhost:5173/loginPage d'authentification et d'inscriptionhttp://localhost:5173/mon-compteEspace client sécurisé (historique de commandes, adresses)Structure du projetPlaintextsrc/
├── assets/            # Ressources statiques (images WebP, fonts, icônes)
├── components/        # Composants React réutilisables (ProductCard, Header, etc.)
├── context/           # Gestion des états globaux (ex: CartContext)
├── pages/             # Vues principales de l'application
├── services/          # Fonctions d'appels à l'API (fetch)
├── styles/            # Fichiers CSS et variables globales
├── App.jsx            # Configuration du routeur principal
└── main.jsx           # Point d'entrée de l'application React
DeploiementBuild de productionBashnpm run build
Les fichiers statiques sont generes dans le dossier dist/.HebergementLe déploiement s'effectue en transférant le contenu du dossier dist/ sur un serveur d'hébergement mutualisé ou dédié (ex: via FTP sur o2Switch ou Plesk), en s'assurant de configurer le serveur Web (Apache/Nginx) pour rediriger toutes les requêtes vers index.html (comportement SPA).TestsBash# Lancer les tests
npm run test
Stack techniqueReact — Bibliothèque UI pour la création de composantsVite — Outil de build front-endCSS3 — Stylisation "Mobile First" et animations fluidesAuteursSylvain LAURENT — Développeur Front-End / Back-End (Projet DWWM)LicenceCe projet est sous licence MIT.Liens utilesDocumentation ReactDocumentation ViteDocumentation API : Swagger (Voir fichier PDF joint au projet)