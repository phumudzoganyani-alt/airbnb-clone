const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", auth, createReview);

router.get("/:id", getReviews);

router.delete("/:id", auth, deleteReview);

module.exports = router;