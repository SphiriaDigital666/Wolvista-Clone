import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(
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

/* 
?@desc   Get config
*@route  Get /api/stripe/config
*@access Private
*/

export const getConfig = async (req:Request, res:Response) => {
  const prices = await stripe.prices.list({
    lookup_keys: [
      'ADVANCED PLAN',
      'VIDEO ON DEMAND',
      'GRAPHICS ON DEMAND',
      'KICK STARTER PLUS',
      'KICK STARTER',
    ],
    expand: ['data.product'],
  });

  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    prices: prices.data,
  });
};

/* 
?@desc   Create Checkout Session
*@route  Post /api/stripe/checkout
*@access Private
*/

export const createCheckout = async(req:Request, res:Response)=>{
    const {cart} = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: cart.map((item:any) => ({
      price: item.id,
      quantity: item.quantity,
    })),
    success_url:
      'http://localhost:3000/account/session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000',
  });
   res.send(session.url);
}

/* 
?@desc   Billing portal
*@route  Post /api/stripe/billing
*@access Private
*/

export const billingPortal = async(req:Request, res:Response)=>{
  const {customerId} = req.body
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: 'http://localhost:3000/account',
  });
  res.send(session.url);
}