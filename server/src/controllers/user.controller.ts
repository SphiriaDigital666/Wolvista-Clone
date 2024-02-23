import { Request, Response } from 'express';
import { getUserByEmail } from '../models/user/user.model';

/* 
?@desc   Validate email
*@route  GET /api/users/validate-email
*@access Public
*/

export const validateEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const user = await getUserByEmail(email as string);
    if (user) {
      return res
        .status(200)
        .json({ message: 'We found your account', isValid: true });
    } else {
      return res
        .status(400)
        .json({ message: 'We cannot find your account', isValid: false });
    }
  } catch (error) {
    console.error('Failed to remove user - ', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
