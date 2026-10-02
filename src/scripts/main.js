(function () {
  /* ---------- companion (original character) ---------- */
  function orbSVG(state) {
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
  function paintOrbs(root) {
    (root || document).querySelectorAll('[data-orb]').forEach(function (el) {
      el.innerHTML = orbSVG(el.getAttribute('data-orb'));
      el.style.display = 'inline-block';
      if (!el.style.width && !el.classList.length) { el.style.width = '24px'; el.style.height = '24px'; }
    });
  }
  paintOrbs();
  document.querySelector('.brand [data-orb]').style.cssText = 'display:inline-block;width:30px;height:30px';
  document.querySelectorAll('.pill-row .pill [data-orb]').forEach(function (el) { el.style.cssText = 'display:inline-block;width:22px;height:22px'; });

  /* ---------- hero demo ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var reel = $('reel'), pill = $('pill'), pillText = $('pillText'), pillMsg = $('pillMsg'), caption = $('caption');
  var views = ['vPause', 'vChoice', 'vBreath', 'vTimer', 'vCheck', 'vDone'];
  var palettes = [
    ['#5B3FA8', '#E08A4A', '#2A6F8F'], ['#1F7A6B', '#E2C24A', '#3B3F9A'], ['#A33F6B', '#4A6FE0', '#F0A050'],
    ['#2E5AA8', '#6FD0C0', '#B04A8A'], ['#8A3FA8', '#F07A4A', '#40A060'], ['#3A8FD0', '#F0D060', '#A04040']
  ];
  var ICON = {
    hourglass: '<path d="M7 3h10M7 21h10M8 3c0 5 8 6 8 9s-8 4-8 9M16 3c0 5-8 6-8 9s8 4 8 9"/>',
    door: '<path d="M6 21V3h12v18M4 21h16M14 12h.01"/>',
    waves: '<path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0"/>',
    redo: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    leaf: '<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19l8-8"/>'
  };
  function icon(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[n] + '</svg>'; }
  var FEEL = {
    'Bored': { i: 'hourglass', echo: 'Bored. That\'s where ideas start.', hero: ['Let your mind wander', 2, 'Sit and let your mind wander for two minutes. This is when ideas show up.', 'If an idea pops up, hold onto it.'], alts: [['Three ideas', 3], ['Photo hunt', 3]] },
    'Avoiding something': { i: 'door', echo: 'Avoiding something? Let\'s make it smaller.', hero: ['Two-minute start', 2, 'Open the thing you\'re avoiding. Only for two minutes.', 'Do the easiest part first.'], alts: [['Next tiny step', 2], ['Tidy one surface', 4]] },
    'Stressed': { i: 'waves', echo: 'Stressed. That\'s a lot to carry.', hero: ['Brain dump', 3, 'Write down everything on your mind for three minutes.', 'Don\'t organize. Just write.'], alts: [['Shake it out', 1], ['Five senses reset', 2]] },
    'Just habit': { i: 'redo', echo: 'Just habit. Good catch.', hero: ['One minute, eyes closed', 1, 'Close your eyes and breathe slowly for 60 seconds.', 'Breathe in for four, out for six.'], alts: [['Water refill', 2], ['One page', 3]] },
    'Tired': { i: 'moon', echo: 'Tired. That\'s worth listening to.', hero: ['Window watch', 2, 'Stand at a window and find three things that are moving.', 'Look at the farthest thing you can see.'], alts: [['One minute, eyes closed', 1], ['Lie down for three', 3]] },
    'Something specific': { i: 'search', echo: 'Looking for something? Go find it.', hero: null, alts: [] },
    'Lonely': { i: 'person', echo: 'Lonely. A real voice helps.', hero: ['Voice note', 1, 'Send a friend a 20-second voice note.', 'Tell them one small thing from your day.'], alts: [['Thought of you', 1], ['Five-minute call', 5]] }
  };
  var count, timers = [], tick = null, current = null;
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clearAll() { timers.forEach(clearTimeout); timers = []; if (tick) { clearInterval(tick); tick = null; } }
  function show(id) { views.forEach(function (v) { $(v).classList.toggle('show', v === id); }); $('appbg').classList.toggle('show', !!id); }
  function paintReel() {
    var p = palettes[count % palettes.length];
    reel.style.background = 'radial-gradient(circle at 30% 30%, ' + p[0] + ' 0 30%, transparent 55%), radial-gradient(circle at 75% 65%, ' + p[1] + ' 0 25%, transparent 55%), ' + p[2];
  }
  function swipe(after) {
    reel.classList.add('out');
    later(function () {
      count++; paintReel();
      reel.classList.remove('out'); reel.classList.add('in'); void reel.offsetWidth; reel.classList.remove('in');
      if (after) after();
    }, 300);
  }
  function buildTiles() {
    var keys = Object.keys(FEEL);
    for (var i = keys.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = keys[i]; keys[i] = keys[j]; keys[j] = t; }
    var el = $('tiles'); el.innerHTML = '';
    keys.forEach(function (k, idx) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'tile' + (idx === keys.length - 1 ? ' solo' : '');
      b.innerHTML = icon(FEEL[k].i) + '<span>' + k + '</span>';
      b.addEventListener('click', function () { choose(k); });
      el.appendChild(b);
    });
  }
  function choose(k) {
    current = FEEL[k];
    $('echo').textContent = current.echo;
    var acts = $('acts'); acts.innerHTML = '';
    if (current.hero) {
      var h = document.createElement('button'); h.type = 'button'; h.className = 'hero-act';
      h.innerHTML = '<span class="top">' + icon('leaf') + current.hero[0] + '<span class="badge">' + current.hero[1] + ' min</span></span><strong>' + current.hero[2] + '</strong>';
      h.addEventListener('click', startBreak); acts.appendChild(h);
      current.alts.forEach(function (a) {
        var b = document.createElement('div'); b.className = 'alt-act';
        b.innerHTML = icon('leaf') + '<span>' + a[0] + '</span><span class="badge">' + a[1] + ' min</span>';
        acts.appendChild(b);
      });
    }
    caption.textContent = current.hero ? 'Tap the highlighted break to try it.' : 'Pick a time, or head back to your day.';
    show('vChoice');
  }
  function breathe(next) {
    $('breathText').textContent = 'Breathe in…';
    show('vBreath');
    caption.textContent = 'First, one slow breath.';
    later(function () { $('breathText').textContent = 'Breathe out…'; }, 1600);
    later(next, 3400);
  }
  function fmt(s) { return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  function startBreak() {
    var total = current.hero[1] * 60, left = total;
    $('timerTitle').textContent = current.hero[0];
    $('timerPrompt').textContent = current.hero[3];
    $('clock').textContent = fmt(left);
    show('vTimer');
    caption.textContent = 'The timer is sped up for this demo.';
    var step = Math.max(1, Math.round(total / 60));
    tick = setInterval(function () {
      left = Math.max(0, left - step);
      $('clock').textContent = fmt(left);
      if (left === 0) { clearInterval(tick); tick = null; later(checkIn, 500); }
    }, 100);
  }
  function checkIn() {
    if (tick) { clearInterval(tick); tick = null; }
    $('checkTitle').textContent = current.hero[0];
    show('vCheck');
    caption.textContent = 'A quick check-in after every break.';
  }
  function done(feel) {
    var name = current.hero[0];
    $('doneTitle').textContent = feel === 'better' ? 'Recharged.' : 'Thanks for checking in.';
    $('doneText').textContent = feel === 'better' ? 'Unloop will suggest ' + name + ' more often.' : 'Unloop will try something different next time.';
    show('vDone');
    caption.textContent = 'That\'s one loop, unlooped.';
  }
  function keepScrolling(min) {
    show(null);
    pillText.textContent = count + ' reels today · ' + min + ':00 left';
    caption.textContent = 'Your time, counted down. When it ends, Unloop asks again.';
    [0, 1, 2].forEach(function (i) { later(function () { swipe(function () { pillText.textContent = count + ' reels today · ' + (min - 1) + ':' + (59 - i * 8) + ' left'; }); }, 900 + i * 1100); });
  }
  $('stopBtn').addEventListener('click', checkIn);
  $('backDay').addEventListener('click', function () { show('vDone'); $('doneTitle').textContent = 'Back to your day.'; $('doneText').textContent = 'Nice choice. It counts in your dashboard.'; caption.textContent = 'Every step away is counted, never judged.'; });
  document.querySelectorAll('[data-keep]').forEach(function (b) { b.addEventListener('click', function () { keepScrolling(parseInt(b.getAttribute('data-keep'), 10)); }); });
  document.querySelectorAll('[data-feel]').forEach(function (b) { b.addEventListener('click', function () { done(b.getAttribute('data-feel')); }); });

  function run() {
    clearAll(); show(null);
    count = 244; paintReel();
    pill.classList.remove('card'); pillText.textContent = count + ' reels today';
    caption.textContent = 'Watch the counter, then tap a feeling.';
    buildTiles();
    var tot = '250 reels today · 25 min';
    $('pauseTotal').textContent = tot; $('soFar').textContent = 'Today so far: 250 reels · 25 min';
    if (reduce) { count = 250; pillText.textContent = '250 reels today'; show('vPause'); caption.textContent = 'Tap a feeling to see what Unloop suggests.'; return; }
    for (var i = 0; i < 6; i++) later(function () { swipe(function () { pillText.textContent = count + ' reels today'; }); }, 600 + i * 850);
    later(function () {
      pill.classList.add('card');
      pillMsg.textContent = 'That\'s 250 reels today. How are you feeling right now?';
    }, 600 + 6 * 850 + 300);
    later(function () {
      pill.classList.remove('card');
      breathe(function () { show('vPause'); caption.textContent = 'Tap a feeling to see what Unloop suggests.'; });
    }, 600 + 6 * 850 + 3200);
  }
  $('replay').addEventListener('click', run);
  run();

  /* ---------- loop ---------- */
  var loopSvg = document.getElementById('loopSvg');
  var loopOrb = document.getElementById('loopOrb');
  function paintLoopOrb(state) {
    loopOrb.innerHTML = '<g transform="translate(240,240) scale(0.62)">' + orbSVG(state).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '') + '</g>';
  }
  paintLoopOrb('foggy');
  var toggle = document.getElementById('loopToggle');
  toggle.addEventListener('click', function () {
    var on = loopSvg.classList.toggle('unlooped');
    toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    toggle.textContent = on ? 'Show the loop on its own' : 'Show where Unloop steps in';
    paintLoopOrb(on ? 'recharged' : 'foggy');
  });

  /* ---------- companion states ---------- */
  var notes = {
    fresh: 'Fresh: the start of your day, attention intact.',
    wandering: 'Wandering: a few reels in, eyes drifting.',
    sleepy: 'Sleepy: a long session. Maybe time for a break?',
    foggy: 'Foggy: the scroll has gone on a while.',
    recharged: 'Recharged: after a walk, a call, or a real rest.'
  };
  var big = document.getElementById('bigOrb');
  big.style.color = '#F5F2EA';
  document.querySelectorAll('.states button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.states button').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      var st = b.getAttribute('data-state');
      big.setAttribute('data-orb', st); big.innerHTML = orbSVG(st);
      document.getElementById('stateNote').textContent = notes[st];
    });
  });
})();
