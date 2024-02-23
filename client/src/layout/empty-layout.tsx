import React from 'react'
import { Outlet } from "react-router-dom";

function EmptyLayout() {
  return (
    <div className="w-full h-screen overflow-auto bg-[#060606] flex items-center justify-center">
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default EmptyLayout;
