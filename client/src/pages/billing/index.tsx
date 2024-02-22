import React from "react";
import "../../../src/components/leaklight.css";

import ShoppingCart from "../../components/ShoppingCart";
function Index() {
  return (
    <div className="bg-[#060606] h-max">
      <section>
        <div>
          <div className="rainbow-gradient-circle"></div>
          <div className="rainbow-gradient-circle theme-pink"></div>
        </div>

        <p className="text-white text-[36px] font-bold text-center">
          Billing and Membership
        </p>

        <div className="bg-white bg-opacity-20  px-8 rounded-md w-[1000px]">
          <p className="text-white text-[24px] font-medium">Current Plan</p>
          <p className="text-white text-[32px] font-bold">Kick Starter</p>

          <div className="flex items-end justify-between">
            <div className="text-white text-[16px] font-light">
              <p className="font-light">2 Digital Graphic</p>
              <p className="font-light">4 Changers Per Graphic</p>
              <p className="font-light">Free Artwork Files</p>
              <p className="font-light">
                Upto 1 Day Turn Around Time(24 Hours)
              </p>
              <p className="font-light">2 Active Requests</p>
              <p className="font-light">Free Stock Images</p>
            </div>

            <div>
              <p>
                $ 59.00<span>Per month</span>
              </p>
              <p>Monthly plan</p>
              <p>Manage Payment plan</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
