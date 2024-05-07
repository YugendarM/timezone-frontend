import React from 'react'
import HomePageComponent from './Components/HomePageComponent/HomePageComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TimePageComponent from './Components/TimePageComponent/TimePageComponent'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageComponent/>}/>
        <Route path="/display" element={<TimePageComponent/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
