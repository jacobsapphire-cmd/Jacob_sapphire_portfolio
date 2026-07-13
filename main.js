// ============================================================
//  MAIN.JS — Portfolio logic, reads from data.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  buildTimeline();
  buildSkillBars();
  buildSkillCircles();
  buildProjects();
  buildContact();
  initTypewriter();
  initScrollObserver();
  initNavHighlight();
  initHeaderScroll();
});

// ── Timeline (About) ─────────────────────────────────────
function buildTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;

  container.innerHTML = portfolioData.timeline.map(item => `
    <div class="timeline-item reveal">
      <div class="timeline-dot ${item.type === 'edu' ? 'edu' : ''}"></div>
      <div class="timeline-period">
        ${item.type === 'work' ? '💼' : '🎓'} ${item.period}
      </div>
      <div class="timeline-role">${item.role}</div>
      <div class="timeline-company">${item.company}</div>
      ${item.highlights.length ? `
        <ul class="timeline-highlights">
          ${item.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>` : ''}
    </div>
  `).join('');
}

// ── Skill Bars ───────────────────────────────────────────
function buildSkillBars() {
  const container = document.getElementById('skill-bars');
  if (!container) return;

  container.innerHTML = portfolioData.skills.technical.map(skill => `
    <div class="skill-bar">
      <div class="skill-bar-header">
        <div class="skill-bar-name">
          <img src="${skill.logo}" alt="${skill.name}" class="skill-logo"
               onerror="this.style.display='none'">
          ${skill.name}
        </div>
        <div class="skill-percent">${skill.level}%</div>
      </div>
      <div class="skill-track">
        <div class="skill-fill" data-width="${skill.level}"></div>
      </div>
    </div>
  `).join('');
}

// ── Skill Circles ────────────────────────────────────────
function buildSkillCircles() {
  const container = document.getElementById('skill-circles');
  if (!container) return;

  const r = 45;
  const circumference = +(2 * Math.PI * r).toFixed(2);

  container.innerHTML = portfolioData.skills.professional.map(skill => `
    <div class="circle-box">
      <div class="circle" data-percent="${skill.percent}">
        <svg viewBox="0 0 100 100">
          <circle class="bg-ring"       cx="50" cy="50" r="${r}"/>
          <circle class="progress-ring" cx="50" cy="50" r="${r}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${circumference}"/>
        </svg>
        <div class="circle-label">${skill.percent}%</div>
      </div>
      <h5>${skill.name}</h5>
    </div>
  `).join('');
}

// ── Projects ─────────────────────────────────────────────
function buildProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = portfolioData.projects.map(p => {
    const actions = [];
    if (p.link) actions.push(`
      <a href="${p.link}" target="_blank" class="btn-sm primary" id="proj-link-${p.id}">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Launch App
      </a>`);
    if (p.pdf)  actions.push(`
      <a href="${p.pdf}" target="_blank" class="btn-sm outline" id="proj-pdf-${p.id}">
        <i class="fa-solid fa-file-pdf"></i> View PDF
      </a>`);

    const mediaHtml = p.video
      ? `<video autoplay loop muted playsinline>
           <source src="${p.video}" type="video/mp4">
         </video>`
      : `<div class="project-no-video">
           <i class="fa-solid fa-diagram-project"></i>
           <span>${p.title}</span>
         </div>`;

    return `
      <div class="project-card reveal" id="card-${p.id}">
        <div class="project-media">
          ${p.label ? `<span class="project-label">${p.label}</span>` : ''}
          ${mediaHtml}
        </div>
        <div class="project-info">
          <div class="project-subtitle">${p.subtitle}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-stack">
            ${p.stack.map(s => `<span class="stack-badge">${s}</span>`).join('')}
          </div>
          <div class="project-actions">${actions.join('')}</div>
        </div>
      </div>`;
  }).join('');
}

// ── Contact Cards ────────────────────────────────────────
function buildContact() {
  const container = document.getElementById('contact-grid');
  if (!container) return;

  const { social } = portfolioData.profile;
  const items = [
    {
      id: 'contact-email',
      icon: 'fa-solid fa-envelope',
      label: 'Email',
      value: social.email,
      href: `mailto:${social.email}`
    },
    {
      id: 'contact-phone',
      icon: 'fa-solid fa-phone',
      label: 'Phone',
      value: social.phone,
      href: `tel:${social.phoneTel}`
    },
    {
      id: 'contact-whatsapp',
      icon: 'fa-brands fa-whatsapp',
      label: 'WhatsApp',
      value: 'WhatsApp Chat',
      href: social.whatsapp,
      target: '_blank'
    },
    {
      id: 'contact-linkedin',
      icon: 'fa-brands fa-linkedin',
      label: 'LinkedIn',
      value: 'jacob-sapphire-4657a327a',
      href: social.linkedin,
      target: '_blank'
    }
  ];

  container.innerHTML = items.map(item => `
    <a href="${item.href}" ${item.target ? `target="${item.target}"` : ''}
       class="contact-card reveal" id="${item.id}">
      <div class="contact-card-icon">
        <i class="${item.icon}"></i>
      </div>
      <div>
        <div class="contact-card-label">${item.label}</div>
        <div class="contact-card-value">${item.value}</div>
      </div>
    </a>
  `).join('');
}

// ── Typewriter ───────────────────────────────────────────
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = portfolioData.profile.roles;
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function tick() {
    const current = roles[roleIndex];
    const speed   = isDeleting ? 50 : 100;

    el.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex < current.length) {
      charIndex++;
      setTimeout(tick, speed);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(tick, speed);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(tick, 1500);           // pause before deleting
      } else {
        isDeleting  = false;
        roleIndex   = (roleIndex + 1) % roles.length;
        setTimeout(tick, 500);            // pause before next role
      }
    }
  }

  tick();
}

// ── Skill Animations ─────────────────────────────────────
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  skillsAnimated = true;

  document.querySelectorAll('.skill-fill').forEach(fill => {
    const w = fill.getAttribute('data-width');
    requestAnimationFrame(() => { fill.style.width = w + '%'; });
  });

  document.querySelectorAll('.circle').forEach(circle => {
    const pct  = parseFloat(circle.getAttribute('data-percent'));
    const ring = circle.querySelector('.progress-ring');
    if (!ring) return;
    const r            = 45;
    const circumference = 2 * Math.PI * r;
    const offset       = circumference - (pct / 100) * circumference;
    requestAnimationFrame(() => { ring.style.strokeDashoffset = offset; });
  });
}

// ── Intersection Observer ────────────────────────────────
function initScrollObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Reveal animation
      if (entry.target.classList.contains('reveal')) {
        entry.target.classList.add('visible');
      }

      // Skills section trigger
      if (entry.target.id === 'skills') {
        setTimeout(animateSkills, 200);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const skillsSec = document.getElementById('skills');
  if (skillsSec) observer.observe(skillsSec);
}

// ── Nav Active Highlight ─────────────────────────────────
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Smooth scroll on click
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Active state on scroll
  window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active',
        link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}

// ── Header shadow on scroll ──────────────────────────────
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}
