# donations.vonsteinkirch.com

a static, single-page donation site with **stripe** (card/fiat) and **cryptocurrency** (bitcoin, ethereum, cardano, etc.). no backend required.

## quick start

1. **configure** — edit `config/config.js` with your stripe payment link and crypto addresses; edit `config/text.js` for page copy.
2. **serve** — open `index.html` in a browser or run a static server (e.g. `make server`).
3. **deploy** — push to github pages, netlify, vercel, or any static host.

## configuration

### fiat (stripe)

- in [stripe dashboard](https://dashboard.stripe.com), create a **payment link** (or use an existing one).
- copy the link (e.g. `https://buy.stripe.com/...`) into `config/config.js` under `fiat.stripe.link`.
- stripe hosts checkout; no backend needed.

### crypto

- in `config/config.js`, under `crypto.addresses`, set `address` and `label` for each chain you accept.
- add or remove chains by editing that object. the page renders one card per address with copy buttons.

### text

- all user-facing strings live in `config/text.js`: page title, header, tagline, section titles, button labels, and copy-button text.

## development

**local server:** `make server` (default port 8033) or `python3 -m http.server 8033`.

pre-commit runs `npm run check` via husky.

## license

use and modify as you like.
