import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyWishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeWishlist = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchWishlist();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="listings-container">
      <h1> My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h3>No saved properties.</h3>
      ) : (
        <div className="listing-grid">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="listing-card"
            >
              <img
                className="listing-image"
                src={
                  item.accommodation.images?.[0] ||
                  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
                }
                alt={item.accommodation.title}
              />

              <div className="listing-content">
                <h2>{item.accommodation.title}</h2>

                <p>{item.accommodation.location}</p>

                <h3>
                  R {item.accommodation.price} / night
                </h3>

                <div className="button-group">
                  <Link
                    to={`/property/${item.accommodation._id}`}
                  >
                    <button className="edit-btn">
                      View
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      removeWishlist(item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyWishlist;