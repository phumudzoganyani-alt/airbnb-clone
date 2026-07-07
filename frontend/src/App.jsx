import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import PropertyDetails from "./pages/PropertyDetails";
import MyBookings from "./pages/MyBookings";
import MyWishlist from "./pages/MyWishlist";
import Payment from "./pages/Payment";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Routes>

      {/* =PUBLIC ROUTES =*/}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/listings" element={<Listings />} />

      <Route
        path="/property/:id"
        element={<PropertyDetails />}
      />

      {/* = PROTECTED ROUTES = */}

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-listing"
          element={<CreateListing />}
        />

        <Route
          path="/edit/:id"
          element={<EditListing />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/wishlist"
          element={<MyWishlist />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
           path="/admin/login"
           element={<AdminLogin />}
        />
      </Route>

    </Routes>
  );
}

export default App;