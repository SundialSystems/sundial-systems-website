/* ============================================================
   SUNDIAL SYSTEMS — SCROLL ANIMATIONS
   ============================================================ */

(function () {
  'use strict';

  /* ---- Scroll reveal via IntersectionObserver ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // one-time trigger
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  /* ---- Stagger children inside [data-stagger] containers ---- */
  document.querySelectorAll('[data-stagger]').forEach(container => {
    const children = container.querySelectorAll(':scope > *');
    children.forEach((child, i) => {
      child.setAttribute('data-reveal', child.getAttribute('data-reveal') || 'up');
      child.setAttribute('data-delay', String(i + 1));
    });
  });

  // Re-run observer for newly attributed stagger children
  if ('IntersectionObserver' in window) {
    const staggerEls = document.querySelectorAll('[data-stagger] > [data-reveal]');
    const staggerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    staggerEls.forEach(el => staggerObserver.observe(el));
  }

  /* ---- Stat counter animation ---- */
  const statEls = document.querySelectorAll('[data-count]');

  if ('IntersectionObserver' in window && statEls.length) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target);

        const el       = entry.target;
        const target   = parseFloat(el.getAttribute('data-count'));
        const prefix   = el.getAttribute('data-prefix') || '';
        const suffix   = el.getAttribute('data-suffix') || '';
        const duration = 1400;
        const start    = performance.now();
        const isFloat  = target % 1 !== 0;

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current  = target * eased;
          el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });

    statEls.forEach(el => countObserver.observe(el));
  }

  /* ---- SVG graph line draw on scroll ---- */
  const graphLines = document.querySelectorAll('.graph-line');
  if ('IntersectionObserver' in window && graphLines.length) {
    const graphObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          graphObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    graphLines.forEach(l => graphObserver.observe(l));
  }

})();
