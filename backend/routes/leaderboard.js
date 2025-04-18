const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

// Route pour le classement
router.get("/", leaderboardController.getLeaderboard);

module.exports = router;
