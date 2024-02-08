import React from "react";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import LOGO from "../assets/logo.png";
import { Link } from "react-router-dom";

export function TopNav() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to="/event-planner">
      <p className="text-gray-600 font-medium">Events Page</p>
      </Link>
    </ul>
  );

  return (
    <Navbar className="mx-auto w-full py-2 px-4 lg:px-8 lg:py-4 shadow-none">
      <div className="mx-auto flex items-center justify-between text-blue-gray-900">
         <Link to="/"><img src={LOGO} className="w-24" alt="AV Bids" /></Link>
        <div className="flex-grow" />
        <div className="hidden lg:block">{navList}</div>
        <div className="flex-grow" />
        <Button variant="text" size="sm" className="hidden lg:inline-block mr-2 text-btn">
          <span className=" text-black">Login</span>
        </Button>
        <Button variant="outlined" size="sm" className="hidden lg:inline-block rounded-btn ">
          <span className=" text-black">Get Started</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-primary hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="grid grid-cols-2 gap-2">
          <Button variant="text" size="sm" fullWidth className="text-btn">
            <span className=" text-black">Login</span>
          </Button>
          <Button variant="outlined" size="sm" fullWidth className="rounded-btn">
            <span className="text-black">Get Started</span>
          </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
