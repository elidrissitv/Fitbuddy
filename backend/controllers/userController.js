const User = require("../models/User");

// Créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { pseudo, avatarUrl } = req.body;

    // Vérifier si le pseudo existe déjà
    const existingUser = await User.findOne({ pseudo });
    if (existingUser) {
      return res.status(400).json({ message: "Ce pseudo est déjà utilisé" });
    }

    const user = new User({
      pseudo,
      avatarUrl: avatarUrl || "",
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("pseudo points avatarUrl")
      .sort({ points: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("activities")
      .populate("challenges");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
