// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import MapComponent from './Components/MapComponent';
import Controls from './Components/Controls';
import ReportForm from './Components/ReportForm'; // Import the new form
import StatsDisplay from './Components/StatsDisplay';
import ComparisonMap from './Components/ComparisonMap';
import AboutModal from './Components/AboutModal';
import Legend from './Components/Legend';
import Preloader from './Components/Preloader';
import './App.css';

// We need the bounds here to pass to the side-by-side control
const surulereBounds = [
    [6.45, 3.32], // Southwest corner - USE YOUR ACCURATE ONES
    [6.55, 3.42]  // Northeast corner - USE YOUR ACCURATE ONES
];
 

function App() {
  // --- New State for Preloader ---
  // It starts as 'true' and we will set it to 'false' after a delay.
  const [isLoading, setIsLoading] = useState(true);
  // State to hold the current selections
  const [returnPeriod, setReturnPeriod] = useState('100'); // Default to 100-year
  const [drainageScenario, setDrainageScenario] = useState('blocked'); // Default to blocked
  

  const [reportLocation, setReportLocation] = useState(null); // Holds {lat, lng} for the form
  const [userReports, setUserReports] = useState([]); // Holds all reports from the DB
// --- New State for Comparison Mode ---
  const [isComparing, setIsComparing] = useState(false); // Is comparison mode active?
  // For simplicity, let's hardcode the comparison: Clear vs Blocked for the selected return period.
  // A more advanced version could have dropdowns for both sides.
   // Fetch existing reports when the app loads
   const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

   // This useEffect will run only once when the App component first mounts.
  useEffect(() => {
    // Set a timer to simulate loading and give the user time to read the title.
    const timer = setTimeout(() => {
      setIsLoading(false); // This will trigger the preloader animation
    }, 2500); // 2.5 seconds

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // The empty array [] ensures this effect runs only once.

   useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reports`);
        setUserReports(response.data);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }
    };
    fetchReports();
  }, []); // Empty dependency array means this runs once on component mount

  const handleMapClick = (latlng) => {
    console.log("Map clicked at:", latlng);
    setReportLocation(latlng);
  };

  const handleCloseForm = () => {
    setReportLocation(null);
  };

  const handleReportSubmitted = (newReport) => {
    // Add the new report to our state so it appears on the map immediately
    setUserReports(prevReports => [newReport, ...prevReports]);
  };
  // Generate the URL for the map image based on current state
  // This makes it easy to manage all the map layers
  const currentMapUrl = `/${returnPeriod}yr_${drainageScenario}_depth.png`;

// --- Generate URLs based on state ---
  const singleMapUrl = `/${returnPeriod}yr_${drainageScenario}_depth.png`;
  
  // Define the two layers for comparison
  const leftLayer = useMemo(() => ({
      url: `/${returnPeriod}yr_clear_depth.png`,
      bounds: surulereBounds
  }), [returnPeriod]); // The dependency array: only recreate if returnPeriod changes

  const rightLayer = useMemo(() => ({
      url: `/${returnPeriod}yr_blocked_depth.png`,
      bounds: surulereBounds
  }), [returnPeriod]); // The dependency array: only recreate if returnPeriod changes


  return (
    <>
      <Preloader isLoading={isLoading} />

      {/* This div wraps your entire main application */}
      {/* We make it fade in smoothly as the preloader disappears */}
      <div 
        className={`App relative h-screen w-screen transition-opacity duration-500
           ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <Controls 
          returnPeriod={returnPeriod}
        setReturnPeriod={setReturnPeriod}
        drainageScenario={drainageScenario}
        setDrainageScenario={setDrainageScenario}
        isComparing={isComparing} // Pass down the state
        setIsComparing={setIsComparing} // Pass down the setter
        // Disable dropdowns when in comparison mode to avoid confusion
        disableControls={isComparing} 
        // Pass the function to open the modal
        onAboutClick={() => setIsAboutModalOpen(true)}
        />
        
        <div className="absolute top-0 left-0 w-full h-full z-0">
          {isComparing ? (
                <ComparisonMap 
                    leftLayerUrl={leftLayer.url}
                    rightLayerUrl={rightLayer.url}
                />
            ) : (
                <MapComponent 
                    mapUrl={singleMapUrl} 
                    userReports={userReports}
                    onMapClick={handleMapClick}
                />
            )}
        </div>
        
        <ReportForm 
          location={reportLocation}
                onClose={handleCloseForm}
                onReportSubmitted={handleReportSubmitted}
        />
        
        {!isComparing && (
        <div className="absolute bottom-4 left-4 z-20 flex flex-col space-y-2">
          <Legend />
          <StatsDisplay
            returnPeriod={returnPeriod}
            drainageScenario={drainageScenario}
          />
        </div>
      )}
        
        {/* Render the About Modal */}

      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
      </div>
    </>  
  );
}

export default App;