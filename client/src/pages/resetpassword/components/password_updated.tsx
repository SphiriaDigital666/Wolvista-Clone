import React from "react";
import PASSWORD_UPDATED from "../../../assets/passwordReset/password_updated.png";
import { Button, Card, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

function PasswordUpdated() {
  return (
    <div className="bg-[#060606] h-max">
      <section>
        <div className=" h-screen">
          <div className="flex flex-col items-center justify-center h-screen ">
            <div>
              <div className="flex items-center justify-center mb-6">
                {/* <img
                  src={LOGO}
                  alt="aad"
                  className=" w-[150px] object-contain"
                /> */}
              </div>
              <Card
                color="white"
                className=" m-4 sm:mb-0 sm:w-[25rem]  grid  px-8 pt-8 pb-8"
              >
                <h2 className="text-[25px] text-primary text-center mb-4">
                  Password Updated
                </h2>
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={PASSWORD_UPDATED}
                    alt="aad"
                    className="object-scale-down w-[80px]"
                  />
                </div>

                <p className="text-primary_font_color text-center">
                  Your password has been updated!
                </p>

                <p className="text-primary_font_color text-center">
                  Sign in with your new password
                </p>

                <form className="mt-6 mb-2 w-full max-w-screen-lg ">
                  <Link to="/">
                    <Button
                      className="mt-6 bg-primary rounded-full"
                      fullWidth
                      type="submit"
                    >
                      <h6 className="normal-case">Login</h6>
                    </Button>
                  </Link>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PasswordUpdated;
