// src/components/Routing/Routing.jsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

export default function Routing({ userLocation, destination, setEta }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return; // seguridad
    if (!userLocation || !destination) return; // nada que mostrar

    // Crear la ruta
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      lineOptions: { styles: [{ color: "#007AFF", weight: 5 }] },
      createMarker: () => null, // usamos nuestros propios marcadores
    }).addTo(map);

    // Calcular tiempo estimado
    routingControl.on("routesfound", function (e) {
      const route = e.routes[0];
      const durationMin = Math.round(route.summary.totalTime / 60);
      setEta(durationMin);
    });

    return () => {
      map.removeControl(routingControl); // limpiar al desmontar
      setEta(null); // limpiar ETA al cerrar
    };
  }, [map, userLocation, destination, setEta]);

  return null;
}
