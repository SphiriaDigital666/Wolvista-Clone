import express from 'express';
import authentication from './auth.routes';
import otp from './otp.routes';
import stripe from './stripe.routes';
import user from './user.routes';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  stripe(router);
  user(router);
  otp(router);
  return router;
};
