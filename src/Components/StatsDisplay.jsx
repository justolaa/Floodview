// src/components/StatsDisplay.jsx
import React from 'react';
import { floodStatistics } from '../data/statistics';

const StatsDisplay = ({ returnPeriod, drainageScenario }) => {
    // Safely get the statistics for the current selection
    const stats = floodStatistics[returnPeriod]?.[drainageScenario];

    if (!stats) {
        return null; // Don't render anything if there's no data for the selection
    }

    return (
        <div className=" bg-white bg-opacity-90 p-4 rounded-md shadow-lg z-20 w-64">
            <h3 className="text-lg font-bold mb-2 border-b pb-1">Scenario Statistics</h3>
            <div className="space-y-2 text-sm">
                <div>
                    <span className="font-semibold">Total Flooded Area:</span>
                    <span className="float-right font-mono">{stats.area_sqkm.toFixed(1)} km²</span>
                </div>
                {/* Conditionally render buildings affected if the data exists */}
                {stats.buildings_affected !== undefined && (
                     <div>
                        <span className="font-semibold">Buildings Affected:</span>
                        <span className="float-right font-mono">{stats.buildings_affected.toLocaleString()}</span>
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
                Estimates are based on the {returnPeriod}-year return period with {drainageScenario} drains.
            </p>
        </div>
    );
};

export default StatsDisplay;