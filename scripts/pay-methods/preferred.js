/**
 * Preferred methods: Cash (Stripe) and Bitcoin.
 * Renders into the top "Preferred methods" block.
 */
(function () {
  'use strict';

  var Donation = window.Donation;
  if (!Donation) return;

  function render(container, config, text) {
    var get = Donation.get;
    var escapeHtml = Donation.escapeHtml;

    var section = document.createElement('section');
    section.className = 'card card-preferred';
    section.setAttribute('aria-labelledby', 'preferred-title');

    var preferredTitle = get(text, 'preferred.title');
    if (preferredTitle === undefined) preferredTitle = 'preferred methods';
    var preferredDescription = get(text, 'preferred.description');
    if (preferredDescription === undefined) preferredDescription = '';

    var cashLabel = get(text, 'preferred.cash');
    if (cashLabel === undefined) cashLabel = 'cash';
    var bitcoinLabel = get(text, 'preferred.bitcoin');
    if (bitcoinLabel === undefined) bitcoinLabel = 'bitcoin';

    var stripeLink = (config && config.fiat && config.fiat.stripe && config.fiat.stripe.link) ? config.fiat.stripe.link : '';
    var stripeBtnLabel = get(text, 'fiat.stripe.button') || 'donate with stripe';

    var bitcoinAddr = (config && config.crypto && config.crypto.addresses && config.crypto.addresses.bitcoin)
      ? config.crypto.addresses.bitcoin
      : null;
    var copyLabel = get(text, 'crypto.copy') || 'copy';
    var copyAria = get(text, 'crypto.copyAria') || 'Copy address';

    var iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';

    var html =
      '<div class="card-header">' +
      '<div class="card-icon" aria-hidden="true">' + iconSvg + '</div>' +
      '<h2 id="preferred-title" data-text="preferred.title">' + escapeHtml(preferredTitle) + '</h2>' +
      '</div>';
    if (preferredDescription) {
      html += '<p data-text="preferred.description">' + escapeHtml(preferredDescription) + '</p>';
    }
    html += '<div class="preferred-grid">';

    // Cash (Stripe)
    html += '<div class="preferred-item preferred-cash">';
    html += '<span class="preferred-item-label">' + escapeHtml(cashLabel) + '</span>';
    html += '<div class="preferred-item-actions">';
    if (stripeLink) {
      html += '<a href="' + escapeHtml(stripeLink) + '" target="_blank" rel="noopener noreferrer" class="btn" data-text="fiat.stripe.button">' + escapeHtml(stripeBtnLabel) + '</a>';
    } else {
      html += '<span class="fiat-option-placeholder">Set config.fiat.stripe.link to enable.</span>';
    }
    html += '</div></div>';

    // Bitcoin
    html += '<div class="preferred-item preferred-bitcoin">';
    html += '<span class="preferred-item-label">' + escapeHtml(bitcoinLabel) + '</span>';
    html += '<div class="preferred-item-actions">';
    if (bitcoinAddr && bitcoinAddr.address) {
      var id = 'address-bitcoin';
      html += '<div class="crypto-address-wrap">';
      html += '<code class="crypto-address" id="' + id + '">' + escapeHtml(bitcoinAddr.address) + '</code>';
      html += '<button type="button" class="copy-btn" data-copy="' + id + '" aria-label="' + escapeHtml(copyAria + ' ' + (bitcoinAddr.label || 'bitcoin')) + '">' + escapeHtml(copyLabel) + '</button>';
      html += '</div>';
    } else {
      html += '<span class="fiat-option-placeholder">No Bitcoin address in config.</span>';
    }
    html += '</div></div>';

    html += '</div>';
    section.innerHTML = html;
    container.appendChild(section);
  }

  Donation.registerMethod({ render: render, preferred: true });
})();
