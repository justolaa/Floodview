// src/components/ComparisonMap.jsx

import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// The bounds should be the same for both maps
const surulereBounds = [
    [6.45, 3.32], // Southwest corner - USE YOUR ACCURATE ONES
    [6.55, 3.42]  // Northeast corner - USE YOUR ACCURATE ONES
];
const surulereCenter = [6.498, 3.359];

const ComparisonMap = ({ leftLayerUrl, rightLayerUrl }) => {
    const [sliderPosition, setSliderPosition] = useState(50); // Initial position at 50%
    const rightMapRef = useRef();
    const leftMapRef = useRef();

    // This effect syncs the movement of the two maps
    useEffect(() => {
        if (!leftMapRef.current || !rightMapRef.current) return;

        const leftMap = leftMapRef.current;
        const rightMap = rightMapRef.current;

        leftMap.sync(rightMap);
        rightMap.sync(leftMap);

        // Cleanup function to unsync the maps
        return () => {
            leftMap.unsync(rightMap);
            rightMap.unsync(leftMap);
        };
    }, []);

    return (
        <div className="relative w-full h-full">
            {/* Bottom Map (Right Layer) */}
            <MapContainer
                ref={rightMapRef}
                center={surulereCenter}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false} // Disable zoom control on this map
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ImageOverlay url={rightLayerUrl} bounds={surulereBounds} opacity={0.7} />
            </MapContainer>

            {/* Top Map (Left Layer) - This one is clipped */}
            <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <MapContainer
                    ref={leftMapRef}
                    center={surulereCenter}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    attributionControl={false} // Disable attribution on this map
                    zoomControl={false}
                    scrollWheelZoom={false}
                    dragging={false}
                    doubleClickZoom={false}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ImageOverlay url={leftLayerUrl} bounds={surulereBounds} opacity={0.7} />
                </MapContainer>
            </div>

            {/* The Slider Control */}
            <div
                className="absolute top-0 h-full z-10"
                style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
                <div className="h-full w-1 bg-white shadow-lg"></div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(e.target.value)}
                    className="absolute top-0 h-full w-full opacity-0 cursor-ew-resize"
                    style={{ transform: 'translateX(-50%)' }}
                />
            </div>
        </div>
    );
};

export default ComparisonMap;