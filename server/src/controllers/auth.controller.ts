import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { stripe } from '../config/stripe';
import { generateToken } from '../helpers';
import {
  createUser,
  getUserByEmail,
  getUserByRefreshToken,
} from '../models/user/user.model';


/* 
?@desc   Register a user
*@route  Post /api/v1/auth/register
*@access Public
*/
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName,email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = await stripe.customers.create({
      email: req.body.email,
      name: `${firstName} ${lastName}`,
    });

    const user = await createUser({
      email,
      firstName, 
      lastName,
      password: hashedPassword,
      // subscription: {
      //   plan: 'BASIC',
      //   startDate: new Date(),
        customerId: customer.id
      // }
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error('User registration failed - ', error.message);
    return res.status(500).json('Internal Server Error');
  }
};

/* 
?@desc   Login a user
*@route  Post /api/auth/login
*@access Public
*/

export const login = async (req: Request, res: Response) => {
  try {
    const { cookies } = req;
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    const foundUser = await getUserByEmail(email);

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      const accessToken = generateToken(
        foundUser._id,
        '1d',
        process.env.JWT_SECRET
      );
      const newRefreshToken = generateToken(
        foundUser._id,
        '1d',
        process.env.REFRESH_TOKEN_SECRET
      );

      let newRefreshTokenArray = !cookies?.jwt
        ? foundUser.refreshToken
        : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

      if (cookies?.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await getUserByRefreshToken(refreshToken);

        if (!foundToken) {
          newRefreshTokenArray = [];
        }

        res.clearCookie('jwt', {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
      }

      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });

      foundUser.password = undefined;

      res.status(200).json({ user: foundUser, token: accessToken });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* 
?@desc   Logout a user
*@route  Post /api/auth/logout
*@access Private
*/

export const logout = async (req: Request, res: Response) => {
  const { cookies } = req;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await getUserByRefreshToken(refreshToken);

    if (foundUser) {
      foundUser.refreshToken = foundUser.refreshToken.filter(
        (rt) => rt !== refreshToken
      );
      await foundUser.save();
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.status(204).json('User logged out successfully');
  } catch (error) {
    console.log('Logout failed', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* 
?@desc   Reset password
*@route  Post /api/auth/reset-password
*@access Private
*/

export const resetPassword = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User does not exists' });
  
    // generate salt and hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update user's password in database
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ error: 'Error occurred while resetting the password' });
  }
};