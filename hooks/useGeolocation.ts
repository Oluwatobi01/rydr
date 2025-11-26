
import { useState, useEffect } from 'react';

interface Coords {
  lat: number;
  lng: number;
}

export const useGeolocation = (defaultLocation: Coords = { lat: 40.7128, lng: -74.0060 }) => {
  const [location, setLocation] = useState<Coords>(defaultLocation);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    };

    const fail = (err: GeolocationPositionError) => {
      console.warn("Error getting location:", err.message);
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  return { location, error };
};
