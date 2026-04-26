import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useFamily } from '../context/FamilyContext';
import { CITY_COORDINATES } from '../data/initialData';

// Fix Leaflet's default icon path issues with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sub-component to handle zooming to fit all markers
function ZoomToFit({ cityGroups }) {
  const map = useMap();
  
  const handleZoomToFit = () => {
    const coords = Object.values(cityGroups).map(group => CITY_COORDINATES[group[0].city]);
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  return (
    <div className="map-controls">
      <button className="map-control-btn" onClick={handleZoomToFit} title="Zoom to fit all members">
        🔍 Fit All
      </button>
    </div>
  );
}

export default function MapView({ searchResults }) {
  const members = searchResults;

  // Group members by city
  const cityGroups = members.reduce((acc, member) => {
    if (member.city && CITY_COORDINATES[member.city]) {
      if (!acc[member.city]) acc[member.city] = [];
      acc[member.city].push(member);
    }
    return acc;
  }, {});

  return (
    <div className="map-view-container">
      <div className="map-header">
        <h2>🗺️ Family Geography</h2>
        <p>See where our family members are spread across India!</p>
      </div>
      
      <div className="map-wrapper" style={{ position: 'relative' }}>
        <MapContainer 
          center={[23.5, 86.0]} 
          zoom={6} 
          scrollWheelZoom={true} 
          style={{ height: '600px', width: '100%', borderRadius: '16px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          <ZoomToFit cityGroups={cityGroups} />
          
          {Object.keys(cityGroups).map(city => {
            const coords = CITY_COORDINATES[city];
            const cityMembers = cityGroups[city];
            
            // Custom icon with number of people
            const customIcon = L.divIcon({
              className: 'custom-map-marker',
              html: `<div class="marker-pin"></div><span class="marker-count">${cityMembers.length}</span>`,
              iconSize: [30, 42],
              iconAnchor: [15, 42],
            });

            return (
              <Marker key={city} position={coords} icon={customIcon}>
                <Popup className="custom-popup">
                  <h3>📍 {city}</h3>
                  <div className="popup-members">
                    {cityMembers.map(m => (
                      <div key={m.id} className="popup-member">
                        <div className="popup-avatar" style={{ background: `var(--gen-${m.gen === 'me' ? 'sib' : m.gen}-bg)` }}>
                          {m.photo ? <img src={m.photo} alt={m.name} /> : m.initials}
                        </div>
                        <span>{m.name}</span>
                      </div>
                    ))}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
