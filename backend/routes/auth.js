const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authController = require("../controllers/authController");

// Route temporaire pour vérifier un utilisateur
router.get("/check/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.json({
        exists: true,
        user: {
          id: user._id,
          username: user.username,
          createdAt: user.createdAt,
        },
      });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification:", error);
    res.status(500).json({ message: "Erreur lors de la vérification" });
  }
});

// Route d'inscription
router.post("/register", authController.register);

// Route de connexion
router.post("/login", authController.login);

// Route pour réinitialiser le mot de passe (temporaire)
router.post("/reset-password/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe
    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Mot de passe réinitialisé avec succès",
      passwordDetails: {
        originalLength: newPassword.length,
        hashedLength: hashedPassword.length,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la réinitialisation du mot de passe" });
  }
});

module.exports = router;
