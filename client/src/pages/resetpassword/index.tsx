import React from "react";

import { Button, Card, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import ShoppingCart from "../../components/ShoppingCart";
import PasswordUpdated from "./components/password_updated";
function Index() {
  return (
    <div className="bg-[#060606] h-max">
      <section>
        <>
          <div className="flex items-center justify-center mb-6">
            {/* <img src={LOGO} alt="aad" className="w-[150px] object-contain" /> */}
          </div>
          <Card
            color="white"
            className="m-4 sm:mb-0 sm:w-[25rem] grid px-8 pt-8 pb-8"
          >
            <div className="flex items-center justify-center mb-6">
              {/* <img
                src={FORGOT_PASS_ICON}
                alt="aad"
                className="object-scale-down w-[80px]"
              /> */}
            </div>

            <h2 className="text-[25px] text-primary text-center mb-4">
              Forgot Password?
            </h2>

            <p className="text-primary_font_color text-center">
              Enter your email, and we'll send you an OTP to reset your password
            </p>
            <form className="mt-8 mb-2 w-full max-w-screen-lg">
              <div className="mb-1 flex flex-col gap-5">
                <div>
                  <Input
                    placeholder="Enter your email here"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 !bg-input_background rounded-full"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin="anonymous"
                  />
                </div>
              </div>

              <Button
                className="mt-6 bg-primary rounded-full"
                fullWidth
                type="submit"
              >
                <h6 className="normal-case">Request</h6>
              </Button>

              <div className="flex items-center justify-center gap-2 mt-6">
                <MdArrowBackIosNew className="text-[#8645FF]" />

                <Link to="/sign-in">
                  <p className="text-[14px] text-[#8645FF] mt-0.5">
                    Back to Login
                  </p>
                </Link>
              </div>
            </form>
          </Card>
        </>
      </section>
    </div>
  );
}

export default Index;
