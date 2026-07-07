import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          textAlign: "center",
        }}
      >
        <h2>No booking selected.</h2>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/bookings/${booking._id}/pay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Payment successful!");

      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      toast.error("Payment failed.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>Mock Payment</h1>

      <hr />

      <p>
        <strong>Property:</strong>{" "}
        {booking.accommodation?.title}
      </p>

      <p>
        <strong>Total Amount:</strong> R{" "}
        {booking.totalPrice}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {booking.paymentStatus}
      </p>

      <button
        onClick={handlePayment}
        style={{
          width: "100%",
          padding: "15px",
          background: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "8px",
          marginTop: "20px",
          fontSize: "16px",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;