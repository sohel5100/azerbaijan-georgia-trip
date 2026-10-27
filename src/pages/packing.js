import { trip } from '../data/trip.js';
import { formatDate, pageHeader, icon } from '../components/shared.js';

export const packingStorageKey = 'fieldnotes-azerbaijan-georgia-packing-v1';

export const packingGroups = [
  { id: 'passport', name: 'Passport & identity', items: [
    { id: 'passport-original', text: 'Original passport for every traveller', detail: 'Georgia requires each traveller, including children, to have their own passport and e-visa.' },
    { id: 'passport-validity', text: 'Check passport validity and blank pages', detail: 'Georgia: issued within the past 10 years, at least 2 blank pages, and valid 3 months past the requested visa validity. Azerbaijan: valid 3 months beyond e-visa expiry.' },
    { id: 'passport-scan', text: 'Passport biodata-page scan as one PDF', detail: 'Use a clear scan of the page with your photo, name, passport number, and dates.' },
  ]},
  { id: 'azerbaijan', name: 'Azerbaijan entry documents', items: [
    { id: 'az-evisa-per-person', text: 'Approved Azerbaijan ASAN e-visa for every traveller', detail: 'Check each visa matches that traveller’s passport number and name exactly.', link: 'https://evisa.gov.az/', linkText: 'Official Azerbaijan e-Visa application portal' },
    { id: 'az-evisa-print', text: 'Printed Azerbaijan e-visa', detail: 'Azerbaijan says to present the printed e-visa together with the passport at the border.', link: 'https://www.evisa.gov.az/en/apply-faq', linkText: 'Official Azerbaijan e-visa FAQ' },
    { id: 'az-entry-email', text: 'Save the Azerbaijan e-visa email and PDF offline', detail: 'Keep the approval accessible without internet as a backup to the printout.' },
  ]},
  { id: 'georgia', name: 'Georgia entry documents', items: [
    { id: 'ge-evisa-per-person', text: 'Approved Georgia e-visa for every traveller, if required', detail: 'Print it and keep the email/PDF offline. Check whether your passport qualifies for an exemption before applying.', link: 'https://www.evisa.gov.ge/GeoVisa/en/Home/FAQ', linkText: 'Official Georgia e-visa FAQ' },
    { id: 'ge-photo', text: 'Recent biometric passport photo for each applicant', detail: 'Taken within 6 months; direct-facing and clear. The portal says not to use a copied/scanned photo from an ID.' },
    { id: 'ge-supporting-document', text: 'Supporting visa or residence permit, if the portal requires it', detail: 'Check the requirement for your passport and residence country in the official application.' },
    { id: 'ge-accommodation', text: 'Accommodation booking for every night in Georgia', detail: 'Keep hotel confirmations or rental agreement covering the full stay.' },
    { id: 'ge-return-ticket', text: 'Round-trip / onward ticket reservation', detail: 'Keep the itinerary showing how and when you leave Georgia.' },
    { id: 'ge-insurance', text: 'Georgia health and accident insurance certificate', detail: 'Cover the full Georgia stay, arrival and departure dates included; at least GEL 30,000; policy in English or Georgian.', link: 'https://switzerland.mfa.gov.ge/en/news/370174-saqartveloshi-mogzaurobis-msurvelta-sakuradghebod', linkText: 'Official Georgia insurance rule' },
    { id: 'ge-financial-proof', text: 'Proof of funds for the Georgia stay', detail: 'Examples: bank statement for the past 3 months, employer income letter, or sponsor letter with contact details and covered costs.', link: 'https://www.evisa.gov.ge/GeoVisa/en/Home/FAQ', linkText: 'Official Georgia e-visa FAQ' },
    { id: 'ge-purpose-proof', text: 'Proof of travel purpose', detail: 'Keep a short itinerary, invitation, or other document explaining the visit.', link: 'https://www.evisa.gov.ge/GeoVisa/en/Home/FAQ', linkText: 'Official Georgia e-visa FAQ' },
    { id: 'ge-duverify', text: 'Complete Georgia e-visa DuVerify step, if applying', detail: 'The official portal says this second step must be completed within 24 hours of the link email.' },
  ]},
  { id: 'bookings', name: 'Flights & accommodation', items: [
    { id: 'flight-confirmations', text: 'Flight confirmations for every leg', detail: 'Outbound, return, and any flights between cities or countries.' },
    { id: 'ground-transport', text: 'Train, bus, transfer, or car booking confirmations', detail: 'Add each intercity or airport transfer once the route is chosen.' },
    { id: 'all-stays', text: 'Accommodation confirmations for every night', detail: 'Include address, contact number, and check-in details for each stay.' },
    { id: 'booking-offline', text: 'Save tickets and accommodation confirmations offline', detail: 'Keep PDFs or screenshots available when mobile data is unavailable.' },
  ]},
  { id: 'money', name: 'Money & payment', items: [
    { id: 'usd-cash', text: 'USD cash from an authorized Indian forex dealer', detail: 'Plan to exchange it into Azerbaijani manat (AZN) and Georgian lari (GEL); keep the forex receipt.' },
    { id: 'bank-cards', text: 'International debit or credit card', detail: 'Confirm overseas use, PIN, foreign transaction fees, and ATM limits with your bank.' },
    { id: 'bank-statement', text: 'Recent bank statement for Georgia visa / border checks', detail: 'The Georgia portal describes a bank statement covering the past 3 months as one proof-of-funds option.' },
  ]},
  { id: 'clothing', name: 'Clothing & shoes', items: [
    { id: 'layers', text: 'Comfortable layers for November', detail: 'Adjust the exact layers after we know the city route and check the forecast close to departure.' },
    { id: 'walking-shoes', text: 'Comfortable shoes for long walking days' },
    { id: 'rain-layer', text: 'Light rain layer, if the final forecast calls for it' },
  ]},
  { id: 'essentials', name: 'Personal essentials', items: [
    { id: 'phone-charger', text: 'Phone and charging cable' },
    { id: 'power-bank', text: 'Charged power bank' },
    { id: 'medication', text: 'Personal medication in original packaging', detail: 'Carry prescriptions for any regular or controlled medicine.' },
    { id: 'toiletries', text: 'Personal toiletries and care items' },
  ]},
];

