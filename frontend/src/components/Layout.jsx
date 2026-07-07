import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/dashboard.css";

function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>Airbnb Admin</h2>

        <Link to="/dashboard">
            <FaHome /> Dashboard
        </Link>

        <Link to="/create-listing">
            <FaPlus /> Create Listing
        </Link>

        <Link to="/listings">
            <FaList /> Listings
        </Link>

        <Link to="/my-bookings">My Bookings</Link>

        <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt /> Logout
        </button>
        </div>
      <div className="main">
        <div className="topbar">
          <h2>Admin Dashboard</h2>

          <div>
            {JSON.parse(localStorage.getItem("user"))?.username}
          </div>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;