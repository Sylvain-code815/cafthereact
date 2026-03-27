# CafThé - Application E-commerce

CafThé est une application web e-commerce premium proposant une sélection harmonieuse de thés et de cafés d'exception, alliant vente physique et digitale.

**Site en ligne** : [https://front-cafthe.slaurent.dev-campus.fr/](https://front-cafthe.slaurent.dev-campus.fr/)

## Prérequis

- [Node.js](https://nodejs.org/) >= 18
- npm
- Une API back-end fonctionnelle (Serveur local XAMPP avec base de données MySQL/MariaDB)

## Quickstart

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE_PROFIL/CafThe-Front.git
cd CafThe-Front

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Éditer .env et renseigner les variables nécessaires

# 4. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

## Variables d'environnement

| Variable       | Description                                      | Exemple                      |
|----------------|--------------------------------------------------|------------------------------|
| `VITE_API_URL` | URL de base pour communiquer avec l'API Back-End | `http://localhost:3000` |

## Scripts disponibles

| Commande          | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Lancer le serveur de développement       |
| `npm run build`   | Construire le projet pour la production  |
| `npm run preview` | Prévisualiser le build de production     |
| `npm run lint`    | Lancer ESLint sur le projet              |
| `npm run test`    | Lancer les tests                         |

## Routes principales

| URL                              | Description                                              |
|----------------------------------|----------------------------------------------------------|
| `/`                              | Page d'accueil, présentation de l'univers et des produits phares |
| `/thes`                          | Catalogue dynamique filtrable des thés                   |
| `/cafes`                         | Catalogue dynamique filtrable des cafés                  |
| `/login`                         | Page d'authentification et d'inscription                 |
| `/mon-compte`                    | Espace client sécurisé (historique de commandes, adresses) |

## Structure du projet

```
src/
├── assets/            # Ressources statiques (images WebP, fonts, icônes)
├── components/        # Composants React réutilisables (ProductCard, Header, etc.)
├── contexts/          # Gestion des états globaux (CartContext, AuthContext)
├── pages/             # Vues principales de l'application
├── services/          # Fonctions d'appels à l'API (fetch)
├── styles/            # Fichiers CSS et variables globales
├── App.jsx            # Configuration du routeur principal
└── main.jsx           # Point d'entrée de l'application React
```

## Déploiement

```bash
npm run build
```

Les fichiers statiques sont générés dans le dossier `dist/`. Le déploiement s'effectue en transférant le contenu du dossier `dist/` sur un serveur d'hébergement (ex : via FTP sur o2Switch ou Plesk), en configurant le serveur Web (Apache/Nginx) pour rediriger toutes les requêtes vers `index.html` (comportement SPA).

## Stack technique

- **React** — Bibliothèque UI pour la création de composants
- **Vite** — Outil de build front-end
- **CSS3** — Stylisation "Mobile First" et animations fluides

## Auteurs

Sylvain LAURENT — Développeur Front-End / Back-End (Projet DWWM)

## Licence

Ce projet est sous licence MIT.
