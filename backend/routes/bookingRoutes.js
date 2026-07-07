const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createBooking,
  getBookings,
  deleteBooking,
  payForBooking,
} = require("../controllers/bookingController");

// Create a booking
router.post("/", auth, createBooking);

// Get logged-in user's bookings
router.get("/", auth, getBookings);

// Mock payment
router.put("/:id/pay", auth, payForBooking);

// Cancel/Delete booking
router.delete("/:id", auth, deleteBooking);

module.exports = router;