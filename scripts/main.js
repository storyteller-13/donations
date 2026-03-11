(function () {
  'use strict';

  var THEME_KEY = 'donation-theme';
  var themes = ['cypher', 'murica'];

  function themeFromUrl() {
    var hash = (location.hash || '').slice(1).toLowerCase();
    var q = (new URLSearchParams(location.search)).get('theme');
    if (hash === 'murica' || q === 'murica') return 'murica';
    return null;
  }

  function getStoredTheme() {
    try {
      var t = localStorage.getItem(THEME_KEY);
      return themes.indexOf(t) >= 0 ? t : 'cypher';
    } catch (e) {
      return 'cypher';
    }
  }

  function getInitialTheme() {
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
    } catch (e) {}
    if (theme === 'murica') {
      if (location.hash !== '#murica') history.replaceState(null, '', location.pathname + location.search + '#murica');
    } else {
      if (location.hash === '#murica') history.replaceState(null, '', location.pathname + location.search);
    }
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-theme') === theme ? 'true' : 'false');
    });
  }

  var initial = getInitialTheme();
  if (initial === 'cypher') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', initial);
  }
  document.querySelectorAll('.theme-btn').forEach(function (btn) {
    btn.setAttribute('aria-pressed', btn.getAttribute('data-theme') === initial ? 'true' : 'false');
    btn.addEventListener('click', function () {
      var theme = this.getAttribute('data-theme');
      if (themes.indexOf(theme) >= 0) setTheme(theme);
    });
  });
  window.addEventListener('hashchange', function () {
    var fromUrl = themeFromUrl();
    if (fromUrl) setTheme(fromUrl);
  });

  var text = typeof window.APP_TEXT !== 'undefined' ? window.APP_TEXT : {};
  var config = typeof window.APP_CONFIG !== 'undefined' ? window.APP_CONFIG : {};
  var get = window.Donation && window.Donation.get;

  function applyTextConfig() {
    document.title = (get && get(text, 'pageTitle')) || document.title;

    document.querySelectorAll('[data-text]').forEach(function (el) {
      var value = get && get(text, el.getAttribute('data-text'));
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
