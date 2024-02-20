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

        <ShoppingCart />
      </section>
    </div>
  );
}

export default Index;
