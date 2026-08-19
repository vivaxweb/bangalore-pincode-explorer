import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Pure HTML/CSS marker instead of image to fix broken icons
const createDotIcon = (isActive) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="custom-dot-marker ${isActive ? 'active-marker' : ''}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10]
  });
};

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

const MapView = ({ results, selectedPincode, onMarkerClick }) => {
  const center = [12.9716, 77.5946];

  return (
    <MapContainer 
      center={center} 
      zoom={12} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      {/* Light Theme Map Tile (Positron) */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
      />
      
      <MapEffect selectedPincode={selectedPincode} />

      {results.map((item) => {
        if (!item.lat || !item.lng) return null;
        const isActive = selectedPincode && selectedPincode.id === item.id;
        
        return (
          <Marker 
            key={item.id} 
            position={[item.lat, item.lng]} 
            icon={createDotIcon(isActive)}
            eventHandlers={{
              click: () => onMarkerClick(item),
            }}
          >
            <Popup>
              <strong>{item.pincode}</strong><br/>
              {item.area}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
};

export default MapView;
