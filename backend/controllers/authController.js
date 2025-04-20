const User = require("../models/User");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Tentative de connexion pour:", username);

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Utilisateur non trouvé:", username);
      return res.status(400).json({
        success: false,
        message: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }

    console.log("Utilisateur trouvé, vérification du mot de passe...");

    // Vérifier le mot de passe
    if (password !== user.password) {
      console.log("Mot de passe incorrect pour l'utilisateur:", username);
      return res.status(400).json({
        success: false,
        message: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }

    console.log("Connexion réussie pour:", username);
    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Tentative d'inscription pour:", username);
    console.log("Données reçues:", { username, password });

    // Validation des données
    if (!username || !password) {
      console.log("Données manquantes:", { username, password });
      return res.status(400).json({
        success: false,
        message: "Nom d'utilisateur et mot de passe requis",
      });
    }

    // Vérifier si l'utilisateur existe déjà
    console.log("Recherche d'un utilisateur existant...");
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Utilisateur déjà existant:", username);
      return res.status(400).json({
        success: false,
        message: "Ce nom d'utilisateur est déjà pris",
      });
    }

    // Créer un nouvel utilisateur
    console.log("Création d'un nouvel utilisateur...");
    const user = new User({
      username,
      password,
      points: 0,
      avatarUrl: "",
      activities: [],
      challenges: [],
    });

    console.log("Tentative de sauvegarde de l'utilisateur...");
    try {
      await user.save();
      console.log("Utilisateur créé avec succès:", username);
    } catch (saveError) {
      console.error("Erreur lors de la sauvegarde:", saveError);
      throw saveError;
    }

    res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    console.error("Détails de l'erreur:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de l'utilisateur",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  register,
};
