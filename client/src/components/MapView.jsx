import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Custom neon marker icon
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzA2YjZkNCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIxIDEwYzAgNy05IDEzLTkgMTNzLTktNi05LTEzYTkgOSAwIDAgMSAxOCAwemIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component to handle map flying when selection changes
const MapEffect = ({ selectedPincode }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedPincode && selectedPincode.lat && selectedPincode.lng) {
      map.flyTo([selectedPincode.lat, selectedPincode.lng], 14, {
        duration: 1.5
      });
    }
  }, [selectedPincode, map]);
  return null;
};

const MapView = ({ results, selectedPincode }) => {
  // Default center (Bangalore)
  const center = [12.9716, 77.5946];

  return (
    <MapContainer 
      center={center} 
      zoom={12} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      {/* CartoDB Dark Matter tile layer for the neon dark mode look */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      <MapEffect selectedPincode={selectedPincode} />

      {results.map((item) => (
        item.lat && item.lng && (
          <Marker 
            key={item.id} 
            position={[item.lat, item.lng]} 
            icon={customIcon}
          >
            <Popup className="custom-popup">
              <strong>{item.pincode}</strong><br/>
              {item.area}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapView;
