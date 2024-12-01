// import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// import UserFeedbackForm from './Pages/FloodReportForm'
// import MapView from './Pages/MapView'
import HeatmapView from './Pages/HeatMap'
function App() {
  return (
    
    <>
   
      {/* <ScrollToTop/> */}
      {/* <ToastContainer /> */}
      {/* <Navbar/> */}
     <div>
      <h1 style={{ textAlign: 'center', margin: '10px 0' }}>Lagos Flood Risk Map</h1>
      {/* <MapView /> */}
      {/* <UserFeedbackForm/> */}
      <HeatmapView/>
    </div>
    </>
  )
}

export default App
