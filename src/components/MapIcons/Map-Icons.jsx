// src/components/Map/map-icons.js
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Hotel (morado)
export const hotelIcon = L.icon({
  iconUrl: "/icons/marker-purple.png",
  shadowUrl: iconShadow,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

// Usuario (verde)
export const userIcon = L.icon({
  iconUrl: "/icons/marker-green.png",
  shadowUrl: iconShadow,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

// Puntos de interés (blanco y morado)
export const poiIcon = L.icon({
  iconUrl: "/icons/marker-white-purple.png",
  shadowUrl: iconShadow,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});
