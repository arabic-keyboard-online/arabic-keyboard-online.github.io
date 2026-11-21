(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var toastEl = null;
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) toastEl = document.getElementById('toast');
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-9999px';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  function copy(text, message) {
    if (!text) { toast('Nothing to copy yet.'); return Promise.resolve(false); }
    var done = function () { toast(message || 'Copied to clipboard.'); return true; };
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(done, function () {
        if (legacyCopy(text)) return done();
        toast('Copy failed. Select the text and press Ctrl+C.');
        return false;
      });
    }
    if (legacyCopy(text)) return Promise.resolve(done());
    toast('Copy failed. Select the text and press Ctrl+C.');
    return Promise.resolve(false);
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, wait);
    };
  }

  function formatNumber(n) {
    return Number(n).toLocaleString('en-US');
  }

  // Header menus -----------------------------------------------------------
  var menuBtn = $('[data-menu-toggle]');
  var toolsMenu = $('[data-tools-menu]');
  var navBtn = $('[data-nav-toggle]');
  var mobileNav = $('[data-mobile-nav]');

  function closeMenu() {
    if (!toolsMenu || !menuBtn) return;
    toolsMenu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  function closeMobile() {
    if (!mobileNav || !navBtn) return;
    mobileNav.hidden = true;
    navBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    if (!toolsMenu) return;
    var open = toolsMenu.hidden;
    closeMobile();
    toolsMenu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  function toggleMobile() {
    if (!mobileNav) return;
    var open = mobileNav.hidden;
    closeMenu();
    mobileNav.hidden = !open;
    navBtn.setAttribute('aria-expanded', String(open));
  }

  if (menuBtn) menuBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleMenu(); });
  if (navBtn) navBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleMobile(); });
  if (toolsMenu) toolsMenu.addEventListener('click', function (e) { e.stopPropagation(); });
  if (mobileNav) {
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMobile();
    });
  }
  document.addEventListener('click', function () { closeMenu(); closeMobile(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); closeMobile(); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeMobile();
    if (window.innerWidth <= 900) closeMenu();
  });

  var year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  window.AR = {
    $: $,
    $$: $$,
    toast: toast,
    copy: copy,
    debounce: debounce,
    formatNumber: formatNumber
  };
})();
