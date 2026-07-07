import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    guests: "",
    type: "",
    price: "",
  });

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const res = await api.get(`/accommodations/${id}`);
      setFormData(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load listing.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(`/accommodations/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Listing updated successfully!");
      navigate("/listings");
    } catch (error) {
      console.error(error);
      alert("Failed to update listing.");
    }
  };

  return (
    <div>
      <h1>Edit Listing</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="bathrooms"
          type="number"
          placeholder="Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="guests"
          type="number"
          placeholder="Guests"
          value={formData.guests}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditListing;