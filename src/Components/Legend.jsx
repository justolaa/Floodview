// src/components/Legend.jsx
import React from 'react';

// IMPORTANT: Update this array with your data from QGIS
const legendItems = [
    {
        color: '#A6CEE3', // Example Light Blue Hex Code
        label: '0.1 - 0.5 m',
    },
    {
        color: '#1F78B4', // Example Medium Blue Hex Code
        label: '0.5 - 1.5 m',
    },
    {
        color: '#08306B', // Example Dark Blue Hex Code
        label: '> 1.5 m',
    },
];

const Legend = () => {
    return (
        <div className="bg-white bg-opacity-90 p-4 rounded-md shadow-lg w-64">
            <h3 className="text-lg font-bold mb-2 border-b pb-1">Flood Depth Legend</h3>
            <div className="space-y-2">
                {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                        {/* The colored square */}
                        <div 
                            className="w-5 h-5 mr-3 border border-gray-400"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        {/* The text label */}
                        <span className="text-sm">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Legend;