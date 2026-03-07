(function () {
  'use strict';

  var text = typeof window.APP_TEXT !== 'undefined' ? window.APP_TEXT : {};
  var config = typeof window.APP_CONFIG !== 'undefined' ? window.APP_CONFIG : {};
  var payMethods = window.DONATION_PAY_METHODS || [];
  var get = window.Donation && window.Donation.get;

  function applyTextConfig() {
    document.title = (get && get(text, 'pageTitle')) || document.title;

    document.querySelectorAll('[data-text]').forEach(function (el) {
      var value = get && get(text, el.getAttribute('data-text'));
      if (value != null) el.textContent = value;
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
      var copyLabel = (get && get(text, 'crypto.copy')) || 'Copy';
      var copiedLabel = (get && get(text, 'crypto.copied')) || 'Copied!';
      var failedLabel = (get && get(text, 'crypto.failed')) || 'Failed';
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
