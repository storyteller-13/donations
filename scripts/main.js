(function () {
  'use strict';

  var text = typeof window.APP_TEXT !== 'undefined' ? window.APP_TEXT : {};
  var config = typeof window.APP_CONFIG !== 'undefined' ? window.APP_CONFIG : {};
  var payMethods = window.DONATION_PAY_METHODS || [];

  function get(obj, path) {
    var keys = path.split('.');
    for (var i = 0; i < keys.length; i++) {
      if (obj == null) return undefined;
      obj = obj[keys[i]];
    }
    return obj;
  }

  function applyTextConfig() {
    document.title = get(text, 'pageTitle') || document.title;

    document.querySelectorAll('[data-text]').forEach(function (el) {
      var value = get(text, el.getAttribute('data-text'));
      if (value != null) el.textContent = value;
    });

    document.querySelectorAll('[data-aria-label]').forEach(function (el) {
      var value = get(text, el.getAttribute('data-aria-label'));
      if (value != null) el.setAttribute('aria-label', value);
    });
  }

  applyTextConfig();

  var container = document.getElementById('pay-methods');
  if (container) {
    for (var i = 0; i < payMethods.length; i++) {
      if (payMethods[i] && typeof payMethods[i].render === 'function') {
        payMethods[i].render(container, config, text);
      }
    }
  }

  applyTextConfig();

  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-copy');
      var el = document.getElementById(id);
      if (!el) return;
      var textToCopy = el.textContent.trim();
      var copyLabel = get(text, 'crypto.copy') || 'Copy';
      var copiedLabel = get(text, 'crypto.copied') || 'Copied!';
      var failedLabel = get(text, 'crypto.failed') || 'Failed';
      navigator.clipboard.writeText(textToCopy).then(
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
