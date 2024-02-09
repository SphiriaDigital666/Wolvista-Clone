import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));

const server = http.createServer(app);
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
