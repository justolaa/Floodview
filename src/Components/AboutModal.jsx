// src/components/AboutModal.jsx
import React from 'react';

const AboutModal = ({ isOpen, onClose }) => {
    // If the modal is not open, render nothing.
    if (!isOpen) {
        return null;
    }

    return (
        // The modal container: a semi-transparent overlay
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            onClick={onClose} // Close modal if overlay is clicked
        >
            {/* The modal content: stop click propagation to prevent closing when content is clicked */}
            <div 
                className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">About This Project</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    >
                        &times; {/* A simple 'X' for closing */}
                    </button>
                </div>

                <div className="space-y-4 text-gray-700">
                    <p>
                        This application is a GIS-based flood prediction and visualization tool for Surulere, Lagos. It was developed as a final year project to demonstrate the impact of urban planning and waste management on flood risk.
                    </p>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">How to Use the Map</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Select Scenarios:</strong> Use the dropdowns in the header to view predicted flood extents for different rainfall events (Return Periods) and drainage conditions.</li>
                            <li><strong>Compare Scenarios:</strong> Activate the "Compare" toggle to see a side-by-side view of the impact of clear vs. blocked drains for the selected return period.</li>
                            <li><strong>Report Floods:</strong> Click anywhere on the map to submit a real-world flood report. This community-sourced data is crucial for validating and improving the model.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Understanding "Return Periods"</h3>
                        <p>
                            A "100-year" flood does not mean a flood that happens every 100 years. It refers to a flood event that has a 1 in 100 (or 1%) chance of being equaled or exceeded in any given year. Similarly, a "25-year" flood has a 1 in 25 (4%) chance of occurring in any year.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Data Sources</h3>
                        <p>
                            The flood models were created using HEC-RAS, with input data from the Shuttle Radar Topography Mission (SRTM) for elevation, Copernicus Global Land Cover, and CHIRPS rainfall data.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutModal;