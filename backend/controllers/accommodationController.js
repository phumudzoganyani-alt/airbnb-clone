const Accommodation = require("../models/Accommodation");
const Booking = require("../models/Booking");
const User = require("../models/User");

// Create Accommodation
const createAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.create(req.body);

    res.status(201).json({
      message: "Accommodation created successfully",
      accommodation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Accommodations
const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();

    res.json(accommodations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Accommodation By ID
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        message: "Accommodation not found",
      });
    }

    res.json(accommodation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Accommodation
const updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!accommodation) {
      return res.status(404).json({
        message: "Accommodation not found",
      });
    }

    res.json({
      message: "Accommodation updated successfully",
      accommodation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Accommodation
const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        message: "Accommodation not found",
      });
    }

    res.json({
      message: "Accommodation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalListings = await Accommodation.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const paidBookings = await Booking.find({
      paymentStatus: "Paid",
    });

    let totalRevenue = 0;

    paidBookings.forEach((booking) => {
      totalRevenue += booking.totalPrice;
    });

    const recentListings = await Accommodation.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentBookings = await Booking.find()
      .populate("accommodation")
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(5);

    const topProperties = await Booking.aggregate([
      {
        $group: {
          _id: "$accommodation",
          bookings: { $sum: 1 },
        },
      },
      {
        $sort: {
          bookings: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "accommodations",
          localField: "_id",
          foreignField: "_id",
          as: "property",
        },
      },
      {
        $unwind: "$property",
      },
      {
        $project: {
          title: "$property.title",
          bookings: 1,
        },
      },
    ]);

    res.json({
      totalListings,
      totalUsers,
      totalBookings,
      totalRevenue,
      recentListings,
      recentBookings,
      topProperties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAccommodation,
  getAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
  getDashboardStats,
};