import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Contact from './components/Contact.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import About from './components/About-us.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/About" element={<About/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
