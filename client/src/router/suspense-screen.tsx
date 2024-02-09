import React from "react";
import { CgSpinnerTwo } from "react-icons/cg";
function SuspenseScreen() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <CgSpinnerTwo className="animate-spin text-primary text-lg" />
    </div>
  );
}

export default SuspenseScreen;
