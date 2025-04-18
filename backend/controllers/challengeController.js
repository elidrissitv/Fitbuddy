const Challenge = require("../models/Challenge");
const User = require("../models/User");

// Récupérer tous les défis
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .populate({
        path: "participants",
        select: "pseudo avatarUrl",
        model: "User",
      })
      .sort({ startDate: -1 });

    // S'assurer que les participants sont bien des tableaux et formatés correctement
    const formattedChallenges = challenges.map((challenge) => {
      const challengeObj = challenge.toObject();
      return {
        ...challengeObj,
        participants: Array.isArray(challengeObj.participants)
          ? challengeObj.participants.map((participant) => ({
              _id: participant._id,
              pseudo: participant.pseudo,
              avatarUrl: participant.avatarUrl,
            }))
          : [],
      };
    });

    console.log(
      "Challenges formatés:",
      JSON.stringify(formattedChallenges, null, 2)
    );
    res.json(formattedChallenges);
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
      participants: [], // Initialiser avec un tableau vide
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

    // Récupérer le défi mis à jour avec les participants peuplés
    const updatedChallenge = await Challenge.findById(challengeId).populate({
      path: "participants",
      select: "pseudo avatarUrl",
      model: "User",
    });

    // Formater les données avant de les renvoyer
    const formattedChallenge = {
      ...updatedChallenge.toObject(),
      participants: Array.isArray(updatedChallenge.participants)
        ? updatedChallenge.participants.map((participant) => ({
            _id: participant._id,
            pseudo: participant.pseudo,
            avatarUrl: participant.avatarUrl,
          }))
        : [],
    };

    res.json(formattedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
