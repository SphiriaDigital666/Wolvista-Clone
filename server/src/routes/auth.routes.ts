import { login, logout, register } from '../controllers/auth.controller';
import { Router } from 'express';

export default (router: Router) => {
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User registered successfully
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  router.post('/auth/register', register);

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Log in a user
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User logged in successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  router.post('/auth/login', login);

  /**
   * @swagger
   * /api/auth/logout:
   *   post:
   *     summary: Log out a user
   *     tags:
   *       - Authentication
   *     responses:
   *       200:
   *         description: User logged out successfully
   *       500:
   *         description: Internal server error
   */
  router.post('/auth/logout', logout);
};
