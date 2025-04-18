const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["course", "yoga", "musculation", "vélo", "natation"],
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    distance: {
      type: Number,
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calcul automatique des points avant la sauvegarde
activitySchema.pre("save", function (next) {
  // Points de base pour la durée (1 point par minute)
  this.points = this.duration;

  // Bonus pour la distance (1 point par km)
  if (this.distance) {
    this.points += this.distance;
  }

  next();
});

module.exports = mongoose.model("Activity", activitySchema);
