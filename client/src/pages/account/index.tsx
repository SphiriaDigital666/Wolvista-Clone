import React from "react";

import LOGO from "../../assets/Icon Gradient.png";
import { Input } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

function AccountPage() {
  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="bg-[#212942] w-max px-12 border-y-4 border-[#17e0fa] ">
          <div className="flex items-center justify-center gap-4 mt-16 mb-1">
            <img src={LOGO} className="w-[40px]" alt="Maple vista logo" />
            <p className="text-[20px] text-[#5264d0]">MapleVistaa</p>
          </div>
          <p className="text-[14px] mb-8 text-center text-[#c8c8d9] font-medium">
            Sign in to your account
          </p>
          <div className="mb-8">
            <Input label="Username" crossOrigin="" />
          </div>

          <div className="mb-2">
            <Input
              type="password"
              label="Password"
              className="bg-[#262e49] !important"
              crossOrigin=""
            />
          </div>

          <div className="flex items-center mb-6">
            <Checkbox label="Remember Me" crossOrigin="" />
            <p className="text-[#5264d0]">Forget Password</p>
          </div>

          <Button className="w-full mb-4"> Sign in</Button>
          <p className="w-full mb-4 text-[#5264d0]">
            Don't have an account? Sign Up.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
