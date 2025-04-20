const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.headers["user-id"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "ID utilisateur manquant",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Erreur d'authentification",
    });
  }
};

module.exports = authMiddleware;
