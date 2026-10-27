# Fieldnotes — Azerbaijan & Georgia

A small, mobile-first travel guide for the Azerbaijan and Georgia trip. It is a static website with separate page modules, so it can be hosted from a public GitHub repository (for example, with GitHub Pages) without a build step.

## Preview

Open `index.html` in a local static server, or publish the repository with GitHub Pages. The site uses ES modules, so a local server is recommended rather than opening the file directly. For example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

- `src/pages/` — overview, itinerary, places, travel, prep checklist, and packing screens
- `src/components/` — shared UI helpers
- `src/data/trip.js` — trip facts, saved places, itinerary, and route options
- `src/data/itinerary-state.js` — itinerary place selection saved in browser storage
- `assets/places/` — locally stored place photos
- `styles/main.css` — responsive visual system

The Bibi-Heybat Mosque photo is by Fərid Zeynalov, sourced from Wikimedia Commons, licensed CC BY-SA 4.0, and resized for the place card. Its attribution and license link appear with the image.

## Current trip notes

- Departure date: Friday, November 6, 2026
- Planned outbound: Azerbaijan Airlines J258, Delhi (DEL) 04:15 → Baku (GYD) 07:50, direct, 5h 05m (November 6, 2026)
- Fare options from the shared Skyscanner screenshot: ₹22,981 (Kiwi.com), ₹23,714 (Flightnetwork); not marked as booked
- Baku plan: November 6–8, then travel to Georgia on November 9; Georgia destination and transport are pending

## Research notes

The prep checklist includes initial official-source research for Azerbaijan and Georgia entry requirements, Georgian tourist insurance, and carrying USD for exchange into local currency. Visa guidance currently assumes an Indian passport and should be checked against the traveler’s actual passport and route before booking or departure.

Places remain in the saved collection whether or not they are on the itinerary. The itinerary and Places screens include controls to remove or add a saved place to the itinerary. Selection is stored in the current browser with local storage, so it works on the deployed static site but does not sync between devices.

The packing checklist saves checked items in browser local storage on the current device. GitHub Pages cannot write checklist state back to the repository. Use the checklist's download button for a JSON copy of the current checked state; to add or change checklist entries on the deployed site, update and redeploy the source files.
