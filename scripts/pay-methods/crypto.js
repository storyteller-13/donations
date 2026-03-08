/**
 * Crypto payment method: list of chain addresses with copy buttons.
 * Config: APP_CONFIG.crypto.addresses. Text: APP_TEXT.crypto.*
 */
(function () {
  'use strict';

  var Donation = window.Donation;
  if (!Donation) return;

  function render(container, config, text) {
    var get = Donation.get;
    var escapeHtml = Donation.escapeHtml;

    var section = document.createElement('section');
    section.className = 'card card-crypto';
    section.setAttribute('aria-labelledby', 'crypto-title');

    var iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/><path d="M12 8v4l2 2"/></svg>';
    var title = get(text, 'crypto.title');
    if (title === undefined) title = 'pay with crypto';
    var description = get(text, 'crypto.description');
    if (description === undefined) description = 'we accept every cryptocurrency below. send to the address for your chain.';

    section.innerHTML =
      '<div class="card-header">' +
      '<div class="card-icon" aria-hidden="true">' + iconSvg + '</div>' +
      '<h2 id="crypto-title" data-text="crypto.title">' + escapeHtml(title) + '</h2>' +
      '</div>' +
      '<p data-text="crypto.description">' + escapeHtml(description) + '</p>' +
      '<div class="crypto-list" id="crypto-list"></div>';

    var listEl = section.querySelector('#crypto-list');
    var addresses = (config && config.crypto && config.crypto.addresses) ? config.crypto.addresses : {};
    var copyLabel = get(text, 'crypto.copy') || 'copy';
    var copyAria = get(text, 'crypto.copyAria') || 'Copy address';

    for (var key in addresses) {
      if (!addresses[key] || !addresses[key].address) continue;
      if (key.toLowerCase() === 'bitcoin') continue; /* bitcoin is in preferred */
      var item = addresses[key];
      var label = item.label || key;
      var id = 'address-' + key;
      var itemDiv = document.createElement('div');
      itemDiv.className = 'crypto-item';
      itemDiv.innerHTML =
        '<span class="crypto-label">' + escapeHtml(label) + '</span>' +
        '<div class="crypto-address-wrap">' +
        '<code class="crypto-address" id="' + escapeHtml(id) + '">' + escapeHtml(item.address) + '</code>' +
        '<button type="button" class="copy-btn" data-copy="' + escapeHtml(id) + '" aria-label="' + escapeHtml(copyAria + ' ' + label) + '">' + escapeHtml(copyLabel) + '</button>' +
        '</div>';
      listEl.appendChild(itemDiv);
    }

    container.appendChild(section);
  }

  Donation.registerMethod({ render: render, other: true });
})();
