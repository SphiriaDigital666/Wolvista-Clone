import Stripe from 'stripe';

export const stripe = new Stripe(
  'sk_test_51OhuhHGp1WWvZ4zJMo1AuVKv157cvWMyHSi9g1m6SCcJskrRO9FZNQo1q42lSbNQVmZE2He1zKgbxDHcyyeuQJ5D001TJtBwkS',
  {
    apiVersion: '2023-10-16',
    appInfo: {
      // For sample support and debugging, not required for production:
      name: 'stripe-samples/subscription-use-cases/fixed-price',
      version: '0.0.1',
      url: 'https://github.com/stripe-samples/subscription-use-cases/fixed-price',
    },
  }
);
