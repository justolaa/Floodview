import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports from the server
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reports");
        const data = await response.json();
        setReports(data); // Store reports in state
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  return (
    <MapContainer center={[6.5244, 3.3792]} zoom={10} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {reports.map((report, idx) => (
        <Marker key={idx} position={[report.latitude, report.longitude]}>
          <Popup>
            <strong>Severity:</strong> {report.severity} <br />
            <strong>Date:</strong> {new Date(report.date).toLocaleDateString()} <br />
            <strong>Comments:</strong> {report.comments || "No comments"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
