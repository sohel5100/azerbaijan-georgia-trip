import { trip, itineraryDays, places, travelOptions, flight } from '../data/trip.js';
import { formatDate, icon, emptyState } from '../components/shared.js';

export function renderHome() {
  const savedCount = places.length;
  const nextDay = itineraryDays[0];
  return `
    <section class="welcome-row">
      <div><p class="eyebrow">YOUR NEXT ADVENTURE</p><h1>${trip.title}<span class="title-period">.</span></h1><p class="page-description">${trip.subtitle}</p></div>
      <div class="date-pill">${icon('clock')}<span><small>TRIP STARTS</small><strong>${formatDate(trip.startDate, { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span></div>
    </section>
    <section class="hero-card" aria-label="Trip introduction">
      <div class="hero-art" aria-hidden="true"><div class="sun-disc"></div><div class="mountain mountain-back"></div><div class="mountain mountain-front"></div><div class="waterline"></div><div class="hero-label">THE CAUCASUS · 2026</div></div>
      <div class="hero-copy"><p class="eyebrow light">A JOURNEY IN THE MAKING</p><h2>From city lights<br />to mountain air.</h2><p>Gathering the places, flavors, and little moments worth travelling for.</p><a href="#itinerary" class="hero-link" data-page="itinerary">Explore the plan <span aria-hidden="true">→</span></a></div>
      <div class="hero-index" aria-hidden="true">01 <span>/ 02</span></div>
    </section>
    <section class="quick-stats" aria-label="Trip snapshot">
      <article class="stat-card"><span class="stat-icon peach">${icon('pin')}</span><div><strong>${savedCount ? savedCount : '—'}</strong><span>Places saved</span></div><a href="#places" data-page="places" aria-label="View saved places">↗</a></article>
      <article class="stat-card"><span class="stat-icon lilac">${icon('plane')}</span><div><strong>${travelOptions.length ? travelOptions.length : '—'}</strong><span>Travel details</span></div><a href="#travel" data-page="travel" aria-label="View travel details">↗</a></article>
      <article class="stat-card"><span class="stat-icon green">${icon('sun')}</span><div><strong>In progress</strong><span>Weather & packing</span></div><a href="#packing" data-page="packing" aria-label="View packing and weather">↗</a></article>
    </section>
    <section class="dashboard-grid">
      <div class="panel itinerary-preview"><div class="panel-heading"><div><p class="eyebrow">UP NEXT</p><h2>First day</h2></div><a class="text-link" href="#itinerary" data-page="itinerary">Full itinerary <span aria-hidden="true">→</span></a></div>
        <div class="day-preview"><div class="day-date"><span>${formatDate(nextDay.date, { month: 'short' }).toUpperCase()}</span><strong>${new Date(`${nextDay.date}T12:00:00`).getDate()}</strong></div><div class="day-details"><h3>${nextDay.title}</h3><p>${nextDay.city} <span aria-hidden="true">·</span> ${nextDay.note}</p><div class="day-tags"><span class="tag">Arrival</span><span class="tag tag-muted">Keep it flexible</span></div></div><span class="day-arrow" aria-hidden="true">↗</span></div>
      </div>
      <div class="panel flight-preview"><div class="panel-heading"><div><p class="eyebrow">TRAVEL NOTES</p><h2>Flight details</h2></div><a class="round-link" href="#travel" data-page="travel" aria-label="Open travel details">↗</a></div>
        <div class="flight-time"><div><span class="label-small">DEPARTURE · DEL</span><strong>${flight.departureTime} <small>AM</small></strong><span>${formatDate(flight.departureDate, { weekday: 'short', month: 'short', day: 'numeric' })}</span></div><div class="flight-route" aria-hidden="true"><i></i><span>✈</span><i></i></div><div class="flight-destination"><span class="label-small">ARRIVAL · GYD</span><strong>${flight.arrivalTime} <small>AM</small></strong><span>Baku · ${flight.duration}</span></div></div>
        <div class="flight-note"><span class="status-dot"></span>${flight.airline} ${flight.flightNumber} · ${flight.stops} · ${flight.status}</div>
      </div>
    </section>
    <section class="inspiration-row"><div><p class="eyebrow">A GROWING COLLECTION</p><h2>Little finds, big plans.</h2><p>Every café, view, and side street you send will find its place here.</p></div><a class="button button-outline" href="#places" data-page="places">Browse saved places <span aria-hidden="true">→</span></a></section>
  `;
}
