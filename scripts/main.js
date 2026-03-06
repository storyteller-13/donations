(function () {
  'use strict';

  // Copy crypto address to clipboard
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-copy');
      var el = document.getElementById(id);
      if (!el) return;
      var text = el.textContent.trim();
      navigator.clipboard.writeText(text).then(
        function () {
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        },
        function () {
          btn.textContent = 'Failed';
          setTimeout(function () {
            btn.textContent = 'Copy';
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
    paypal
      .Buttons({
        style: {
          shape: 'rect',
          color: 'blue',
          layout: 'vertical',
          label: 'donate',
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
                description: 'Donation',
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert('thank you for your donation, ' + (details.payer.name?.given_name || '') + '!');
          });
        },
        onError: function (err) {
          console.error('PayPal error:', err);
        },
      })
      .render('#paypal-button-container');
  } else {
    document.getElementById('paypal-button-container').innerHTML =
      '<p class="paypal-placeholder">add your paypal client id in <code>index.html</code> to enable the button.</p>';
  }
})();
