import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";

import {
  FaHome,
  FaUsers,
  FaCalendar,
  FaMoneyBillWave,
} from "react-icons/fa";

import StatCard from "../components/StatCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalListings: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    recentListings: [],
    recentBookings: [],
    topProperties: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/accommodations/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const revenueData = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Revenue (R)",
        data: [stats.totalRevenue],
        backgroundColor: "#ff385c",
      },
    ],
  };

  const bookingData = {
    labels: ["Bookings"],
    datasets: [
      {
        label: "Bookings",
        data: [stats.totalBookings],
        borderColor: "#008489",
        backgroundColor: "#008489",
      },
    ],
  };

  return (
    <div className="dashboard">

      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <StatCard
          title="Total Listings"
          value={stats.totalListings}
          icon={<FaHome />}
          color="#ff385c"
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers />}
          color="#008489"
        />

        <StatCard
          title="Bookings"
          value={stats.totalBookings}
          icon={<FaCalendar />}
          color="#f7b500"
        />

        <StatCard
          title="Revenue"
          value={`R ${stats.totalRevenue}`}
          icon={<FaMoneyBillWave />}
          color="#2ecc71"
        />
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h2>Revenue</h2>
          <Bar data={revenueData} />
        </div>

        <div className="chart-card">
          <h2>Bookings</h2>
          <Line data={bookingData} />
        </div>
      </div>

      <div className="table-card">
        <h2>Recent Listings</h2>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentListings.map((listing) => (
              <tr key={listing._id}>
                <td>{listing.title}</td>
                <td>{listing.location}</td>
                <td>R {listing.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card">
        <h2>Recent Bookings</h2>

        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>User</th>
              <th>Total</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.accommodation?.title || "N/A"}</td>

                <td>{booking.user?.username || "N/A"}</td>

                <td>R {booking.totalPrice}</td>

                <td>
                  {booking.paymentStatus === "Paid" ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      Paid
                    </span>
                  ) : (
                    <span style={{ color: "orange", fontWeight: "bold" }}>
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card">
        <h2>Top Booked Properties</h2>

        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Bookings</th>
            </tr>
          </thead>

          <tbody>
            {stats.topProperties.length > 0 ? (
              stats.topProperties.map((property, index) => (
                <tr key={index}>
                  <td>{property.title}</td>
                  <td>{property.bookings}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No booking data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;