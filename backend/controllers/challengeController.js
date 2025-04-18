const Challenge = require("../models/Challenge");
const User = require("../models/User");

// Récupérer tous les défis
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .populate("participants", "pseudo avatarUrl")
      .sort({ startDate: -1 });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un défi
exports.createChallenge = async (req, res) => {
  try {
    const { title, description, type, goal, endDate } = req.body;

    const challenge = new Challenge({
      title,
      description,
      type,
      goal,
      endDate: new Date(endDate),
    });

    const savedChallenge = await challenge.save();
    res.status(201).json(savedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Rejoindre un défi
exports.joinChallenge = async (req, res) => {
  try {
    const { userId } = req.body;
    const challengeId = req.params.id;

    // Vérifier si le défi existe
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Défi non trouvé" });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si l'utilisateur n'est pas déjà participant
    if (challenge.participants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Vous participez déjà à ce défi" });
    }

    // Ajouter l'utilisateur aux participants
    challenge.participants.push(userId);
    await challenge.save();

    // Ajouter le défi à la liste des défis de l'utilisateur
    user.challenges.push(challengeId);
    await user.save();

    res.json({ message: "Vous avez rejoint le défi avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
