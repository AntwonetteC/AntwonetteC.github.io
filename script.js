/* ============================================================
   VACATION WITH GRACE – ARK ENCOUNTER GETAWAY
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. NAVBAR – scroll effect + mobile toggle
     ---------------------------------------------------------- */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // Scroll effect: add .scrolled class for stronger background
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    }
  });


  /* ----------------------------------------------------------
     2. SMOOTH SCROLL – for all anchor links
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });


  /* ----------------------------------------------------------
     3. FAQ ACCORDION
     ---------------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const answer   = this.nextElementSibling;
      const isOpen   = this.getAttribute('aria-expanded') === 'true';
      const allBtns  = document.querySelectorAll('.faq-question');

      // Close all others first
      allBtns.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherAnswer = otherBtn.nextElementSibling;
          if (otherAnswer) otherAnswer.classList.remove('open');
        }
      });

      // Toggle current
      if (isOpen) {
        this.setAttribute('aria-expanded', 'false');
        answer.classList.remove('open');
      } else {
        this.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });


  /* ----------------------------------------------------------
     4. SCROLL-TRIGGERED ANIMATIONS
        Elements with [data-animate] fade up when in view
     ---------------------------------------------------------- */
  const animateEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger cards within the same parent
          const parent   = entry.target.parentElement;
          const siblings = Array.from(parent.querySelectorAll('[data-animate]'));
          const idx      = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (idx * 0.08) + 's';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animateEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately for old browsers
    animateEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ----------------------------------------------------------
     5. RESERVE BUTTON – placeholder for Cognito Forms
        To connect: replace the href on #reserveBtn in index.html
        with your Cognito Forms URL, e.g.:
        href="https://www.cognitoforms.com/VacationWithGrace/ArkEncounterGetaway"
     ---------------------------------------------------------- */
  const reserveBtn = document.getElementById('reserveBtn');
  if (reserveBtn) {
    reserveBtn.addEventListener('click', function (e) {
      // If the href is still "#contact" (placeholder), scroll to contact
      if (this.getAttribute('href') === '#contact') {
        e.preventDefault();
        const contact = document.getElementById('contact');
        if (contact) {
          const navHeight = navbar.offsetHeight;
          const top = contact.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
      // If a real URL is set, the link will navigate normally — no JS needed
    });
  }


  /* ----------------------------------------------------------
     6. ACTIVE NAV LINK – highlight section in view
     ---------------------------------------------------------- */
  const sections  = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(function (sec) { sectionObserver.observe(sec); });


  /* ----------------------------------------------------------
     7. PHONE NUMBER – click-to-call convenience on mobile
        (already handled by <a href="tel:..."> in HTML)
     ---------------------------------------------------------- */

  /* ----------------------------------------------------------
     8. SCROLL-TO-TOP on logo click
     ---------------------------------------------------------- */
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
