const mongoose = require("mongoose");
require("dotenv").config();

const Accommodation = require("../models/Accommodation");

mongoose.connect(process.env.MONGO_URI);

const accommodations = [
  {
    title: "Luxury Penthouse",
    location: "New York, USA",
    description: "Luxury penthouse overlooking Central Park with breathtaking skyline views.",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    type: "Apartment",
    price: 6500,
    amenities: ["WiFi", "Kitchen", "Pool", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200"
    ],
  },

  {
    title: "Beachfront Villa",
    location: "Cape Town, South Africa",
    description: "Beautiful villa located a few steps from the beach.",
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    type: "Villa",
    price: 4200,
    amenities: ["WiFi", "Pool", "Parking", "Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200"
    ],
  },

  {
    title: "Modern Apartment",
    location: "Johannesburg, South Africa",
    description: "Modern apartment in Sandton close to shopping malls.",
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    type: "Apartment",
    price: 1800,
    amenities: ["WiFi", "Kitchen", "TV"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
    ],
  },

  {
    title: "Ocean View Loft",
    location: "Durban, South Africa",
    description: "Relax with beautiful ocean views from your private balcony.",
    bedrooms: 2,
    bathrooms: 2,
    guests: 5,
    type: "Loft",
    price: 2200,
    amenities: ["WiFi", "Kitchen", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200"
    ],
  },

  {
    title: "City Apartment",
    location: "London, United Kingdom",
    description: "Stylish apartment close to Hyde Park and underground stations.",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    type: "Apartment",
    price: 5200,
    amenities: ["WiFi", "Kitchen", "Heating"],
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200"
    ],
  },

  {
    title: "Eiffel Studio",
    location: "Paris, France",
    description: "Romantic studio apartment just minutes from the Eiffel Tower.",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    type: "Studio",
    price: 4800,
    amenities: ["WiFi", "Kitchen", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200"
    ],
  },

  {
    title: "Downtown Condo",
    location: "Dubai, UAE",
    description: "Luxury condo in Downtown Dubai with amazing city views.",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    type: "Condo",
    price: 7000,
    amenities: ["WiFi", "Pool", "Gym", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200"
    ],
  },

  {
    title: "Mountain Cabin",
    location: "Aspen, USA",
    description: "Warm wooden cabin surrounded by snowy mountains.",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    type: "Cabin",
    price: 3900,
    amenities: ["Fireplace", "WiFi", "Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200"
    ],
  },

  {
    title: "Opera House Apartment",
    location: "Sydney, Australia",
    description: "Luxury apartment overlooking Sydney Harbour.",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    type: "Apartment",
    price: 5600,
    amenities: ["WiFi", "Kitchen", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200"
    ],
  },

  {
    title: "Shibuya Apartment",
    location: "Tokyo, Japan",
    description: "Modern apartment in the vibrant Shibuya district.",
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    type: "Apartment",
    price: 5900,
    amenities: ["WiFi", "Kitchen", "Air Conditioning"],
    images: [
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?w=1200"
    ],
  },

  {
    title: "Santorini Villa",
    location: "Santorini, Greece",
    description: "Traditional white villa with panoramic sea views.",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    type: "Villa",
    price: 8200,
    amenities: ["Pool", "WiFi", "Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
    ],
  },

  {
    title: "Canal House",
    location: "Amsterdam, Netherlands",
    description: "Beautiful canal-side home in the heart of Amsterdam.",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    type: "House",
    price: 5100,
    amenities: ["WiFi", "Kitchen", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
    ],
  },
];

const seedDatabase = async () => {
  try {
    await Accommodation.deleteMany();
    await Accommodation.insertMany(accommodations);

    console.log("✅ Accommodations added successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();