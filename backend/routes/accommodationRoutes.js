const express = require("express");
const admin = require("../middleware/admin");

const {
  createAccommodation,
  getAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
  getDashboardStats,
} = require("../controllers/accommodationController");

const auth = require("../middleware/auth");

const router = express.Router();

// Dashboard route (must come before /:id)
router.get(
  "/dashboard/stats",
  auth,
  admin,
  getDashboardStats
);

router.post("/", auth, createAccommodation);

router.get("/", getAccommodations);

router.get("/:id", getAccommodationById);

router.put("/:id", auth, updateAccommodation);

router.delete("/:id", auth, deleteAccommodation);

module.exports = router;