import express from 'express';
import authentication from './auth.routes';
import stripe from './stripe.routes';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  stripe(router);
  return router;
};
