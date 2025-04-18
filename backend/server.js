const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// Import des routes
const userRoutes = require("./routes/users");
const activityRoutes = require("./routes/activities");
const challengeRoutes = require("./routes/challenges");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes API
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Servir les fichiers statiques du frontend en production
if (process.env.NODE_ENV === "production") {
  // Servir les fichiers statiques du dossier build
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Pour toutes les autres routes, renvoyer index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
} else {
  // Route racine pour l'environnement de développement
  app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur l'API FitBuddy" });
  });
}

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

// Port
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
