# 🏃‍♂️ FitBuddy — Suivi d'Activités Physiques

**FitBuddy** est une application web moderne qui permet aux utilisateurs de suivre leurs activités physiques, participer à des défis sportifs et comparer leurs performances avec une communauté.

---

## 🌟 Fonctionnalités

### 📊 Tableau de Bord Personnalisé

- Visualisation des statistiques personnelles
- Graphiques hebdomadaires d'activité
- Suivi des performances et progrès

### 🎯 Activités

- Enregistrement d’activités variées : course, yoga, musculation, vélo, natation, etc.
- Suivi de la **durée** et de la **distance**
- Historique détaillé des séances

### 🏆 Défis

- Rejoindre ou créer des défis communautaires
- Classement en temps réel
- Objectifs personnalisés par utilisateur ou par groupe

### 🏅 Classement

- Système de points intelligent
- Classement global entre les utilisateurs
- Mise en avant du **Top 3**

---

## 🛠️ Technologies Utilisées

### Frontend

- ⚛️ React.js
- 💨 Tailwind CSS
- 📈 Chart.js pour les visualisations
- 🔁 React Router pour la navigation
- 🔌 Axios pour les appels API

### Backend

- 🌐 Node.js
- 🚂 Express.js
- 🗃️ MongoDB
- 🧩 Mongoose pour la gestion des modèles de données

---

## 📦 Installation & Lancement

### 1. Cloner le projet

```bash
git clone [URL_DU_REPO]
cd FitBuddy
```

### 2. Installer les dépendances

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Configuration de l’environnement

Créer un fichier `.env` dans le dossier `backend` avec le contenu suivant :

```env
PORT=5000
MONGODB_URI=votre_uri_mongodb
```

### 4. Lancer l'application

```bash
# Lancer le backend
cd backend
npm start

# Lancer le frontend dans un terminal séparé
cd ../frontend
npm start
```

---

## 🧱 Structure du Projet

```
FitBuddy/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── public/
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    └── server.js
```

---

## 🔒 Modélisation des Données

### 👤 Utilisateur (User)

```js
{
  pseudo: String,
  points: Number,
  avatarUrl: String,
  activities: [Activity],
  challenges: [Challenge]
}
```

### 🏃 Activité (Activity)

```js
{
  type: String,
  duration: Number,
  distance: Number,
  user: User,
  date: Date,
  points: Number
}
```

### 🎯 Défi (Challenge)

```js
{
  title: String,
  description: String,
  type: String,
  goal: Number,
  participants: [User],
  startDate: Date,
  endDate: Date,
  status: String
}
```

---

## 🔌 API Endpoints

### 👥 Utilisateurs

- `GET /api/users` : Obtenir la liste des utilisateurs
- `GET /api/users/:id` : Obtenir les infos d’un utilisateur
- `POST /api/users` : Créer un nouvel utilisateur

### 🏃 Activités

- `GET /api/activities` : Récupérer toutes les activités
- `POST /api/activities` : Créer une nouvelle activité
- `GET /api/activities/:id` : Obtenir une activité spécifique

### 🎯 Défis

- `GET /api/challenges` : Récupérer tous les défis
- `POST /api/challenges` : Créer un défi
- `PUT /api/challenges/:id/join` : Rejoindre un défi

---

## 🎨 Personnalisation

L’interface est développée avec Tailwind CSS, facilitant une personnalisation rapide grâce aux classes utilitaires.  
🌓 **Support du mode sombre inclus !**

---

## 🤝 Contribution

Les contributions sont les bienvenues !  
Voici comment contribuer :

1. Fork le projet
2. Crée une branche pour ta fonctionnalité
3. Commits tes modifications
4. Pousse la branche
5. Ouvre une Pull Request 🙌

---

## 📄 Licence

Distribué sous la licence MIT.  
Voir le fichier `LICENSE.md` pour plus d’informations.

---

## 👥 Auteurs

[Votre Nom] – Développement initial

---

## 🙏 Remerciements

- La communauté React pour leur superbe écosystème
- Les contributeurs de Tailwind CSS pour leur flexibilité de design
- L’équipe MongoDB pour leur base de données performante
