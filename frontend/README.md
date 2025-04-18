# FitBuddy - Application de Suivi Sportif

FitBuddy est une application web React qui permet aux groupes d'amis de suivre leurs progrès fitness, participer à des défis sportifs et voir des statistiques communautaires.

## Fonctionnalités

- 📊 Tableau de bord avec statistiques et graphiques
- 🏃‍♂️ Suivi des activités sportives
- 🏆 Défis communautaires
- 📈 Classement des utilisateurs
- 👤 Profil utilisateur personnalisé
- 🌙 Mode sombre

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/votre-username/fitbuddy.git
cd fitbuddy
```

2. Installez les dépendances :

```bash
npm install
# ou
yarn install
```

3. Configurez l'API backend :
   Assurez-vous que votre API backend est en cours d'exécution sur `http://localhost:5000/api`

4. Lancez l'application :

```bash
npm start
# ou
yarn start
```

L'application sera disponible sur `http://localhost:3000`

## Structure du Projet

```
src/
  ├── components/     # Composants React réutilisables
  ├── pages/         # Pages de l'application
  ├── services/      # Services API
  ├── App.js         # Configuration des routes
  └── index.js       # Point d'entrée
```

## Technologies Utilisées

- React
- React Router v6
- TailwindCSS
- Chart.js
- Axios

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT
