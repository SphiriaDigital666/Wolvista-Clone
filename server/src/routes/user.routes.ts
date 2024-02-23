import { validateEmail } from '../controllers/user.controller';
import { Router } from 'express';

export default (router: Router) => {
  /**
   * @swagger
   * /api/users/validate-email:
   *   get:
   *     summary: Validate an email
   *     tags: [Users]
   *     description: Validate the format of an email
   *     parameters:
   *       - in: query
   *         name: email
   *         required: true
   *         description: Email to be validated
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Email is valid
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 isValid:
   *                   type: boolean
   *       400:
   *         description: Invalid email format
   *       500:
   *         description: Internal Server Error
   */
  router.get('/users/validate-email', validateEmail);
};
