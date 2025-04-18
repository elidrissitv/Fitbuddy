const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

// Routes pour les activités
router.get("/", activityController.getAllActivities);
router.post("/", activityController.addActivity);
router.get("/:id", activityController.getActivityById);
router.put("/:id", activityController.updateActivity);
router.delete("/:id", activityController.deleteActivity);

module.exports = router;
