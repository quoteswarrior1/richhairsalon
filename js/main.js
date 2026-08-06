/**
 * RICH HAIR SALON & ACADEMY
 * js/main.js — Core Interactions | Phase 1: Foundation
 */

'use strict';

/* ──────────────────────────────────────────
   1. INTERSECTION OBSERVER — Section Reveals
────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ──────────────────────────────────────────
   2. NAVBAR — Transparent → White on Scroll
────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

function initNavbar() {
  if (!navbar) return;

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load
}

/* ──────────────────────────────────────────
   3. MOBILE NAV — Hamburger Toggle
────────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  const openNav = () => {
    mobileNav.removeAttribute('hidden');
    requestAnimationFrame(() => mobileNav.classList.add('open'));
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => mobileNav.setAttribute('hidden', ''), 500);
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    isOpen ? closeNav() : openNav();
  });

  // Close on mobile nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeNav();
  });
}

/* ──────────────────────────────────────────
   4. COUNTER ANIMATION
────────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = 16; // ~60fps
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = el.dataset.suffix
        ? target + el.dataset.suffix
        : target;
      clearInterval(timer);
    } else {
      el.textContent = el.dataset.suffix
        ? Math.floor(current) + el.dataset.suffix
        : Math.floor(current);
    }
  }, step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

function initCounters() {
  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
}

/* ──────────────────────────────────────────
   5. FLOATING BUTTONS — Hide/Show on Scroll
────────────────────────────────────────── */
function initFloatingButtons() {
  const floats = document.querySelector('.floating-buttons');
  if (!floats) return;

  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const scrollingDown = currentY > lastY && currentY > 200;
    floats.classList.toggle('hide', scrollingDown);
    lastY = currentY;
  }, { passive: true });
}

/* ──────────────────────────────────────────
   6. SMOOTH SCROLL — Nav anchor links
────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = (navbar?.offsetHeight || 80) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ──────────────────────────────────────────
   7. REVIEWS CAROUSEL — Phase 4
────────────────────────────────────────── */
function initReviewsCarousel() {
  const track   = document.getElementById('reviews-track');
  const dotsWrap = document.getElementById('review-dots');
  const prevBtn = document.getElementById('review-prev');
  const nextBtn = document.getElementById('review-next');
  if (!track) return;

  const slides = track.querySelectorAll('.carousel-slide');
  const total  = slides.length;
  let index    = 0;
  let paused   = false;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'review-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap && dotsWrap.appendChild(dot);
  });

  const dots = () => dotsWrap ? dotsWrap.querySelectorAll('.review-dot') : [];

  const goTo = (i) => {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots().forEach((d, j) => d.classList.toggle('active', j === index));
  };

  prevBtn && prevBtn.addEventListener('click', () => { paused = true; goTo(index - 1); });
  nextBtn && nextBtn.addEventListener('click', () => { paused = true; goTo(index + 1); });

  track.addEventListener('mouseenter', () => (paused = true));
  track.addEventListener('mouseleave', () => (paused = false));

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? index + 1 : index - 1);
  });

  setInterval(() => { if (!paused) goTo(index + 1); }, 5000);
}

function initCarousel(trackSelector, pauseOnHover = true) {
  const track = document.querySelector(trackSelector);
  if (!track) return null;
  let index = 0, paused = false;
  const slides = track.querySelectorAll('.carousel-slide');
  const total = slides.length;
  const goTo = (i) => { index = (i + total) % total; track.style.transform = `translateX(-${index * 100}%)`; };
  const interval = setInterval(() => { if (!paused) goTo(index + 1); }, 4000);
  if (pauseOnHover) {
    track.addEventListener('mouseenter', () => (paused = true));
    track.addEventListener('mouseleave', () => (paused = false));
  }
  return { goTo, stop: () => clearInterval(interval) };
}

/* ──────────────────────────────────────────
   8. LIGHTBOX — Phase 4
────────────────────────────────────────── */
const lightbox = {
  el: null,
  img: null,
  closeBtn: null,
  init() {
    this.el = document.getElementById('lightbox');
    if (!this.el) return;
    this.img = this.el.querySelector('.lightbox-img');
    this.closeBtn = document.getElementById('lightbox-close');

    // Close on backdrop or close button click
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el || e.target === this.closeBtn || this.closeBtn.contains(e.target)) {
        this.close();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  },
  open(src, alt = '') {
    if (!this.el) return;
    if (this.img) { this.img.src = src; this.img.alt = alt; }
    this.el.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  },
  close() {
    if (!this.el) return;
    this.el.setAttribute('hidden', '');
    if (this.img) this.img.src = '';
    document.body.style.overflow = '';
  }
};

/* ──────────────────────────────────────────
   9. GALLERY — Phase 4
────────────────────────────────────────── */
function initGallery() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      const alt = item.dataset.alt || '';
      if (src) lightbox.open(src, alt);
    });
    // Keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}

/* ──────────────────────────────────────────
   9. FAQ ACCORDION (shell)
   Full implementation in Phase 5
────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel   = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-panel').style.maxHeight = '0';
        i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ──────────────────────────────────────────
   10. CONTACT FORM VALIDATION (shell)
   Full implementation in Phase 5
────────────────────────────────────────── */
function initForms() {
  document.querySelectorAll('.booking-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        } else {
          field.classList.remove('error');
        }
      });

      if (valid) {
        const successMsg = form.querySelector('.form-success');
        if (successMsg) successMsg.removeAttribute('hidden');
        form.reset();
      }
    });

    // Live validation on blur
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('blur', () => {
        field.classList.toggle('error', !field.value.trim());
      });
    });
  });
}

/* ──────────────────────────────────────────
   11. BACK TO TOP — Phase 5
────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('float-hidden', window.scrollY < 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ──────────────────────────────────────────
   11. WHATSAPP HELPER
────────────────────────────────────────── */
function buildWhatsAppLink(phone, message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/* ──────────────────────────────────────────
   INIT — Run everything on DOMContentLoaded
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initReveal();
  initCounters();
  initFloatingButtons();
  initSmoothScroll();
  lightbox.init();
  initGallery();
  initReviewsCarousel();
  initFAQ();
  initForms();
  initBackToTop();
});
