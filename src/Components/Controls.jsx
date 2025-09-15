// src/components/Controls.jsx

import React from 'react';

const Controls = ({ returnPeriod, setReturnPeriod, drainageScenario, setDrainageScenario,
  isComparing, setIsComparing,
    disableControls, onAboutClick 
 }) => {
  return (
    <div className="absolute top-0 left-0 w-full bg-white bg-opacity-90 p-4 z-20 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Surulere Flood Hazard Map</h1>
        
        <div className="flex items-center space-x-4">
          {/* Return Period Dropdown */}
          <div>
            <label htmlFor="return-period" className="block text-sm font-medium text-gray-700">
              Return Period
            </label>
            <select
              id="return-period"
              name="return-period"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={returnPeriod}
              onChange={(e) => setReturnPeriod(e.target.value)}
            >
              <option value="25">25-Year</option>
              <option value="100">100-Year</option>
              {/* Add more options here as you create more maps */}
            </select>
          </div>

          {/* Drainage Scenario Dropdown */}
          {!isComparing && (
          <div>
            
            <label htmlFor="drainage-scenario" className="block text-sm font-medium text-gray-700">
              Drainage Scenario
            </label>
            <select
              id="drainage-scenario"
              name="drainage-scenario"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={drainageScenario}
              onChange={(e) => setDrainageScenario(e.target.value)}
            >
              <option value="clear">Clear Drains</option>
              <option value="blocked">Blocked Drains</option>
            </select>
          </div>
           )}
        </div>

        {/* Comparison Toggle Switch */}
        <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Compare (Clear vs Blocked)</span>
            <label htmlFor="compare-toggle" className="inline-flex relative items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    id="compare-toggle" 
                    className="sr-only peer"
                    checked={isComparing}
                    onChange={() => setIsComparing(!isComparing)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            
            {/* About Button - NEW */}
          <button
            onClick={onAboutClick}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 border border-gray-300"
          >
            About
          </button>
        </div>
      </div>

    </div>
  );
};

export default Controls;