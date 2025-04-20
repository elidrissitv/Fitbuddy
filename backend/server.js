const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// Charger les variables d'environnement
dotenv.config();

console.log("Démarrage du serveur...");
console.log("Variables d'environnement chargées:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? "***" : "non défini",
});

const app = express();

// Configuration CORS
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://fitbuddy-auls.onrender.com"]
      : ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/activities", require("./routes/activities"));
app.use("/api/challenges", require("./routes/challenges"));
app.use("/api/leaderboard", require("./routes/leaderboard"));

// Configuration pour servir les fichiers statiques en production
if (process.env.NODE_ENV === "production") {
  // Servir les fichiers statiques du frontend
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Gérer les routes React
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

// Connexion à MongoDB
console.log(
  "Tentative de connexion à MongoDB avec l'URL:",
  process.env.MONGODB_URI
);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à MongoDB avec succès");
    // Vérifier la connexion
    mongoose.connection.on("error", (err) => {
      console.error("Erreur de connexion MongoDB:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Déconnecté de MongoDB");
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB:", err);
    console.error("Détails de l'erreur:", {
      name: err.name,
      message: err.message,
      code: err.code,
      codeName: err.codeName,
    });
  });

// Middleware d'erreur
app.use((err, req, res, next) => {
  console.error("Erreur serveur:", err);
  res.status(500).json({
    message: "Une erreur est survenue",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
