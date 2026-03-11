(function () {
  'use strict';

  var THEME_KEY = 'donation-theme';
  var themes = ['cypher', 'conservationism'];

  function themeFromUrl() {
    var hash = (location.hash || '').slice(1).toLowerCase();
    var q = (new URLSearchParams(location.search)).get('theme');
    if (hash === 'conservationism' || q === 'conservationism') return 'conservationism';
    return null;
  }

  function getStoredTheme() {
    try {
      var t = localStorage.getItem(THEME_KEY);
      return themes.indexOf(t) >= 0 ? t : 'cypher';
    } catch (e) { // eslint-disable-line no-unused-vars
      return 'cypher';
    }
  }

  function getInitialTheme() {
    var themeBtns = document.querySelectorAll('.theme-btn');
    if (themeBtns.length === 0) {
      return document.documentElement.getAttribute('data-theme') || 'cypher';
    }
    return themeFromUrl() || getStoredTheme();
  }

  function setTheme(theme) {
    if (theme === 'cypher') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {} // eslint-disable-line no-unused-vars
    var themeBtns = document.querySelectorAll('.theme-btn');
    if (themeBtns.length > 0) {
      if (theme === 'conservationism') {
        if (location.hash !== '#conservationism') history.replaceState(null, '', location.pathname + location.search + '#conservationism');
      } else {
        if (location.hash === '#conservationism') history.replaceState(null, '', location.pathname + location.search);
      }
      themeBtns.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-theme') === theme ? 'true' : 'false');
      });
    }
    if (typeof applyTextConfig === 'function') applyTextConfig();
  }

  var initial = getInitialTheme();
  if (initial === 'cypher') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', initial);
  }
  var themeBtns = document.querySelectorAll('.theme-btn');
  themeBtns.forEach(function (btn) {
    btn.setAttribute('aria-pressed', btn.getAttribute('data-theme') === initial ? 'true' : 'false');
    btn.addEventListener('click', function () {
      var theme = this.getAttribute('data-theme');
      if (themes.indexOf(theme) >= 0) setTheme(theme);
    });
  });
  if (themeBtns.length > 0) {
    window.addEventListener('hashchange', function () {
      var fromUrl = themeFromUrl();
      if (fromUrl) setTheme(fromUrl);
    });
  }

  var text = typeof window.APP_TEXT !== 'undefined' ? window.APP_TEXT : {};
  var config = typeof window.APP_CONFIG !== 'undefined' ? window.APP_CONFIG : {};
  var get = window.Donation && window.Donation.get;

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'cypher';
  }

  function applyTextConfig() {
    var theme = getCurrentTheme();
    var titleKey = theme === 'conservationism' ? 'conservationism.pageTitle' : 'pageTitle';
    document.title = (get && get(text, titleKey)) || document.title;

    document.querySelectorAll('[data-text]').forEach(function (el) {
      var key = el.getAttribute('data-text');
      var value;
      if (theme === 'conservationism' && (key === 'header.title' || key === 'header.tagline')) {
        value = get && get(text, 'conservationism.header.' + key.split('.')[1]);
      } else {
        value = get && get(text, key);
      }
      if (value != null) el.textContent = value;
    });
  }

  var preferredContainer = document.getElementById('preferred-methods');
  var otherContainer = document.getElementById('other-options');
  var preferredMethods = window.DONATION_PAY_METHODS_PREFERRED || [];
  var otherMethods = window.DONATION_PAY_METHODS_OTHER || [];

  if (preferredContainer) {
    for (var p = 0; p < preferredMethods.length; p++) {
      if (preferredMethods[p] && typeof preferredMethods[p].render === 'function') {
        preferredMethods[p].render(preferredContainer, config, text);
      }
    }
  }
  if (otherContainer) {
    for (var o = 0; o < otherMethods.length; o++) {
      if (otherMethods[o] && typeof otherMethods[o].render === 'function') {
        otherMethods[o].render(otherContainer, config, text);
      }
    }
  }

  applyTextConfig();

  var copyLabel = (get && get(text, 'crypto.copy')) || 'Copy';
  var copiedLabel = (get && get(text, 'crypto.copied')) || 'Copied!';
  var failedLabel = (get && get(text, 'crypto.failed')) || 'Failed';

  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-copy');
      var el = document.getElementById(id);
      if (!el) return;
      navigator.clipboard.writeText(el.textContent.trim()).then(
        function () {
          btn.textContent = copiedLabel;
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = copyLabel;
            btn.classList.remove('copied');
          }, 2000);
        },
        function () {
          btn.textContent = failedLabel;
          setTimeout(function () {
            btn.textContent = copyLabel;
          }, 2000);
        }
      );
    });
  });
})();
