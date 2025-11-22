import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "leaflet/dist/leaflet.css";
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import L from "leaflet";
import "leaflet.awesome-markers";


import "./components/leaflet-icons.js";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