function readChecked() {
  try { return JSON.parse(localStorage.getItem(packingStorageKey) || '{}'); }
  catch { return {}; }
}

function renderGroup(group, checked) {
  const done = group.items.filter(item => checked[item.id]).length;
  return `<fieldset class="packing-list-group"><legend><span>${group.name}</span><small data-group-count="${group.id}">${done}/${group.items.length}</small></legend><div class="packing-items">${group.items.map(item => `<div class="packing-entry"><label class="packing-item${checked[item.id] ? ' is-checked' : ''}" for="pack-${item.id}"><input id="pack-${item.id}" type="checkbox" data-pack-item="${item.id}"${checked[item.id] ? ' checked' : ''}><span class="custom-check" aria-hidden="true">✓</span><span class="packing-item-copy"><span class="packing-item-text">${item.text}</span>${item.detail ? `<small class="packing-item-detail">${item.detail}</small>` : ''}</span></label>${item.link ? `<a class="packing-item-reference" href="${item.link}" target="_blank" rel="noreferrer">${item.linkText} ↗</a>` : ''}</div>`).join('')}</div></fieldset>`;
}

export function renderPacking() {
  const checked = readChecked();
  const total = packingGroups.reduce((sum, group) => sum + group.items.length, 0);
  const complete = packingGroups.flatMap(group => group.items).filter(item => checked[item.id]).length;
  return `${pageHeader('WEATHER · WHAT TO BRING', 'Packing & weather', 'A practical list to tick off as you get ready. I can add to it as your plans and discoveries come in.')}
    <section class="weather-banner"><div class="weather-sun" aria-hidden="true">☼</div><div><p class="eyebrow">FORECAST NOTES</p><h2>Weather will follow your route.</h2><p>Once we know your cities, I’ll check the forecast and tune the clothing list for each stop.</p></div><span class="weather-stamp">${formatDate(trip.startDate,{month:'short',day:'numeric'})}<br /><small>ONWARD</small></span></section>
    <div class="packing-layout"><section class="packing-card"><div class="packing-card-head"><div><p class="eyebrow">THE CHECKLIST</p><h2>Pack with purpose</h2></div><button class="button button-outline backup-button" id="download-packing">Download backup <span aria-hidden="true">↓</span></button></div>
      <div class="packing-progress"><div class="packing-progress-top"><strong class="packing-progress-label">${complete} of ${total} packed</strong><span>Progress saves automatically</span></div><div class="progress-track" role="progressbar" aria-label="Packing checklist progress" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${complete}"><span class="progress-fill" style="width:${Math.round(complete/total*100)}%"></span></div></div>
      <div class="packing-groups">${packingGroups.map(group => renderGroup(group, checked)).join('')}</div>
      <p class="local-save-note"><span class="status-dot"></span>Saved in this browser on this device. It won’t sync to other devices automatically.</p>
    </section><aside class="packing-side"><div class="packing-tip"><span class="tip-icon">✳</span><p class="eyebrow">A NOTE FOR LATER</p><h3>Check the forecast close to takeoff.</h3><p>Long-range weather can shift. I’ll help you make the final call nearer your departure.</p></div><div class="packing-tip muted-tip"><p class="eyebrow">TRIP DATES</p><h3>${formatDate(trip.startDate,{month:'long',day:'numeric',year:'numeric'})}</h3><p>Return date and city sequence to be confirmed.</p></div><div class="packing-tip sync-tip"><p class="eyebrow">HOW SAVING WORKS</p><h3>Your checked items stay checked.</h3><p>Ticks are stored in this browser, even after you close the page. Download a backup if you want a separate copy.</p></div></aside></div>`;
}

export function getPackingChecked() { return readChecked(); }
