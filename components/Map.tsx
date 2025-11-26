
import React, { useEffect, useRef, useState } from 'react';

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; title?: string; icon?: string }>;
  showDirections?: boolean;
  origin?: { lat: number; lng: number } | string;
  destination?: { lat: number; lng: number } | string;
}

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }
];

const Map: React.FC<MapProps> = ({ center, zoom = 14, markers = [], showDirections, origin, destination }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any | null>(null);
  const directionsService = useRef<any | null>(null);
  const directionsRenderer = useRef<any | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!map) {
      if (typeof google === 'undefined') return;
      const initialMap = new google.maps.Map(mapRef.current, {
        center: center || { lat: 40.7128, lng: -74.0060 }, // Default NYC
        zoom: zoom,
        styles: darkMapStyle,
        disableDefaultUI: true,
      });
      setMap(initialMap);

      if (showDirections) {
        directionsService.current = new google.maps.DirectionsService();
        directionsRenderer.current = new google.maps.DirectionsRenderer({
          map: initialMap,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: "#f4d125",
            strokeWeight: 5,
          }
        });
      }
    }
  }, [mapRef, map, showDirections, center, zoom]);

  // Update Markers
  useEffect(() => {
    if (map && markers.length > 0) {
      markers.forEach(markerData => {
        new google.maps.Marker({
          position: { lat: markerData.lat, lng: markerData.lng },
          map: map,
          title: markerData.title,
          icon: markerData.icon
        });
      });
    }
  }, [map, markers]);

  // Update Directions
  useEffect(() => {
    if (map && showDirections && origin && destination && directionsService.current && directionsRenderer.current) {
      directionsService.current.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.current?.setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      });
    }
  }, [map, showDirections, origin, destination]);

  // Update Center
  useEffect(() => {
    if(map && center) {
        map.panTo(center);
        map.setZoom(zoom);
    }
  }, [center, zoom, map]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default Map;
