import { excursionOptions, itineraryDays, places, stayAreas, trip } from '../data/trip.js';
import { formatDate, pageHeader, icon } from '../components/shared.js';
import { getItineraryPlaceIds } from '../data/itinerary-state.js';

const activitySymbols = { transfer: '↗', rest: 'Zz', stroll: '✦', walk: '↗', meal: '✳' };

export function renderItinerary() {
  const activeIds = getItineraryPlaceIds();
  const placeById = new Map(places.map(place => [place.id, place]));
  const scheduledIds = itineraryDays.flatMap(day => (day.stops || []).map(stop => stop.placeId).filter(Boolean));
  const timeline = itineraryDays.map((day, index) => {
    const stops = (day.stops || []).filter(stop => !stop.placeId || activeIds.includes(stop.placeId)).map(stop => {
      const place = stop.placeId ? placeById.get(stop.placeId) : null;
      return `<article class="timed-stop ${place ? '' : 'non-place-stop'}">${place?.image ? `<img class="timed-stop-image" src="${place.image}" alt="${place.imageAlt || place.name}" loading="lazy">` : `<span class="timed-stop-art activity-${stop.type || 'activity'}"><span class="activity-symbol" aria-hidden="true">${activitySymbols[stop.type] || '✳'}</span><small>${stop.typeLabel || 'ACTIVITY'}</small></span>`}<div class="timed-stop-copy"><p class="timed-stop-time">${stop.time} · Baku local time</p><h3>${stop.title}</h3><p>${stop.note}</p>${place ? `<a class="text-link" href="#places" data-page="places">Place details ↗</a>` : ''}</div>${place ? `<button type="button" class="itinerary-toggle is-added" data-itinerary-action="remove" data-place-id="${place.id}" aria-label="Remove ${place.name} from itinerary">Remove</button>` : ''}</article>`;
    }).join('');
    return `<article class="timeline-day"><div class="timeline-rail"><span class="timeline-number">${String(index + 1).padStart(2, '0')}</span><i></i></div><div class="timeline-card"><div class="timeline-meta"><span class="tag">${day.label}</span><span>${formatDate(day.date)}</span></div><div class="timeline-content"><div><h2>${day.title}</h2><p class="muted">${day.note}</p></div><span class="city-chip">${icon('pin')}${day.city}</span></div>${stops ? `<div class="timed-stop-list">${stops}</div>` : ''}</div></article>`;
  }).join('');
  const stayInfo = stayAreas.map(stay => `<article class="stay-area-card"><span class="itinerary-place-pin">${icon('pin')}</span><div><p class="eyebrow">YOUR STAY AREA · ${stay.city.toUpperCase()}</p><h2>${stay.area}</h2><p class="muted">${stay.note}</p></div><a class="text-link" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stay.area}, ${stay.city}, Azerbaijan`)}">Open in Google Maps ↗</a></article>`).join('');
  const excursions = excursionOptions.map(option => {
    const gallery = (option.placeIds || []).map(id => placeById.get(id)).filter(Boolean).map(place => `<div><img src="${place.image}" alt="${place.imageAlt}" loading="lazy"><span>${place.name}</span></div>`).join('');
    const schedule = option.schedule?.length ? `<ul class="excursion-schedule">${option.schedule.map(item => `<li>${item}</li>`).join('')}</ul>` : '';
    return `<section class="excursion-card"><div class="excursion-heading"><span class="itinerary-place-pin">${icon('pin')}</span><div><p class="eyebrow">FLEXIBLE DAY-TRIP OPTION</p><h2>${option.title}</h2><span>${option.area}</span></div></div>${gallery ? `<div class="excursion-gallery">${gallery}</div>` : ''}<p>${option.note}</p>${schedule}<p class="excursion-ticket-note">${option.tickets}</p><a class="text-link" href="${option.source}" target="_blank" rel="noreferrer">${option.sourceLabel} ↗</a></section>`;
  }).join('');
  const unscheduledPlaces = places.filter(place => activeIds.includes(place.id) && !scheduledIds.includes(place.id));
  const placeIdeas = unscheduledPlaces.length ? `<section class="itinerary-place-ideas"><div><p class="eyebrow">ADDED · NEEDS A DAY & TIME</p><h2>Places to schedule</h2><p class="muted">These are on your itinerary list, but not assigned to a dated time slot yet. Remove them here to keep them only in Saved Places.</p></div><div class="itinerary-place-list">${unscheduledPlaces.map(place => `<article><img src="${place.image || ''}" alt="${place.imageAlt || place.name}" loading="lazy"><div><h3>${place.name}</h3><p>${place.neighborhood || place.city}</p></div><button type="button" class="itinerary-toggle is-added" data-itinerary-action="remove" data-place-id="${place.id}">Remove</button></article>`).join('')}</div></section>` : '';
  return `${pageHeader('THE DAY-BY-DAY', 'Itinerary', 'Three days in Baku, followed by a move to Georgia. Georgia city and transfer details can be added when you decide them.', '<span class="header-date">STARTING · '+formatDate(trip.startDate,{month:'short',day:'numeric',year:'numeric'})+'</span>')}
    <div class="itinerary-note"><span aria-hidden="true">✳</span><p><strong>Room to wander.</strong> Places will be grouped by neighborhood so you can make the day your own without doubling back.</p></div>${stayInfo}
    <div class="timeline">${timeline}</div>${placeIdeas}${excursions}
    <div class="add-day-placeholder"><span>+</span><div><strong>More days will appear here</strong><p>Georgia destination and travel details are still open.</p></div></div>`;
}
