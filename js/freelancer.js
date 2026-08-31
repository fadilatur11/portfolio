(function () {
  'use strict';
  var menu = document.querySelector('.menu-button');
  var railLinks = document.querySelectorAll('.rail-link');
  var sections = document.querySelectorAll('main section[id]');
  var modal = document.querySelector('.case-modal');
  var title = document.querySelector('#caseTitle');
  var description = document.querySelector('#caseDescription');
  var close = document.querySelector('.case-close');
  var lastTrigger;
  var menuPanel = document.querySelector('.menu-panel');

  if (menu) {
    menu.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (menuPanel) menuPanel.setAttribute('aria-hidden', String(!open));
    });
    document.querySelectorAll('.menu-panel a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Open menu');
        if (menuPanel) menuPanel.setAttribute('aria-hidden', 'true');
      });
    });
  }

  function setActive(id) {
    railLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -45% 0px' });
    sections.forEach(function (section) { observer.observe(section); });
  }

  function openCase(trigger) {
    var row = trigger.closest('.project-row');
    title.textContent = row.getAttribute('data-title');
    description.textContent = row.getAttribute('data-description');
    lastTrigger = trigger;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    close.focus();
  }

  function closeCase() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('.project-row').forEach(function (row) {
    row.addEventListener('click', function () { openCase(row); });
    row.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openCase(row); }
    });
    row.setAttribute('tabindex', '0');
  });
  if (close) close.addEventListener('click', closeCase);
  var backdrop = document.querySelector('.case-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeCase);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeCase();
  });
}());
