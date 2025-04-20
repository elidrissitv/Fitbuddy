# FitBuddy - Application de Suivi d'Activités Physiques

FitBuddy est une application web moderne qui permet aux utilisateurs de suivre leurs activités physiques, participer à des défis et se mesurer aux autres utilisateurs via un classement.

## Fonctionnalités

- 📱 **Tableau de bord personnalisé** : Visualisez vos statistiques d'activités
- 🏃 **Suivi d'activités** : Enregistrez vos activités physiques (course, marche, vélo, etc.)
- 🏆 **Système de points** : Gagnez des points en fonction de vos activités
- 🎯 **Défis** : Participez à des défis communautaires
- 📊 **Classement** : Consultez le classement des utilisateurs
- 👤 **Profil utilisateur** : Gérez vos informations personnelles
- 🌙 **Mode sombre** : Interface adaptative jour/nuit

## Technologies Utilisées

### Frontend

- React.js
- Tailwind CSS
- Chart.js pour les visualisations
- Axios pour les requêtes API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT pour l'authentification

## Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB
- npm ou yarn

### Configuration

1. Clonez le dépôt :

```bash
git clone https://github.com/elidrissitv/fitbuddy.git
cd fitbuddy
```

2. Installez les dépendances du backend :

```bash
cd backend
npm install
```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` dans le dossier backend avec :

```
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
```

4. Installez les dépendances du frontend :

```bash
cd ../frontend
npm install
```

## Démarrage

1. Démarrez le serveur backend :

```bash
cd backend
npm start
```

2. Démarrez le serveur frontend :

```bash
cd frontend
npm start
```

L'application sera accessible à l'adresse `http://localhost:3000`

## Structure du Projet

```
fitbuddy/
├── backend/
│   ├── controllers/     # Logique métier
│   ├── models/         # Modèles MongoDB
│   ├── routes/         # Routes API
│   ├── middleware/     # Middleware Express
│   └── server.js       # Point d'entrée du serveur
├── frontend/
│   ├── src/
│   │   ├── components/ # Composants React
│   │   ├── pages/      # Pages de l'application
│   │   ├── services/   # Services API
│   │   └── App.js      # Point d'entrée React
│   └── public/         # Fichiers statiques
└── README.md
```

## API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Activités

- `GET /api/activities` - Liste des activités
- `POST /api/activities` - Créer une activité
- `GET /api/activities/:id` - Détails d'une activité

### Défis

- `GET /api/challenges` - Liste des défis
- `POST /api/challenges` - Créer un défi
- `GET /api/challenges/:id` - Détails d'un défi

### Classement

- `GET /api/leaderboard` - Classement des utilisateurs

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à nous contacter à [votre-email@example.com](mailto:itsmenulled@gmail.com)
