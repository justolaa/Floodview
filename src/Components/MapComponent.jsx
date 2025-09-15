// src/components/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue with Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
// End of icon fix

const surulereBounds = [
    [6.45, 3.32], // Southwest corner - USE YOUR ACCURATE ONES
    [6.55, 3.42]  // Northeast corner - USE YOUR ACCURATE ONES
];

const surulereCenter = [6.498, 3.359];

// A new component to handle map events like clicks
const MapEventsHandler = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            // When map is clicked, call the passed-in handler function
            onMapClick(e.latlng);
        },
    });
    return null; // This component doesn't render anything itself
};

// Update the component to accept onMapClick and userReports
const MapComponent = ({ mapUrl, onMapClick, userReports }) => {
  return (
    <MapContainer 
        center={surulereCenter} 
        zoom={13} 
        style={{ height: '100vh', width: '100%' }}
        //key={mapUrl}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
 <ImageOverlay url={mapUrl} bounds={surulereBounds} opacity={0.7} key={mapUrl} />

      {/* Map over the userReports array and create a Marker for each one */}
      {userReports.map(report => (
        <Marker key={report._id} position={[report.latitude, report.longitude]}>
          <Popup>
            <b>Severity: {report.severity}</b><br />
            {report.description && `Description: ${report.description}`}<br />
            <small>Reported: {new Date(report.reportedAt).toLocaleString()}</small>
          </Popup>
        </Marker>
      ))}

        <MapEventsHandler onMapClick={onMapClick} />
      
      
    </MapContainer>
  );
};

export default MapComponent;

