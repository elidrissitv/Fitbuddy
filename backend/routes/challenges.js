const express = require("express");
const router = express.Router();
const challengeController = require("../controllers/challengeController");

// Routes pour les défis
router.get("/", challengeController.getAllChallenges);
router.post("/", challengeController.createChallenge);
router.put("/:id/join", challengeController.joinChallenge);

module.exports = router;
