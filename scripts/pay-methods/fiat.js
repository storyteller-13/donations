(function () {
  'use strict';

  window.DONATION_PAY_METHODS = window.DONATION_PAY_METHODS || [];

  function get(obj, path) {
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

  function render(container, config, text) {
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
      '<div class="fiat-actions" id="fiat-actions"></div>';

    var actionsEl = section.querySelector('#fiat-actions');
    var fiatConfig = (config && config.fiat) ? config.fiat : {};
    var stripeLink = fiatConfig.stripe && fiatConfig.stripe.link ? fiatConfig.stripe.link : '';

    if (stripeLink) {
      var btnLabel = get(text, 'fiat.stripe.button') || 'donate with stripe';
      var btn = document.createElement('a');
      btn.href = stripeLink;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      btn.className = 'btn btn-primary';
      btn.textContent = btnLabel;
      btn.setAttribute('data-text', 'fiat.stripe.button');
      actionsEl.appendChild(btn);
    }

    container.appendChild(section);
  }

  window.DONATION_PAY_METHODS.push({ render: render });
})();
