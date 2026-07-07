const Review = require("../models/Review");

// Create Review
const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      accommodation: req.body.accommodation,
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Reviews for One Property
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      accommodation: req.params.id,
    }).populate("user", "username");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview,
};