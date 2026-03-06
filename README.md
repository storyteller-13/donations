# Donation Page

A simple, single-page donation site that supports **Stripe**, **PayPal**, and **cryptocurrency** (Bitcoin, Ethereum/USDC).

## Quick start

1. Open `index.html` in a browser (or serve the folder with any static server).
2. Replace placeholders with your real Stripe link, PayPal client ID, and crypto addresses (see below).

## Setup

### Stripe

1. In [Stripe Dashboard](https://dashboard.stripe.com), go to **Product catalog** → create a **Payment link** (or use an existing one).
2. Set the amount (e.g. “Customer chooses amount” for flexible donations).
3. Copy the payment link (e.g. `https://buy.stripe.com/...`).
4. In `index.html`, replace `YOUR_STRIPE_PAYMENT_LINK` in the “Donate with Stripe” button href with your link.

No backend required; Stripe hosts the checkout.

### PayPal

1. Create an app in the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) and get the **Client ID** (use Sandbox for testing).
2. In `index.html`, find the PayPal script tag and replace `YOUR_PAYPAL_CLIENT_ID` with your Client ID.
3. The page uses a default donation of **$10 USD**. To change it, edit the `value` in `script.js` inside the `createOrder` `purchase_units` (e.g. `value: '25.00'`).

For production, switch to a Live app and use the Live Client ID.

### Cryptocurrency

1. In `index.html`, replace the placeholder addresses:
   - **Bitcoin:** update the `id="btc-address"` element with your BTC address (e.g. `bc1q...`).
   - **Ethereum / USDC:** update the `id="eth-address"` element with your ETH (or shared) address (e.g. `0x...`).
2. Donors copy the address and send from their wallet. Optionally add QR codes later by generating them from these addresses.

## Project structure

- `index.html` — main page and payment sections
- `styles.css` — layout and theme
- `script.js` — copy-to-clipboard for crypto, PayPal button render

## Serving locally

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .

# Then open http://localhost:8000
```

PayPal’s SDK may require HTTPS or `localhost` in production; use a tunnel (e.g. ngrok) if you test from another device.
