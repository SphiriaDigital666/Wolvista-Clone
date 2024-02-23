import React, { Button, Card, Input } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
// import { setOpt } from '../../../app/features/otp/otpSlice';
// import { useAppDispatch } from '../../../app/hooks';
import FORGOT_PASS_ICON from "../../../assets/passwordReset/password_updated.png";
// import LOGO from "../../../assets/IconGradient.png";
import api from "../../../utils/api";
import "../../../components/leaklight.css";
import useOptStore from "../../../store/otpStore";

interface ValidateEmailProps {
  handleNextStep: () => void;
}

const ValidateEmail: FC<ValidateEmailProps> = ({ handleNextStep }) => {
  // const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [message, setMessage] = useState("");

  const { setOpt} = useOptStore();

  useEffect(() => {
    const validateEmail = async () => {
      try {
        const { data } = await api.get(`/users/validate-email?email=${email}`);
        setIsEmailValid(data.isValid);
        setMessage(data.message);
      } catch (error) {
        setIsEmailValid(false);
        setMessage("Error validating email");
      }
    };

    // Trigger API call only if the email is not empty
    if (email.trim()) {
      validateEmail();
    } else {
      setIsEmailValid(false);
      setMessage("Email is required");
    }
  }, [email]);

  const handlePwResetRequest = async () => {
    try {
      const { data } = await api.post(`/otp/send-otp`, { email });

      if (data.message === "Previous OTP is still valid") {
        // If the message is 'Previous OTP is still valid', go to the next step
        handleNextStep();
      } else {
        // If it's a different message, reset OTP value and proceed to the next step
        // dispatch(setOpt({ OTPValue: '', email }));
        setOpt({ OTPValue: '', email })
        handleNextStep();
      }
    } catch (error: any) {
      // Handle errors here
      if (error.response && error.response.status === 400) {
        // If the error status is 400, check the error message
        const errorMessage = error.response.data.message;

        if (errorMessage === "Previous OTP is still valid") {
          // If the message is 'Previous OTP is still valid', go to the next step
          handleNextStep();
        } else {
          console.error("Error sending OTP:", errorMessage);
        }
      } else {
        // Handle other types of errors
        console.error("Error sending OTP:", error);
      }
    }
  };

  return (
    <>
      <div>
        <div className="rainbow-gradient-circle"></div>
        <div className="rainbow-gradient-circle theme-pink"></div>
      </div>
      <Card
        color="white"
        className="m-4 sm:mb-0 sm:w-[25rem] grid px-8 pt-8 pb-8 bg-[#1f1f1f]"
      >
        <div className="flex items-center justify-center mb-6">
          <img
            src={FORGOT_PASS_ICON}
            alt="aad"
            className="object-scale-down w-[80px]"
          />
        </div>

        <h2 className="text-[25px] text-white text-center mb-4">
          Forgot Password?
        </h2>

        <p className="text-white text-center">
          Enter your email, and we'll send you an OTP to reset your password
        </p>
        <form
          className="mt-8 mb-2 w-full max-w-screen-lg"
          onSubmit={(e) => {
            e.preventDefault();
            handlePwResetRequest();
          }}
        >
          <div className="mb-1 flex flex-col gap-5">
            <div className="w-full">
              <Input
                type="email"
                placeholder="Enter your email here"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin="anonymous"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {message && (
              <p
                className={`text-${
                  isEmailValid ? "green-500" : "red-500"
                } font-semibold`}
              >
                {message}
              </p>
            )}
          </div>

          <Button
            className="w-full mb-4 bg-gradient-to-r from-[#5D4FCA] to-[#13EAFD] "
            type="submit"
            disabled={!isEmailValid}
          >
            <h6 className="normal-case text-white">Request</h6>
          </Button>

          <div className="flex items-center justify-center gap-2 mt-6">
            <MdArrowBackIosNew className="text-white" />

            <Link to="/">
              <p className="text-[14px] text-white mt-0.5">Back to Login</p>
            </Link>
          </div>
        </form>
      </Card>
    </>
  );
};

export default ValidateEmail;
