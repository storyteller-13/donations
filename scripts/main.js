(function () {
  'use strict';

  var text = typeof window.APP_TEXT !== 'undefined' ? window.APP_TEXT : {};

  function get(obj, path) {
    var keys = path.split('.');
    for (var i = 0; i < keys.length; i++) {
      if (obj == null) return undefined;
      obj = obj[keys[i]];
    }
    return obj;
  }

  function applyTextConfig() {
    document.title = text.pageTitle || document.title;

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

  // Copy crypto address to clipboard
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

  // PayPal donate button (only if SDK loaded and client ID is set)
  var paypalScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
  var paypalSrc = paypalScript ? paypalScript.getAttribute('src') : '';
  var hasValidClientId =
    paypalSrc && paypalSrc.includes('client-id=') && !paypalSrc.includes('YOUR_PAYPAL_CLIENT_ID');

  if (hasValidClientId && typeof paypal !== 'undefined') {
    var buttonLabel = get(text, 'paypal.buttonLabel') || 'donate';
    var orderDescription = get(text, 'paypal.orderDescription') || 'Donation';
    var thankYouTemplate = get(text, 'paypal.thankYou') || 'thank you for your donation, {name}!';
    paypal
      .Buttons({
        style: {
          shape: 'rect',
          color: 'blue',
          layout: 'vertical',
          label: buttonLabel,
        },
        createOrder: function (data, actions) {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: '10.00',
                },
                description: orderDescription,
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            var name = details.payer && details.payer.name && details.payer.name.given_name ? details.payer.name.given_name : '';
            var message = thankYouTemplate.replace('{name}', name);
            alert(message);
          });
        },
        onError: function (err) {
          console.error('PayPal error:', err);
        },
      })
      .render('#paypal-button-container');
  } else {
    var placeholderHtml = get(text, 'paypal.placeholderHtml') || 'add your paypal client id in <code>index.html</code> to enable the button.';
    document.getElementById('paypal-button-container').innerHTML =
      '<p class="paypal-placeholder">' + placeholderHtml + '</p>';
  }
})();
