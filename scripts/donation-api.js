/**
 * Donation API: registry for payment methods. Add new methods by calling
 * Donation.registerMethod({ id, render }) and loading your script before main.js.
 *
 * Adding a new method:
 *   1. Create scripts/pay-methods/my-method.js that calls:
 *      Donation.registerMethod({ id: 'my-method', render: function (container, config, text) {
 *        var get = Donation.get, escapeHtml = Donation.escapeHtml;
 *        // build DOM and container.appendChild(section);
 *      }});
 *   2. In index.html, add <script src="scripts/pay-methods/my-method.js"></script>
 *      after donation-api.js and before main.js.
 *
 * Helpers: Donation.get(obj, path), Donation.escapeHtml(str)
 */
(function () {
  'use strict';

  window.DONATION_PAY_METHODS = window.DONATION_PAY_METHODS || [];

  function get(obj, path) {
    if (obj == null) return undefined;
    var keys = path.split('.');
    for (var i = 0; i < keys.length; i++) {
      if (obj == null) return undefined;
      obj = obj[keys[i]];
    }
    return obj;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Register a payment method. spec.render(container, config, text) is called
   * when rendering the page. spec.id is optional (for ordering or debugging).
   */
  function registerMethod(spec) {
    if (spec && typeof spec.render === 'function') {
      window.DONATION_PAY_METHODS.push({ id: spec.id, render: spec.render });
    }
  }

  window.Donation = {
    registerMethod: registerMethod,
    get: get,
    escapeHtml: escapeHtml,
  };
})();
