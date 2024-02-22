import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import { connectDb } from './config/db';
import { stripe } from './config/stripe';
import { swaggerDocs } from './config/swagger';
import { User } from './models/user/user.mongo';
import routes from './routes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(compression());
app.use(cookieParser());

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      switch (event.type) {
        case 'invoice.payment_succeeded':
          const session = event.data.object;
          const user = await User.findOne({ customerId: session.customer });
          user.subscription = session.subscription.toString();
          user.save();
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      console.log(err.message);
    }
  }
);

app.use(bodyParser.json());
app.use(morgan('dev'));

const server = http.createServer(app);
const PORT = process.env.PORT || 5001;

app.use('/api/v1', routes());

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
  });
}

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  connectDb();
  swaggerDocs(app);
});
