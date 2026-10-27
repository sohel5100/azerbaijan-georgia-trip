import { itineraryPlaceIds as defaultItineraryPlaceIds } from './trip.js';

export const itineraryStorageKey = 'azerbaijan-georgia-itinerary-place-ids-v1';

export function getItineraryPlaceIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(itineraryStorageKey));
    if (Array.isArray(stored)) return stored;
  } catch {
    // Use the planned list when storage is unavailable or contains invalid data.
  }
  return [...defaultItineraryPlaceIds];
}

export function saveItineraryPlaceIds(ids) {
  try {
    localStorage.setItem(itineraryStorageKey, JSON.stringify([...new Set(ids)]));
  } catch {
    // The page still renders this session's changes even if browser storage is blocked.
  }
}
