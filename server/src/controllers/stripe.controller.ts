import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../config/stripe';

/* 
?@desc   Get config
*@route  Get /api/stripe/config
*@access Private
*/

export const getConfig = async (req: Request, res: Response) => {
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

  // Sort prices.data array based on the price value in ascending order
  prices.data.sort((a, b) => a.unit_amount - b.unit_amount);

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

export const createCheckout = async (req: Request, res: Response) => {
  const { cart, customerId } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: cart.map((item: any) => ({
      price: item.id,
      quantity: item.quantity,
    })),
    customer: customerId,
    allow_promotion_codes: true,
    success_url:
      'http://localhost:3000/account?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000',
  });
  res.send(session.url);
};

/* 
?@desc   Billing portal
*@route  Post /api/stripe/billing
*@access Private
*/

export const billingPortal = async (req: Request, res: Response) => {
  const { customerId } = req.body;
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: 'http://localhost:3000/account',
  });
  res.send(session.url);
};

/* 
?@desc   Handle Webhook events
*@route  Post /api/stripe/webhook
*@access Public
*/

export const handleWebhookEvents = async (req: Request, res: Response) => {
  // @ts-ignore
  const payload = req['rawBody'] || ''; // Use rawBody instead of body
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET
    );

    // Handle specific event type
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle the subscription completion, update user plan or other necessary actions
        // You can use session.customer, session.subscription, etc., to get relevant details
        // Update user plan logic goes here
        console.log(`Checkout session completed for ${session.customer}`);
        break;
      // Add more cases for other webhook events if needed

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Error handling webhook event:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

/* 
?@desc   Get user subscriptions 
*@route  Post /api/stripe/subscriptions
*@access Private
*/

export const userSubscriptions = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.body;
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
    });

    const subscriptionsWithProducts = await Promise.all(
      subscriptions.data.map(async (subscription) => {
        const productItems = await Promise.all(
          subscription.items.data.map(async (item) => {
            // Retrieve product information from the item's price property
            const product = await stripe.products.retrieve(
              item.price.product as string
            );

            // Retrieve price information for the product
            const price = await stripe.prices.retrieve(item.price.id);

            // Access the product features, unit_amount, or any other relevant information
            const productFeatures = product.features;
            const unitAmount = price.unit_amount;

            return {
              product_id: product.id,
              product_name: product.name,
              features: productFeatures,
              unit_amount: unitAmount,
              // Add any other product information you need
            };
          })
        );

        return {
          subscription_id: subscription.id,
          status: subscription.status,
          current_period_start: subscription.current_period_start,
          current_period_end: subscription.current_period_end,
          products: productItems,
          // Add any other subscription information you need
        };
      })
    );

    res.status(200).json(subscriptionsWithProducts);
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/* 
?@desc   Create a Customer Portal
*@route  POST /api/stripe/portal
*@access Private
*/

export const createCustomerPortal = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.body;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/account'
          : 'https://www.avbids.com/billing',
    });
    res.status(200).json(session);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};