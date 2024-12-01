import React, { useState } from "react";
import axios from "axios";

const RiskCheckForm = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/flood/check", {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
      setResult(response.data);
    } catch (err) {
      setError("Could not fetch flood risk data. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Check Flood Risk</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <button type="submit">Check Risk</button>
      </form>

      {result && (
        <div>
          <h3>Flood Risk Result:</h3>
          <p>Severity: {result.severity}</p>
          <p>Probability: {result.probability}%</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RiskCheckForm;
