import { OTP } from './otp.mongo';

export const saveOTP = async (email:string, otp:string, expirationTime:Date) => {
  try {
    return await OTP.create({ email, otp, expirationTime });
  } catch (error) {
    throw new Error('Failed to save OTP data');
  }
};

export const getOTPByEmail = async (email:string) => {
  try {
    return await OTP.findOne({ email });
  } catch (error) {
    throw new Error('Failed to get OTP data by email');
  }
};

export const deleteOTPByEmail = async (email:string) => {
  try {
    return await OTP.deleteOne({ email });
  } catch (error) {
    throw new Error('Failed to delete OTP data by email');
  }
};
