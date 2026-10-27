import { flight, travelOptions } from '../data/trip.js';
import { formatDate, pageHeader, icon, emptyState } from '../components/shared.js';

export function renderTravel() {
  const date = formatDate(flight.departureDate, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const [departureCode, departureName] = flight.departureAirport.split(' · ');
  const [arrivalCode, arrivalName] = flight.arrivalAirport.split(' · ');
  const alternatives = travelOptions.length ? `<div class="option-list">${travelOptions.map((option, index) => `<article class="option-card"><span class="option-number">0${index+1}</span><div><h3>${option.title}</h3><p class="muted">${option.details}</p></div><span class="tag">${option.status || 'Option'}</span></article>`).join('')}</div>` : emptyState({eyebrow:'ROUTES & ALTERNATIVES',title:'Options will live here.',body:'Train, flight, transfer, or a scenic road trip: I’ll compare the choices you share and keep the practical details together.'});
  return `${pageHeader('FLIGHTS · TRAINS · TRANSFERS', 'Travel details', 'Your flight plan and route options, collected in one place.')}
    <section class="flight-ticket"><div class="ticket-top"><div><p class="eyebrow light">OUTBOUND · ${date}</p><h2>${flight.airline} ${flight.flightNumber}</h2></div><span class="ticket-badge">${icon('plane')} Planned · not booked</span></div>
      <p class="flight-passenger-line">${flight.passengers} · ${flight.tripType} · ${flight.cabinClass}</p><div class="flight-journey"><div class="flight-airport"><span class="ticket-label">DEPARTS · LOCAL TIME</span><strong>${flight.departureTime} <small>AM</small></strong><b>${departureCode}</b><span>${departureName}</span></div><div class="flight-connector"><span>${flight.stops} · ${flight.duration}</span><i></i>${icon('plane')}</div><div class="flight-airport arrival"><span class="ticket-label">ARRIVES · LOCAL TIME</span><strong>${flight.arrivalTime} <small>AM</small></strong><b>${arrivalCode}</b><span>${arrivalName}</span></div></div>
      <div class="flight-price-heading"><span class="ticket-label">FARES SHOWN IN YOUR SCREENSHOT · ${formatDate(flight.fareCheckedDate,{month:'short',day:'numeric',year:'numeric'})}</span></div><div class="fare-options">${flight.observedFares.map(fare => `<div class="fare-option"><span>${fare.provider}</span><strong>${fare.price}</strong></div>`).join('')}</div><p class="baggage-note">${flight.baggageNote}</p><div class="ticket-footnote"><span>Booking reference</span><strong>${flight.bookingReference}</strong></div>
    </section>
    <section class="travel-section"><div class="section-heading"><div><p class="eyebrow">GETTING AROUND</p><h2>Travel options</h2><p class="muted">Choices to compare as the route comes together.</p></div></div>${alternatives}</section>`;
}
