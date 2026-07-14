'use strict';
/* ============================================================
   PORTFOLIO — main.js
   Renders dynamic content from data.js into the page.
   All content strings live in data.js only.
   ============================================================ */
const D = portfolioData;

/* ─── Live Clock ──────────────────────────────────────────── */
function updateClock() {
  const el = document.getElementById('live-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: false
  });
}
updateClock();
setInterval(updateClock, 1000);

/* ─── Marquee ─────────────────────────────────────────────── */
function buildMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  const words = [
    'GIS Analyst', 'Jacob Sapphire', 'AI Developer',
    'Web Developer', 'M.Sc. Geography', 'Blender 3D'
  ];
  // Build one set
  const makeSet = () => words.map(w =>
    `<span class="marquee-word">${w}</span><span class="marquee-sep">·</span>`
  ).join('');
  // Duplicate so CSS -50% creates seamless loop
  track.innerHTML = makeSet() + makeSet();
}

/* ─── Timeline ────────────────────────────────────────────── */
function buildTimeline() {
  const el = document.getElementById('timeline');
  if (!el || !D.timeline) return;
  el.innerHTML = D.timeline.map(t => `
    <div class="timeline-item">
      <div class="tl-period">${t.period || ''}</div>
      <div class="tl-role">${t.role || ''}</div>
      <div class="tl-company">${t.company || ''}</div>
      ${t.highlights && t.highlights.length
        ? `<ul class="tl-points">${t.highlights.map(h => `<li>${h}</li>`).join('')}</ul>`
        : ''}
    </div>
  `).join('');
}

/* ─── Projects Grid ───────────────────────────────────────── */
function buildProjects() {
  const grid = document.getElementById('panel-projects');
  if (!grid || !D.projects) return;

  grid.innerHTML = D.projects.map(p => {
    /* Media: video OR icon placeholder */
    let mediaHtml;
    if (p.video) {
      mediaHtml = `
        <video autoplay loop muted playsinline preload="metadata">
          <source src="${p.video}" type="video/mp4">
        </video>`;
    } else {
      mediaHtml = `
        <div class="project-no-video">
          <i class="fa-solid fa-diagram-project"></i>
          <span>${p.title}</span>
        </div>`;
    }

    /* Footer actions */
    const actions = [];
    if (p.link) {
      actions.push(`<a href="${p.link}" target="_blank" class="proj-link">
        Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`);
    }
    if (p.pdf) {
      actions.push(`<a href="${p.pdf}" target="_blank" class="proj-dl" title="View PDF">
        <i class="fa-solid fa-file-pdf"></i></a>`);
    }

    return `
      <div class="project-card reveal" id="card-${p.id}">
        <div class="project-media">
          ${p.label ? `<span class="project-label">${p.label}</span>` : ''}
          ${mediaHtml}
        </div>
        <div class="project-body">
          <div class="project-name">${p.title}</div>
          <p class="project-desc">${p.description}</p>
          <div class="project-stack">
            ${(p.stack || []).map(s => `<span class="stack-pill">${s}</span>`).join('')}
          </div>
          ${actions.length
            ? `<div class="project-footer">${actions.join('')}</div>`
            : ''}
        </div>
      </div>`;
  }).join('');
}

/* ─── Tech Stack Grid ─────────────────────────────────────── */
function buildTechStack() {
  const grid = document.getElementById('panel-techstack');
  if (!grid) return;

  const items = (D.skills && D.skills.technical) ? D.skills.technical : [];
  if (!items.length) return;

  grid.innerHTML = items.map(s => `
    <div class="tech-card">
      ${s.logo
        ? `<img src="${s.logo}" alt="${s.name}" loading="lazy">`
        : `<i class="fa-solid fa-code" style="font-size:32px;color:var(--muted);"></i>`}
      <div class="tech-name">${s.name}</div>
    </div>
  `).join('');
}

/* ─── Tab Switcher ────────────────────────────────────────── */
function switchTab(tab) {
  const panelP  = document.getElementById('panel-projects');
  const panelT  = document.getElementById('panel-techstack');
  const btnP    = document.getElementById('tab-projects');
  const btnT    = document.getElementById('tab-techstack');

  if (tab === 'projects') {
    panelP.style.display = 'grid';
    panelT.style.display = 'none';
    btnP.classList.add('active');
    btnT.classList.remove('active');
  } else {
    panelP.style.display = 'none';
    panelT.style.display = 'grid';
    btnP.classList.remove('active');
    btnT.classList.add('active');
  }
  // Re-run reveal in case new elements appeared
  initReveal();
}

/* ─── WhatsApp Form ───────────────────────────────────────── */
function sendWhatsApp() {
  const name = (document.getElementById('contact-name')?.value || '').trim();
  const msg  = (document.getElementById('contact-message')?.value || '').trim();
  if (!msg) {
    alert('Please write a message before sending.');
    return;
  }
  const text = name
    ? `Hi Jacob! I'm ${name}.\n\n${msg}`
    : `Hi Jacob!\n\n${msg}`;
  window.open(
    `https://wa.me/919384630838?text=${encodeURIComponent(text)}`,
    '_blank'
  );
}

/* ─── Scroll Reveal ───────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

/* ─── Active Nav on Scroll ────────────────────────────────── */
function initNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const header   = document.getElementById('site-header');

  const onScroll = () => {
    const y = window.scrollY;

    /* tint header after scroll */
    if (header) header.style.background =
      y > 60 ? 'rgba(8,8,8,0.97)' : 'rgba(8,8,8,0.92)';

    /* highlight active section */
    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 100) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active',
        l.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildMarquee();
  buildTimeline();
  buildProjects();
  buildTechStack();
  initReveal();
  initNav();
});
