import Stripe from 'stripe';
import { stripe } from '../config/stripe';
import { Request, Response } from 'express';


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
    const { cart, customerId } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: cart.map((item:any) => ({
      price: item.id,
      quantity: item.quantity,
    })),
    customer:customerId,
    allow_promotion_codes:true,
    success_url:
      'http://localhost:3000/account?session_id={CHECKOUT_SESSION_ID}',
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