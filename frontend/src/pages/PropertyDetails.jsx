import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);

  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await api.get(`/accommodations/${id}`);
      setProperty(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load property.");
    }
  };

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    if (!booking.checkIn || !booking.checkOut || !property) return 0;

    const start = new Date(booking.checkIn);
    const end = new Date(booking.checkOut);

    const nights = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    if (nights <= 0) return 0;

    return nights * property.price;
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    try {
      const totalPrice = calculateTotal();

      await api.post(
        "/bookings",
        {
          accommodation: property._id,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          guests: booking.guests,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking created!");

      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      toast.error("Booking failed.");
    }
  };

  if (!property) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <img
        src={
          property.images?.[0] ||
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
        }
        alt={property.title}
        style={{
          width: "100%",
          height: "450px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />

      <h1>{property.title}</h1>

      <p>{property.location}</p>

      <h2>R {property.price} / night</h2>

      <p>{property.description}</p>

      <hr />

      <h2>Book this property</h2>

      <div
        style={{
          display: "grid",
          gap: "15px",
          maxWidth: "400px",
        }}
      >
        <input
          type="date"
          name="checkIn"
          value={booking.checkIn}
          onChange={handleChange}
        />

        <input
          type="date"
          name="checkOut"
          value={booking.checkOut}
          onChange={handleChange}
        />

        <input
          type="number"
          name="guests"
          min="1"
          value={booking.guests}
          onChange={handleChange}
        />

        <h3>Total: R {calculateTotal()}</h3>

        <button
          onClick={handleBooking}
          style={{
            background: "#ff385c",
            color: "white",
            padding: "15px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Reserve
        </button>
      </div>
    </div>
  );
}

export default PropertyDetails;
