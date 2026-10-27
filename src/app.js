import { renderHome } from './pages/home.js';
import { renderItinerary } from './pages/itinerary.js';
import { renderPlaces } from './pages/places.js';
import { renderTravel } from './pages/travel.js';
import { renderPrep } from './pages/prep.js';
import { renderPacking, packingGroups, packingStorageKey, getPackingChecked } from './pages/packing.js';
import { getItineraryPlaceIds, saveItineraryPlaceIds } from './data/itinerary-state.js';

const pages = { home: renderHome, itinerary: renderItinerary, places: renderPlaces, travel: renderTravel, prep: renderPrep, packing: renderPacking };
const root = document.querySelector('#page-root');

function currentPage() {
  const page = location.hash.replace('#', '') || 'home';
  return pages[page] ? page : 'home';
}

function render() {
  const page = currentPage();
  root.innerHTML = pages[page]();
  document.querySelectorAll('[data-page]').forEach(link => {
    const active = link.dataset.page === page;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', render);
document.addEventListener('click', event => {
  const itineraryAction = event.target.closest('[data-itinerary-action]');
  if (itineraryAction) {
    const ids = getItineraryPlaceIds();
    const placeId = itineraryAction.dataset.placeId;
    const next = itineraryAction.dataset.itineraryAction === 'remove'
      ? ids.filter(id => id !== placeId)
      : [...ids, placeId];
    saveItineraryPlaceIds(next);
    render();
    return;
  }
  const link = event.target.closest('a[data-page]');
  if (link && link.dataset.page === currentPage()) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (event.target.closest('#download-packing')) downloadPackingBackup();
});

root.addEventListener('change', event => {
  const checkbox = event.target.closest('[data-pack-item]');
  if (!checkbox) return;
  const checked = getPackingChecked();
  checked[checkbox.dataset.packItem] = checkbox.checked;
  localStorage.setItem(packingStorageKey, JSON.stringify(checked));
  checkbox.closest('.packing-item')?.classList.toggle('is-checked', checkbox.checked);
  updatePackingProgress(checked);
});

function updatePackingProgress(checked) {
  const items = packingGroups.flatMap(group => group.items);
  const complete = items.filter(item => checked[item.id]).length;
  const progress = document.querySelector('.progress-track');
  const label = document.querySelector('.packing-progress-label');
  if (label) label.textContent = `${complete} of ${items.length} packed`;
  if (progress) {
    progress.setAttribute('aria-valuenow', String(complete));
    progress.querySelector('.progress-fill').style.width = `${Math.round(complete / items.length * 100)}%`;
  }
  packingGroups.forEach(group => {
    const count = group.items.filter(item => checked[item.id]).length;
    const node = document.querySelector(`[data-group-count="${group.id}"]`);
    if (node) node.textContent = `${count}/${group.items.length}`;
  });
}

function downloadPackingBackup() {
  const backup = {
    trip: 'Azerbaijan & Georgia',
    savedAt: new Date().toISOString(),
    checkedItems: getPackingChecked(),
    checklist: packingGroups,
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'azerbaijan-georgia-packing-checklist.json';
  link.click();
  URL.revokeObjectURL(url);
}

render();
