import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input } from "@material-tailwind/react";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import resetPassowrd from "../../../assets/passwordReset/reset_password.png";
import {
  ResetPasswordFormSchema,
  ResetPasswordFormValues,
} from "../../../lib/validation";
import useOptStore from "../../../store/otpStore";
import api from "../../../utils/api";

interface ResetPasswordProps {
  handleNextStep: () => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({ handleNextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { email } = useOptStore();

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    try {
      await api.post("auth/reset-password", {
        email,
        password: values.newPassword,
      });
      handleNextStep();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-screen">
      <div className="flex flex-col items-center justify-center h-screen ">
        <div>
          {/* <div className="flex items-center justify-center mb-6">
            <img
              src={LOGO}
              alt="aad"
              className="w-[150px]
               object-contain"
            />
          </div> */}
          <Card
            color="white"
            className="m-4 sm:mb-0 sm:w-[25rem] grid px-8 pt-8 pb-8 bg-[#1f1f1f]"
          >
            <div className="flex items-center justify-center mb-6">
              <img
                src={resetPassowrd}
                alt="aad"
                className="object-scale-down w-[80px]"
              />
            </div>

            <h2 className="text-[25px] text-white text-center mb-4">
              New Credentials
            </h2>

            <p className="text-primary_font_color text-center text-white">
              Your identity has been verified!
            </p>

            <p className="text-primary_font_color text-center text-white">
              Set your new password
            </p>

            <form
              className="mt-8 mb-2 w-full max-w-screen-lg"
              onSubmit={handleSubmit(handleResetPassword)}
            >
              <div className="flex items-center gap-6 justify-between"></div>
              <div className="w-full bg-input_background rounded-full mb-4">
                <Input
                  type="password"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  crossOrigin="anonymous"
                  placeholder="New Password"
                  {...register("newPassword")}
                />
              </div>
              <div className="w-full bg-input_background rounded-full">
                <Input
                  type="password"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  crossOrigin="anonymous"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
              </div>
              {errors.newPassword && (
                <p className="text-red-500 mt-2">
                  {errors.newPassword.message}
                </p>
              )}
              {errors.confirmPassword && (
                <p className="text-red-500 mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}

              <Button
                className="w-full mb-4 bg-gradient-to-r from-[#5D4FCA] to-[#13EAFD] mt-6"
                fullWidth
                type="submit"
                disabled={!isValid}
              >
                <h6 className="normal-case">Reset Password</h6>
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
