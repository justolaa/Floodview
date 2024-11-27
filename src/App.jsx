import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
function App() {
  return (
    
    <>
   
      {/* <ScrollToTop/> */}
      {/* <ToastContainer /> */}
      {/* <Navbar/> */}
      <Routes>
          <Route path='/' element={<Home/>}></Route> 
    
      </Routes>
    </>
  )
}

export default App
