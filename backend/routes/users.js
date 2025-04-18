const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes pour les utilisateurs
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

module.exports = router;
