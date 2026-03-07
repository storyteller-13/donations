/**
 * Fiat payment method: Stripe (card) and other fiat options.
 * Config: APP_CONFIG.fiat.stripe.link. Text: APP_TEXT.fiat.stripe.*
 */
(function () {
  'use strict';

  var Donation = window.Donation;
  if (!Donation) return;

  function render(container, config, text) {
    var get = Donation.get;
    var escapeHtml = Donation.escapeHtml;

    var section = document.createElement('section');
    section.className = 'card card-fiat';
    section.setAttribute('aria-labelledby', 'fiat-title');

    var iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h.01M10 15h.01M14 15h.01M18 15h.01"/></svg>';
    var title = get(text, 'fiat.title') || 'donate with fiat';
    var description = get(text, 'fiat.description') || 'donate with card or other fiat options.';

    section.innerHTML =
      '<div class="card-header">' +
      '<div class="card-icon" aria-hidden="true">' + iconSvg + '</div>' +
      '<h2 id="fiat-title" data-text="fiat.title">' + escapeHtml(title) + '</h2>' +
      '</div>' +
      '<p data-text="fiat.description">' + escapeHtml(description) + '</p>' +
      '<div class="fiat-options" id="fiat-options"></div>';

    var optionsEl = section.querySelector('#fiat-options');
    var fiatConfig = (config && config.fiat) ? config.fiat : {};

    // Stripe option: always show block; button only when link is set
    var stripeConfig = fiatConfig.stripe || {};
    var stripeLink = stripeConfig.link || '';
    var stripeTitle = get(text, 'fiat.stripe.title') || 'card (stripe)';
    var stripeDesc = get(text, 'fiat.stripe.description') || 'donate securely with any major credit or debit card.';

    var stripeBlock = document.createElement('div');
    stripeBlock.className = 'fiat-option fiat-option-stripe';
    stripeBlock.innerHTML =
      '<div class="fiat-option-header">' +
      '<span class="fiat-option-title" data-text="fiat.stripe.title">' + escapeHtml(stripeTitle) + '</span>' +
      '</div>' +
      '<p class="fiat-option-desc" data-text="fiat.stripe.description">' + escapeHtml(stripeDesc) + '</p>' +
      '<div class="fiat-actions" id="fiat-stripe-actions"></div>';

    var stripeActions = stripeBlock.querySelector('#fiat-stripe-actions');
    if (stripeLink) {
      var btnLabel = get(text, 'fiat.stripe.button') || 'donate with stripe';
      var btn = document.createElement('a');
      btn.href = stripeLink;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      btn.className = 'btn btn-primary';
      btn.textContent = btnLabel;
      btn.setAttribute('data-text', 'fiat.stripe.button');
      stripeActions.appendChild(btn);
    } else {
      var placeholder = document.createElement('span');
      placeholder.className = 'fiat-option-placeholder';
      placeholder.textContent = 'Set config.fiat.stripe.link to enable.';
      stripeActions.appendChild(placeholder);
    }

    optionsEl.appendChild(stripeBlock);
    container.appendChild(section);
  }

  Donation.registerMethod({ id: 'fiat', render: render });
})();
