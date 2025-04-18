const Activity = require("../models/Activity");
const User = require("../models/User");

// Récupérer toutes les activités
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "pseudo avatarUrl")
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une activité par son ID
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      "user",
      "pseudo avatarUrl"
    );
    if (!activity) {
      return res.status(404).json({ message: "Activité non trouvée" });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les activités d'un utilisateur
exports.getUserActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.params.userId })
      .populate("user", "pseudo avatarUrl")
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une activité
exports.addActivity = async (req, res) => {
  try {
    const { type, duration, distance, userId } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const activity = new Activity({
      type,
      duration,
      distance,
      user: userId,
    });

    const savedActivity = await activity.save();
    await savedActivity.populate("user", "pseudo avatarUrl");

    // Mettre à jour les points de l'utilisateur
    user.points += savedActivity.points;
    user.activities.push(savedActivity._id);
    await user.save();

    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une activité
// Mettre à jour une activité
exports.updateActivity = async (req, res) => {
  try {
    const { type, duration, distance } = req.body;

    if (!duration) {
      return res.status(400).json({ message: "La durée est requise." });
    }

    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activité non trouvée" });
    }

    const oldPoints = activity.points;

    activity.type = type || activity.type;
    activity.duration = duration;
    activity.distance = distance || activity.distance;

    const updatedActivity = await activity.save();
    await updatedActivity.populate("user", "pseudo avatarUrl");

    // Vérifier l'existence de l'utilisateur
    const user = await User.findById(activity.user);
    if (user) {
      user.points = user.points - oldPoints + updatedActivity.points;
      await user.save();
    }

    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une activité
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activité non trouvée" });
    }

    const user = await User.findById(activity.user);

    if (user) {
      user.points -= activity.points;
      user.activities = user.activities.filter(
        (actId) => actId.toString() !== activity._id.toString()
      );
      await user.save();
    }

    await activity.deleteOne();
    res.json({ message: "Activité supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
