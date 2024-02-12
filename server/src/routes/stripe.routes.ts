import { Router } from 'express';
import { billingPortal, createCheckout, getConfig, handleWebhookEvents } from '../controllers/stripe.controller';

export default (router: Router) => {
  /**
   * @swagger
   * tags:
   *   name: Stripe
   *   description: Stripe integration
   */

  /**
   * @swagger
   * /api/stripe/config:
   *   get:
   *     summary: Get Stripe configuration
   *     tags: [Stripe]
   *     description: Retrieve the configuration for Stripe
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Stripe configuration
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */
  router.get('/stripe/config', getConfig);
  router.post('/stripe/checkout', createCheckout);
  router.post('/stripe/billing', billingPortal);
  router.post('/stripe/webhook', handleWebhookEvents);
};
