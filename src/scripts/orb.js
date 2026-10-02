/* ---------- companion (original character) ---------- */
export function orbSVG(state) {
  var dim = state === 'sleepy' || state === 'foggy';
  var f = '#1B1433', s = '';
  s += '<svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">';
  if (state === 'recharged') s += '<circle r="98" fill="url(#orbGlow)"/>';
  s += '<circle r="70" fill="url(#' + (dim ? 'orbDim' : 'orbBright') + ')"/>';
  s += '<circle cx="-35" cy="16" r="10" fill="#FF7A3C" opacity=".22"/><circle cx="35" cy="16" r="10" fill="#FF7A3C" opacity=".22"/>';
  var L = -23, R = 23, ey = -7;
  if (state === 'fresh' || state === 'wandering') {
    var ox = state === 'wandering' ? 4 : 0, oy = state === 'wandering' ? -3 : 0;
    [L, R].forEach(function (x) {
      s += '<circle cx="' + (x + ox) + '" cy="' + (ey + oy) + '" r="9" fill="' + f + '"/>';
      s += '<circle cx="' + (x + ox - 3) + '" cy="' + (ey + oy - 3) + '" r="3" fill="#fff"/>';
    });
  } else if (state === 'recharged') {
    [L, R].forEach(function (x) { s += '<path d="M' + (x - 9) + ' ' + (ey + 3) + ' Q' + x + ' ' + (ey - 9) + ' ' + (x + 9) + ' ' + (ey + 3) + '" fill="none" stroke="' + f + '" stroke-width="4.5" stroke-linecap="round"/>'; });
  } else if (state === 'sleepy') {
    [L, R].forEach(function (x) { s += '<path d="M' + (x - 9) + ' ' + (ey - 2) + ' Q' + x + ' ' + (ey + 7) + ' ' + (x + 9) + ' ' + (ey - 2) + '" fill="none" stroke="' + f + '" stroke-width="4.5" stroke-linecap="round"/>'; });
    s += '<text x="62" y="-50" font-family="sans-serif" font-weight="800" font-size="24" fill="currentColor" opacity=".8">z</text><text x="80" y="-70" font-family="sans-serif" font-weight="800" font-size="17" fill="currentColor" opacity=".6">z</text>';
  } else if (state === 'foggy') {
    [L, R].forEach(function (x) { s += '<circle cx="' + x + '" cy="' + ey + '" r="5" fill="' + f + '"/>'; });
    s += '<g fill="#C8D2F0" opacity=".85"><circle cx="-30" cy="-80" r="22"/><circle cx="0" cy="-90" r="28"/><circle cx="30" cy="-80" r="22"/><circle cx="14" cy="-68" r="20"/><circle cx="-14" cy="-68" r="20"/></g>';
  }
  if (state === 'fresh' || state === 'recharged') s += '<path d="M-11 15 Q0 26 11 15" fill="none" stroke="' + f + '" stroke-width="4.5" stroke-linecap="round"/>';
  else if (state === 'wandering') s += '<circle cx="4" cy="20" r="4.5" fill="none" stroke="' + f + '" stroke-width="4"/>';
  else s += '<path d="M-7 20 H7" stroke="' + f + '" stroke-width="4.5" stroke-linecap="round"/>';
  if (state === 'recharged') s += '<g fill="#FFE3A6"><path d="M86 -50 q0 10 10 10 q-10 0 -10 10 q0 -10 -10 -10 q10 0 10 -10z"/><path d="M-88 -26 q0 7 7 7 q-7 0 -7 7 q0 -7 -7 -7 q7 0 7 -7z"/><path d="M74 66 q0 6 6 6 q-6 0 -6 6 q0 -6 -6 -6 q6 0 6 -6z"/></g>';
  s += '</svg>';
  return s;
}
export function paintOrbs(root) {
  (root || document).querySelectorAll('[data-orb]').forEach(function (el) {
    el.innerHTML = orbSVG(el.getAttribute('data-orb'));
    el.style.display = 'inline-block';
    if (!el.style.width && !el.classList.length) { el.style.width = '24px'; el.style.height = '24px'; }
  });
}
