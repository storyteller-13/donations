(function () {
  'use strict';

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
