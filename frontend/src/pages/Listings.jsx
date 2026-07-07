import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await api.get("/accommodations");
      setListings(res.data);
    } catch (error) {
      console.error("Error loading listings:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "36px",
          fontWeight: "700",
        }}
      >
        Available Stays
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
        {listings.map((listing) => (
          <Link
            key={listing._id}
            to={`/property/${listing._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 25px rgba(0,0,0,.08)",
                transition: "0.3s",
              }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <img
                  src={
                    listing.images?.length > 0
                      ? listing.images[0]
                      : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
                  }
                  alt={listing.title}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    background: "#fff",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Guest Favourite
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    fontSize: "24px",
                  }}
                >
                  🤍
                </div>
              </div>

              <div
                style={{
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "22px",
                      margin: 0,
                    }}
                  >
                    {listing.title}
                  </h2>

                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    ⭐ 4.9
                  </span>
                </div>

                <p
                  style={{
                    color: "#777",
                    marginTop: "10px",
                  }}
                >
                   {listing.location}
                </p>

                <p
                  style={{
                    color: "#777",
                  }}
                >
                   {listing.guests} Guests • 🛏 {listing.bedrooms} Bedrooms
                </p>

                <h2
                  style={{
                    color: "#ff385c",
                    marginTop: "20px",
                  }}
                >
                  R {listing.price}
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      fontWeight: "normal",
                    }}
                  >
                    {" "}
                    / night
                  </span>
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Listings;