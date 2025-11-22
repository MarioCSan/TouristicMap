import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "../../App.css";

import Routing from "../Routing/Routing.jsx";
import { POIMarkers, UserMarker } from "../Markers/Markers.jsx";
import pois from "../../data/praga-pois.json";

export default function Map() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [destination, setDestination] = useState(null);
  const [eta, setEta] = useState(null);
  const [showPOIModal, setShowPOIModal] = useState(false);

  const mapRef = useRef();

  // Obtener ubicación del usuario
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watch = navigator.geolocation.watchPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watch);
  }, []);

  // Centrar y hacer zoom al POI seleccionado
  useEffect(() => {
    if (selectedPOI && mapRef.current) {
      setShowPOIModal(true);
      mapRef.current.flyTo(selectedPOI.coords, 16, { duration: 0.5 });
    }
  }, [selectedPOI]);

  // Centrar en el POI al cerrar la ruta
  useEffect(() => {
    if (!destination && selectedPOI && mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current.flyTo(selectedPOI.coords, 16, { duration: 0.5 });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [destination, selectedPOI]);

  return (
    <div className="map-container">
      <MapContainer
        center={[50.087, 14.4208]}
        zoom={13}
        className="leaflet-map"
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <POIMarkers
          pois={pois}
          setSelectedPOI={(poi) => {
            setSelectedPOI(poi);
            setShowPOIModal(true);
          }}
        />
        <UserMarker position={userLocation} />
        {destination && (
          <Routing
            userLocation={userLocation}
            destination={destination}
            setEta={setEta}
          />
        )}
      </MapContainer>

      {/* Modal POI */}
      {selectedPOI && (
        <div className={`poi-modal ${showPOIModal ? "show" : "hide"}`}>
          <div className="poi-header">
            {selectedPOI.name}
            <button className="close-btn" onClick={() => setShowPOIModal(false)}>
              ❌
            </button>
          </div>

          {!destination && (
            <button
              className="start-route-btn"
              onClick={() => {
                if (selectedPOI?.coords) setDestination(selectedPOI.coords);
              }}
            >
              🧭 Iniciar ruta
            </button>
          )}

          {destination && eta && <div className="eta">⏱ Tiempo estimado: {Math.floor(eta / 60)}h {eta % 60}m</div>}

          {destination && (
            <button
              className="close-route-btn"
              onClick={() => {
                setDestination(null);
                setShowPOIModal(true);
              }}
            >
              ❌ Cerrar ruta
            </button>
          )}
        </div>
      )}
    </div>
  );
}
