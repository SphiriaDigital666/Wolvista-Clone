import { Typography } from "@material-tailwind/react";
import LOGO from "../assets/logo_dark.png";
import { Link } from "react-router-dom";
const SITEMAP = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Team", "Projects"],
  },
  {
    title: "Help Center",
    links: ["Discord", "Twitter", "GitHub", "Contact Us"],
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative w-full p-16 bg-primary text-white">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="sm:col-span-3 md:col-span-1">
            <img src={LOGO} alt="" className="mx-auto" />
            <Link to="/av_providers">
              <p className="text-sm text-center mt-4 sm:mb-8 md:mb-0">All Rights Reserved - 2023</p>
            </Link>
          </div>
          <div className="sm:hidden md:inline-block md:col-span-2 lg:col-span-1"></div>
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <h4 className="mb-8 uppercase text-center md:text-left ">{title}</h4>
              <ul className="space-y-4 text-center md:text-left ">
                {links.map((link, key) => (
                  <p className="hover:underline transition ease-in-out duration-300 cursor-pointer">{link}</p>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center py-4 sm:flex-row md:justify-end gap-4">
          <p>Terms of Conditions</p>
          <p>Privacy</p>
          <p>Cookies</p>
        </div>
      </div>
    </footer>
  );
}
