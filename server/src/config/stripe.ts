import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  appInfo: {
    // For sample support and debugging, not required for production:
    name: 'stripe-samples/subscription-use-cases/fixed-price',
    version: '0.0.1',
    url: 'https://github.com/stripe-samples/subscription-use-cases/fixed-price',
  },
});
