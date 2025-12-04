
import { useState, useCallback } from 'react';
import { Coordinates } from '../types';

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getGeolocation = useCallback(() => {
    return new Promise<Coordinates>((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = 'Geolocation is not supported by your browser.';
        setError(errorMsg);
        reject(new Error(errorMsg));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoordinates(newCoords);
          setError(null);
          resolve(newCoords);
        },
        () => {
          const errorMsg = 'Unable to retrieve your location. Please enable location services.';
          setError(errorMsg);
          setCoordinates(null);
          reject(new Error(errorMsg));
        }
      );
    });
  }, []);

  return { coordinates, error, getGeolocation };
};
