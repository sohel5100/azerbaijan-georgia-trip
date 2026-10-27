export const icon = (name) => {
  const paths = {
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    plane: '<path d="m2 16 20-5-20-5 5 5-5 5Zm5-5 4 1"/>',
    car: '<path d="M5 17h14l1-5-2-1-2-4H8l-2 4-2 1 1 5Z"/><path d="M6 11h12M8 17v2m8-2v2"/><circle cx="7.5" cy="15" r="1"/><circle cx="16.5" cy="15" r="1"/>',
    bed: '<path d="M3 18v-7m0 4h18v3M3 13h5V9H5a2 2 0 0 0-2 2m5 2V9h9a4 4 0 0 1 4 4v2"/>',
    walk: '<circle cx="13" cy="5" r="2"/><path d="m11 22 2-6-3-3 2-4 4 3 3 1m-9 3-4 3m5-6-2 5 4 4"/>',
    food: '<circle cx="12" cy="12" r="8"/><path d="M8 8v4m-2-4v3a2 2 0 0 0 4 0V8m-2 6v6m7-12v12m0-12c2 1 3 3 3 5h-3"/>',
  };
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
};

export function formatDate(date, options = { weekday: 'long', month: 'long', day: 'numeric' }) {
  return new Intl.DateTimeFormat('en', options).format(new Date(`${date}T12:00:00`));
}

export function emptyState({ eyebrow, title, body, action, href = '#places' }) {
  return `<section class="empty-state"><div class="empty-illustration" aria-hidden="true"><span>✳</span><i></i></div><p class="eyebrow">${eyebrow}</p><h3>${title}</h3><p class="muted">${body}</p>${action ? `<a class="text-link" href="${href}">${action} <span aria-hidden="true">↗</span></a>` : ''}</section>`;
}

export function pageHeader(eyebrow, title, description, action = '') {
  return `<div class="page-header"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-description">${description}</p></div>${action}</div>`;
}
