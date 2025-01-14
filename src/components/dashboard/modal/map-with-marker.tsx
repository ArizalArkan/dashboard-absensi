/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client'; // khusus Next.js 13+ agar file ini bersifat client component

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Untuk memperbaiki icon bawaan leaflet di Next.js
// Pastikan Anda memiliki file leafet marker icon, atau gunakan CDN.
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = defaultIcon;

interface Props{
  position: { lat: number; lng: number };
};

export default function MapWithMarker({ position }: Props) {
  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={16}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[position.lat, position.lng]}>
        <Popup>
          Anda berada di <br /> Lat: {position.lat}, Lng: {position.lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
