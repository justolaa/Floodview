import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import axios from "axios";
import * as L from "leaflet";
import "leaflet.heat";

const HeatmapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      const heat = L.heatLayer(data, { radius: 20 }).addTo(map);

      return () => {
        // Cleanup the heatmap layer when the component unmounts or data updates
        map.removeLayer(heat);
      };
    }
  }, [data, map]);

  return null; // No visual output from this component
};

const HeatmapView = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/heatmap");
        const heatData = response.data.map((report) => [
          report.latitude,
          report.longitude,
          report.severity,
        ]);
        setHeatmapData(heatData);
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
      }
    };

    fetchHeatmapData();
  }, []);

  return (
    <MapContainer center={[6.5244, 3.3792]} zoom={10} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {heatmapData.length > 0 && <HeatmapLayer data={heatmapData} />}
    </MapContainer>
  );
};

export default HeatmapView;
