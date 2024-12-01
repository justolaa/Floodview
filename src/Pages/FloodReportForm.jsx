import React, { useState } from "react";
import axios from "axios";

const UserFeedbackForm = () => {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    severity: "",
    date: "",
    comments: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/report", formData);
      setMessage(response.data.message);
      setFormData({
        latitude: "",
        longitude: "",
        severity: "",
        date: "",
        comments: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit the report. Please try again.");
    }
  };

  return (
    <div>
      <h2>Submit a Flood Report</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Severity (1-5):</label>
          <input
            type="number"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserFeedbackForm;
