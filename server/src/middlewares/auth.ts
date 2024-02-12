import jwt from 'jsonwebtoken'
import { User } from '../models/user/user.mongo';
import { NextFunction, Request, Response } from 'express';

export const protect = async (req:Request, res:Response, next:NextFunction) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // @ts-ignore
  if (authHeader?.startsWith('Bearer ')) {
    try {
      // @ts-ignore
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // @ts-ignore
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      res.status(401).json('Not authorized, token failed');
      // throw new Error('Not authorized, token failed');
    }
  } else if (!token) {
    res.status(401).json('Not authorized, no token');
    // throw new Error('Not authorized, no token');
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(401).json('Not authorized, as an admin');
    // throw new Error('Not authorized, as an admin');
  }
};

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};
