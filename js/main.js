/* ============================================================
   SUNDIAL SYSTEMS — MAIN JS
   ============================================================ */

(function () {
  'use strict';

  /* ---- NAV: transparent → solid on scroll ---- */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Active nav link ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .dropdown-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Mobile menu ---- */
  const toggle   = document.getElementById('navToggle');
  const overlay  = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('overlayClose');
  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    const closeMenu = () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ---- Custom cursor ---- */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    document.querySelectorAll('a, button, .btn, .service-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '0.6';
    });
  }

  /* ---- Human popup widget ---- */
  const popupTrigger  = document.getElementById('popupTrigger');
  const popupModal    = document.getElementById('popupModal');
  const popupClose    = document.getElementById('popupClose');
  const popupBackdrop = document.getElementById('popupBackdrop');

  if (popupTrigger && popupModal) {
    const openPopup = () => {
      popupModal.classList.add('open');
      if (popupBackdrop) popupBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closePopup = () => {
      popupModal.classList.remove('open');
      if (popupBackdrop) popupBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    popupTrigger.addEventListener('click', openPopup);
    if (popupClose)    popupClose.addEventListener('click', closePopup);
    if (popupBackdrop) popupBackdrop.addEventListener('click', closePopup);

    // Auto-open once per session
    if (!sessionStorage.getItem('popup_shown')) {
      setTimeout(() => {
        openPopup();
        sessionStorage.setItem('popup_shown', '1');
      }, 3500);
    }

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closePopup();
    });
  }

  /* ---- Hero load animation ---- */
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
    document.querySelector('.hero').parentElement
      ? heroText.closest('section')?.classList.add('hero-loaded')
      : null;
    // Trigger after small delay so CSS can parse
    const heroSection = document.querySelector('.hero-content') || document.querySelector('.hero');
    if (heroSection) {
      requestAnimationFrame(() => {
        heroSection.classList.add('hero-loaded');
      });
    }
  }

  /* ---- Smooth anchor scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Contact form ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) success.style.display = 'block';
    });
  }

})();
