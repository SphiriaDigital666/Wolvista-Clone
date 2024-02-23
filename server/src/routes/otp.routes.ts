import { Router } from 'express';
import { sendOtpEmail, verifyOTP } from '../controllers/otp.controller';

export default (router: Router) => {
  /**
   * @swagger
   * /otp/send-otp:
   *   post:
   *     summary: Send OTP email
   *     tags: [Email]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: OTP sent successfully
   */

  router.post('/otp/send-otp', sendOtpEmail);

  /**
   * @swagger
   * /otp/verify-otp:
   *   post:
   *     summary: Verify OTP
   *     tags: [Email]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               otp:
   *                 type: string
   *     responses:
   *       200:
   *         description: OTP verified successfully
   */

  router.post('/otp/verify-otp', verifyOTP);
};
