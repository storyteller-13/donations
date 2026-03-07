/**
 * Donation app config: API keys, payment links, and crypto addresses.
 * Edit this file to add or change payment options; the page renders from this config.
 */
window.APP_CONFIG = {
  fiat: {
    stripe: {
      link: '', // e.g. 'https://buy.stripe.com/...'
    },
  },
  crypto: {
    addresses: {
      ethereum: {
        address: '0xf02F114C145d68d802aa15d19162FBd89f339d69',
        label: 'ethereum',
      },
      cardano: {
        address: 'addr1q8p7ecsn2ytgvc5e2sff7ufz07w6p4n8s3kvc4r23c9jcgy03uvd8uszlrez8wnm9lp5af2ft02mhnxpfry26utywc6qfldput',
        label: 'cardano',
      },
      bitcoin: {
        address: 'bc1q6nu6hzcx2tarrmkw38y3md9djflcac8fg62am0',
        label: 'bitcoin',
      },
      tron: {
        address: 'TJT5kh6bkioRhcZA99rhih7N1TYQrFatx5',
        label: 'tron',
      },
      solana: {
        address: 'FgLKXa6U4MVsZjjMuNCpeL4UVHp9R2bU31RdoSzzqWoD',
        label: 'solana',
      },
      ripple: {
        address: 'rLnfh5WAivTi4uo7ZZtBtvnwrKio34KMN8',
        label: 'ripple',
      },
      near: {
        address: '830f8d7c407b66d4da421cc192e2578858225d067b45123c5471535b0fd330a4',
        label: 'near',
      },
    },
  },
};
