/**
 * Donation app config: API keys, payment links, and crypto addresses.
 * Edit this file to add or change payment options; the page renders from this config.
 */
window.APP_CONFIG = {
  fiat: {
    stripe: {
      link: 'https://buy.stripe.com/eVqdR38R48dkcbhe3L0Fi00',
    },
  },
  crypto: {
    addresses: {
      bitcoin: {
        address: 'bc1q6yrkch06uwmkkesy5fvfvj00kzm3cqld0w7znu',
        label: 'bitcoin',
      },
      ethereum: {
        address: '0xe54E5a3ACaa91a2EbFa26cD21372BF9f7E1F1c22',
        label: 'ethereum',
      },
      cardano: {
        address: 'addr1qxdysr0kh68u63zt5mpk7d5kt8an5n3rxs3t0k2t02sz8e4rhf003andeq6vn9ga4p5dqtkczgnmz0xt3zt2ju7edlws7yfpz0',
        label: 'cardano',
      },
      tron: {
        address: 'TFT1PY2pMaf1czd6MsUuziossBD73sZBRJ',
        label: 'tron',
      },
      ripple: {
        address: 'rNyCCdva7q12PBGqe6xYD9fLCZ5yEMjebP',
        label: 'xrp',
      },
      near: {
        address: 'fc5de7f6f607f872232e8491a755a5a9656d076ce35d2d5dab800c7250900cb4',
        label: 'near',
      },
      ton: {
        address: 'UQA-EpweW4yj_SJD-8SMAx74oUDMqDOW4YVc_ut4TzXog5nl',
        label: 'ton',
      },
      zcash: {
        address: 't1em7Vhge9HKi9BYoBi1tADg2eMe5zj3Fvf',
        label: 'zcash',
      },
    },
  },
};
