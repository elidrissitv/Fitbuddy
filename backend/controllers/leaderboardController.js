const User = require("../models/User");

// Récupérer le classement
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "activities",
          localField: "activities",
          foreignField: "_id",
          as: "userActivities",
        },
      },
      {
        $project: {
          pseudo: 1,
          points: 1,
          avatarUrl: 1,
          activitiesCount: { $size: "$userActivities" },
          totalDistance: {
            $sum: "$userActivities.distance",
          },
          totalDuration: {
            $sum: "$userActivities.duration",
          },
        },
      },
      {
        $sort: { points: -1 },
      },
    ]);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
