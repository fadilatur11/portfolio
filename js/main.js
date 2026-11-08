(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var sentinel = document.querySelector('.nav-sentinel');
  var navLinks = document.querySelectorAll('.nav-links a');
  var sections = document.querySelectorAll('main section[id]');
  var menuBtn = document.querySelector('.nav-menu-btn');
  var menuClose = document.querySelector('.mobile-menu-close');
  var menu = document.getElementById('mobile-menu');
  var dialog = document.querySelector('.project-dialog');
  var dialogTitle = document.getElementById('dialog-title');
  var dialogDesc = document.querySelector('.dialog-desc');
  var dialogClose = document.querySelector('.dialog-close');
  var dialogCta = document.querySelector('.dialog-cta');
  var rows = document.querySelectorAll('.work-row');
  var cursorMedia = document.querySelector('.cursor-media');
  var cursorImg = cursorMedia ? cursorMedia.querySelector('img') : null;
  var lastTrigger = null;

  /* ------------------------------------------------------------------
     Motion contract (F3). Progressive enhancement: without GSAP, or with
     prefers-reduced-motion, the page is fully visible and static.
     ------------------------------------------------------------------ */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var motionOK = !reduceMotion && typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (motionOK) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ------------------------------------------------------------------
     Nav background — IntersectionObserver on a top sentinel.
     No scroll listener; the browser tells us when the page moves.
     ------------------------------------------------------------------ */
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ------------------------------------------------------------------
     Scrollspy — highlight the nav link of the section in view.
     ------------------------------------------------------------------ */
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ------------------------------------------------------------------
     Mobile menu — labelled button, focus moved in, Tab kept inside,
     Escape closes, focus returns to the trigger. Slide transition
     only when motion is allowed.
     ------------------------------------------------------------------ */
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    if (open) {
      menu.hidden = false;
      document.body.classList.add('menu-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.textContent = 'Close';
      if (motionOK) {
        gsap.fromTo(menu, { yPercent: -100 }, { yPercent: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
      }
      var firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      document.body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = 'Menu';
      if (motionOK) {
        gsap.to(menu, {
          yPercent: -100,
          duration: 0.25,
          ease: 'power2.in',
          overwrite: 'auto',
          onComplete: function () {
            menu.hidden = true;
            gsap.set(menu, { yPercent: 0 });
          }
        });
      } else {
        menu.hidden = true;
      }
      menuBtn.focus();
    }
  }

  if (menu && menuBtn) {
    menuBtn.addEventListener('click', function () {
      setMenu(menu.hidden);
    });

    if (menuClose) {
      menuClose.addEventListener('click', function () { setMenu(false); });
    }

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (!document.body.classList.contains('menu-open')) return;
      if (event.key === 'Escape') {
        setMenu(false);
        return;
      }
      if (event.key !== 'Tab') return;
      var focusables = [menuClose].concat(Array.prototype.slice.call(menu.querySelectorAll('a'))).filter(Boolean);
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Project dialog — native <dialog>: focus trap and Escape come free.
     Open/close transition handled by CSS @starting-style.
     ------------------------------------------------------------------ */
  function openDialog(row) {
    if (!dialog) return;
    dialogTitle.textContent = row.getAttribute('data-title');
    dialogDesc.textContent = row.getAttribute('data-desc');
    lastTrigger = row;
    dialog.showModal();
  }

  rows.forEach(function (row) {
    row.addEventListener('click', function () { openDialog(row); });
  });

  if (dialog) {
    if (dialogClose) {
      dialogClose.addEventListener('click', function () { dialog.close(); });
    }
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () {
      if (lastTrigger) lastTrigger.focus();
    });
    if (dialogCta) {
      dialogCta.addEventListener('click', function () { dialog.close(); });
    }
  }

  /* ------------------------------------------------------------------
     Cursor media — hover preview for pointer devices.
     GSAP quickTo when motion is allowed (smooth follow), rAF fallback
     otherwise. The reveal itself is the CSS .is-active opacity state.
     ------------------------------------------------------------------ */
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (cursorMedia && cursorImg && finePointer.matches) {
    var activate = function (row) {
      var src = row.getAttribute('data-img');
      if (src && cursorImg.getAttribute('src') !== src) {
        cursorImg.setAttribute('src', src);
      }
      cursorMedia.classList.add('is-active');
      if (motionOK) {
        gsap.fromTo(cursorMedia, { scale: 0.94 }, { scale: 1, duration: 0.25, ease: 'power3.out', overwrite: 'auto' });
      }
    };
    var deactivate = function () {
      cursorMedia.classList.remove('is-active');
    };

    rows.forEach(function (row) {
      row.addEventListener('pointerenter', function () { activate(row); });
      row.addEventListener('pointerleave', deactivate);
    });

    var mediaWidth = cursorMedia.offsetWidth;
    var mediaHeight = cursorMedia.offsetHeight;
    window.addEventListener('resize', function () {
      mediaWidth = cursorMedia.offsetWidth;
      mediaHeight = cursorMedia.offsetHeight;
    });

    if (motionOK) {
      var xTo = gsap.quickTo(cursorMedia, 'x', { duration: 0.35, ease: 'power3' });
      var yTo = gsap.quickTo(cursorMedia, 'y', { duration: 0.35, ease: 'power3' });
      document.addEventListener('pointermove', function (event) {
        var x = Math.min(event.clientX + 28, window.innerWidth - mediaWidth - 16);
        var y = Math.max(16, Math.min(event.clientY - mediaHeight / 2, window.innerHeight - mediaHeight - 16));
        xTo(x);
        yTo(y);
      });
    } else {
      var pendingX = 0;
      var pendingY = 0;
      var frame = 0;

      var paint = function () {
        frame = 0;
        var x = Math.min(pendingX + 28, window.innerWidth - mediaWidth - 16);
        var y = Math.max(16, Math.min(pendingY - mediaHeight / 2, window.innerHeight - mediaHeight - 16));
        cursorMedia.style.transform = 'translate3d(' + Math.round(x) + 'px,' + Math.round(y) + 'px,0)';
      };

      document.addEventListener('pointermove', function (event) {
        pendingX = event.clientX;
        pendingY = event.clientY;
        if (!frame) frame = window.requestAnimationFrame(paint);
      });
    }
  }

  /* ------------------------------------------------------------------
     Choreography (MOTION_INTENSITY 8). Every block below states its
     purpose; all values derive from the F1 motion tokens.
     GSAP speaks seconds, tokens are ms: --dur-2 250ms -> 0.25s,
     --dur-3 400ms -> 0.4s, --stagger-step 60ms -> 0.06s.
     Eases: power3.out maps to --ease-out, power2.in to --ease-in.
     ------------------------------------------------------------------ */
  if (motionOK) {
    /* 1. Hero entry — hierarchy: establishes reading order on load.
          kicker -> headline lines -> subtext -> CTA; completes < 600ms. */
    var heroKicker = document.querySelector('.hero-kicker');
    var heroLines = document.querySelectorAll('.hero-title .line-inner');
    var heroSub = document.querySelector('.hero-sub');
    var heroActions = document.querySelector('.hero-actions');

    if (heroKicker) {
      gsap.set(heroKicker, { opacity: 0, y: 16 });
      gsap.set(heroLines, { yPercent: 110 });
      gsap.set(heroSub, { opacity: 0, y: 16 });
      gsap.set(heroActions, { opacity: 0, y: 16 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(heroKicker, { opacity: 1, y: 0, duration: 0.35 }, 0)
        .to(heroLines, { yPercent: 0, duration: 0.45, stagger: 0.06 }, 0.05)
        .to(heroSub, { opacity: 1, y: 0, duration: 0.3 }, 0.2)
        .to(heroActions, { opacity: 1, y: 0, duration: 0.3 }, 0.3);
    }

    /* 2. Hero exit parallax — depth: the headline recedes as you leave. */
    gsap.to('.hero-title', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.hero-sub', {
      yPercent: 28,
      opacity: 0.4,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    /* 3. Line reveals — storytelling: headings assemble as you arrive. */
    document.querySelectorAll('[data-reveal-lines]').forEach(function (el) {
      var lines = el.querySelectorAll('.line-inner');
      gsap.set(lines, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to(lines, { yPercent: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 });
        }
      });
    });

    /* 4. Block reveals — storytelling: content enters in reading order. */
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
        }
      });
    });

    /* 5. Work rows — storytelling: the index lists itself, staggered. */
    var rowItems = document.querySelectorAll('.work-list li');
    gsap.set(rowItems, { opacity: 0, y: 24 });
    ScrollTrigger.batch(rowItems, {
      start: 'top 90%',
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.06 });
      }
    });
  }

  /* ------------------------------------------------------------------
     Preload work previews once the page is idle-loaded.
     ------------------------------------------------------------------ */
  window.addEventListener('load', function () {
    rows.forEach(function (row) {
      var img = new Image();
      img.src = row.getAttribute('data-img');
    });
  });
}());
