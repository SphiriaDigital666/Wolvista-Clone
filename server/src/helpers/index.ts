import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb';


const SECRET = process.env.SECRET;

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};

export const generateToken = (
  id: ObjectId | string,
  exp: string,
  secret: string
) => {
  const idString = typeof id === 'string' ? id : id.toString();

  return jwt.sign({ id: idString }, secret, {
    expiresIn: exp || '30d',
  });
};