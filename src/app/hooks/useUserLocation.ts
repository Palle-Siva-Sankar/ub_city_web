import { useEffect, useState } from "react";

type LocationState = {
  city: string;
  region: string;
  loading: boolean;
  error: string | null;
};

const DEFAULT_LOCATION = { city: "Bengaluru", region: "Karnataka" };
const LOCATION_CACHE_KEY = "mall_user_location";
const LOCATION_CACHE_TTL_MS = 1000 * 60 * 60 * 6;

type CachedLocation = {
  city: string;
  region: string;
  updatedAt: number;
};

function readCachedLocation(): CachedLocation | null {
  try {
    const raw = localStorage.getItem(LOCATION_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedLocation;
    if (!parsed.city || !parsed.region || !parsed.updatedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useUserLocation() {
  const [state, setState] = useState<LocationState>(() => {
    const cached = readCachedLocation();
    if (cached) {
      return { city: cached.city, region: cached.region, loading: false, error: null };
    }
    return {
      city: DEFAULT_LOCATION.city,
      region: DEFAULT_LOCATION.region,
      loading: true,
      error: null,
    };
  });

  useEffect(() => {
    const cached = readCachedLocation();
    const hasFreshCache = cached && Date.now() - cached.updatedAt < LOCATION_CACHE_TTL_MS;
    if (hasFreshCache) return;

    if (!navigator.geolocation) {
      setState((prev) => ({ ...prev, loading: false, error: "Geolocation not supported" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
          );
          const data = await response.json();
          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            DEFAULT_LOCATION.city;
          const region = data?.address?.state || DEFAULT_LOCATION.region;
          localStorage.setItem(
            LOCATION_CACHE_KEY,
            JSON.stringify({ city, region, updatedAt: Date.now() } as CachedLocation),
          );
          setState({ city, region, loading: false, error: null });
        } catch {
          setState((prev) => ({ ...prev, loading: false, error: "Unable to fetch location details" }));
        }
      },
      () => {
        setState((prev) => ({ ...prev, loading: false, error: "Location permission denied" }));
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 300000 },
    );
  }, []);

  const setManualLocation = (city: string, region: string) => {
    localStorage.setItem(
      LOCATION_CACHE_KEY,
      JSON.stringify({ city, region, updatedAt: Date.now() } as CachedLocation),
    );
    setState({ city, region, loading: false, error: null });
  };

  return { ...state, setManualLocation };
}

