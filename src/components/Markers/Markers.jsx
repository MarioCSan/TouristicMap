// src/components/Markers/Markers.jsx
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "font-awesome/css/font-awesome.min.css"; // Asegúrate de tenerlo instalado
import "../../App.css"; // Para estilos adicionales de los globos

// Función para crear un marcador tipo globo con icono y color personalizado
const createCustomMarker = (color, iconName = "map-marker") =>
  L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background:${color};
        width:32px;
        height:32px;
        border-radius:50%;
        display:flex;
        justify-content:center;
        align-items:center;
        border:2px solid white;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        position: relative;
      ">
        <i class="fa fa-${iconName}" style="color:white;"></i>
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid ${color};
        "></div>
      </div>
    `,
    iconSize: [32, 40], // ancho x alto total incluyendo pico
    iconAnchor: [16, 40], // ancla del marcador al mapa
    popupAnchor: [0, -40],
  });

// Mapeo de categorías a iconos y colores
const categoryIcons = {
  "histórico": createCustomMarker("#FF0000", "map-marker"), // rojo
  "histórico/fotogénico": createCustomMarker("#FFA500", "map-marker"), // naranja
  "mirador": createCustomMarker("#800080", "binoculars"), // morado
  "mirador/fotogénico": createCustomMarker("#4B0082", "binoculars"), // índigo oscuro
  "paisajístico/fotogénico": createCustomMarker("#008000", "tree"), // verde
  "arte/fotogénico": createCustomMarker("#FF69B4", "paint-brush"), // rosa
  "mercado/navideño": createCustomMarker("#5F9EA0", "shopping-cart"), // cadetblue
  "histórico/comercial": createCustomMarker("#A52A2A", "map-marker"), // marrón
  "moderno/fotogénico": createCustomMarker("#0000FF", "building"), // azul
  "hotel": createCustomMarker("#F52798", "hotel"), // fucsia
  default: createCustomMarker("#808080", "map-marker"), // gris
};

export function POIMarkers({ pois, setSelectedPOI }) {
  return pois.map((p, i) => (
    <Marker
      key={i}
      position={p.coords}
      icon={categoryIcons[p.category] || categoryIcons.default}
      eventHandlers={{
        click: () => setSelectedPOI(p),
      }}
    >
      <Popup>
        <strong>{p.name}</strong>
        <br />
        {p.category}
      </Popup>
    </Marker>
  ));
}

export function UserMarker({ position }) {
  if (!position) return null;

  const userIcon = createCustomMarker("#00FF00", "user"); // verde

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>Tu ubicación</Popup>
    </Marker>
  );
}
