import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Resend } from 'resend';
import { generateFiveDigitOTP, isValidEmail } from '../helpers';
import {
  deleteOTPByEmail,
  getOTPByEmail,
  saveOTP,
} from '../models/otp/otp.model';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/* 
?@desc   Send OTP to user's email
*@route  POST /api/otp/send-otp
*@access Public
*/

export const sendOtpEmail = async (req: Request, res: Response) => {
  const OTP_EXPIRATION_TIME = 600;
  try {
    const { email } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingOTP = await getOTPByEmail(email);

    if (existingOTP) {
      // Check if the previous OTP has expired
      if (existingOTP.expirationTime.getTime() > Date.now()) {
        return res.status(400).json({ message: 'Previous OTP is still valid' });
      }
      // Remove the previous OTP if it has expired
      await deleteOTPByEmail(email);
    }

    const otp = generateFiveDigitOTP();
    const expirationTime = new Date(Date.now() + OTP_EXPIRATION_TIME * 1000);

    // Save new OTP data in MongoDB
    await saveOTP(email, otp, expirationTime);

    const emailContent = `
      <div style="background-color: #f3f1fb; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #8645FF; text-align: center;">Your OTP for Verification</h2>
        <p style="text-align: center;">Hello,</p>
        <p style="text-align: center;">Your OTP is: <strong>${otp}</strong>. It will expire in ${OTP_EXPIRATION_TIME} seconds.</p>
        <p style="text-align: center; color: #555;">Please use this OTP to complete the verification process.</p>
        <p style="text-align: center; color: #555;">If you didn't request this OTP, please ignore this email.</p>
        <p style="text-align: center; color: #555;">Best regards,<br/>Team Maplevistaa</p>
      </div>
    `;

    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Your OTP for Verification',
      html: emailContent,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Failed to send OTP - ', error.message);
    return res.status(500).json('Internal Server Error');
  }
};

/* 
?@desc   Verify OTP
*@route  POST /api/otp/verify-otp
*@access Public
*/
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, userEnteredOTP } = req.body;

    const otpData = await getOTPByEmail(email);

    if (!otpData || otpData.expirationTime.getTime() < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired or is invalid' });
    }

    if (userEnteredOTP === otpData.otp) {
      await deleteOTPByEmail(email); // Remove the used OTP
      res
        .status(200)
        .json({ message: 'OTP verified successfully', verified: true });
    } else {
      return res
        .status(400)
        .json({ message: 'Incorrect OTP', verified: false });
    }
  } catch (error) {
    console.error('Failed to verify OTP - ', error.message);
    return res.status(500).json('Internal Server Error');
  }
};
