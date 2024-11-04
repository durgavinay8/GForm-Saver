/* eslint-disable react/prop-types */
import { useState } from "react";
import { close, logoAndText, menu, threeDots } from "../assets";
import useAuth from "../hooks/useAuth";
import SignIn from "./SignIn";
import LogOut from "./LogOut";

const Navbar = ({ isHomePage = false }) => {
  const [toggle, setToggle] = useState(false);
  const { auth } = useAuth();
  const navLinksLeft = [
    ["Overview", "#OverviewSec"],
    ["Features", "#FeaturesSec"],
    ["Security", "#SecuritySec"],
  ];
  const navLinksRight = [
    ["Github", "https://github.com/durgavinay8/GForm-Saver"],
    [
      "Extension",
      "https://drive.google.com/drive/folders/1OcZWtve42-W3c9Qc8X0OHsFMpNZVxxRl?usp=sharing",
    ],
  ];
  return (
    <nav className="w-full flex py-3 justify-between items-center font-poppins font-normal text-[1.1rem] text-textcolor realtive top-0 bg-background">
      <div className="flex gap-7 justify-between w-full lg:w-fit">
        <a href="https://google-form-saver.vercel.app/home">
          <img src={logoAndText} alt="GFormSaver" className="h-11" />
        </a>
        {isHomePage && (
          <ul className="list-none hidden lg:flex justify-end items-center gap-7 flex-1">
            {navLinksLeft.map(([title, url], index) => (
              <li key={index} className="cursor-pointer">
                <a
                  href={`${url}`}
                  className="hover:text-primary hover:underline underline-offset-8 hover:font-medium"
                >
                  {`${title}`}
                </a>
              </li>
            ))}
          </ul>
        )}
        {/*side menu in smaller screens*/}
        <div className="flex lg:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            onClick={() => setToggle((val) => !val)}
          />
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-10 bg-primary absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex flex-col justify-start items-center gap-8 text-background text-lg">
              {navLinksLeft.concat(navLinksRight).map(([title, url], index) => (
                <li key={index}>
                  <a href={`${url}`}>{`${title}`}</a>
                </li>
              ))}
              <SignIn CSS="bg-[#F47F18] rounded-lg text-center p-2 mt-2">
                Sign in
              </SignIn>
            </ul>
          </div>
        </div>
      </div>
      {/*side menu in smaller screens*/}
      {/*larger screens*/}
      {isHomePage ? (
        <ul className="list-none hidden lg:flex justify-end items-center gap-7">
          {navLinksRight.map(([title, url], index) => (
            <li key={index} className="cursor-pointer">
              <a
                href={`${url}`}
                className={`hover:text-primary hover:underline underline-offset-8 hover:font-medium`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${title}`}
              </a>
            </li>
          ))}
          <SignIn CSS="text-cta hover:text-cta hover:underline underline-offset-8 hover:font-medium">
            Sign in
          </SignIn>
        </ul>
      ) : (
        <ul className="list-none hidden lg:flex justify-end items-center gap-7 text-base">
          <li>{auth.userName}</li>
          <li>
            <img
              src={
                auth.userProfileUrl ||
                "https://avatar.iran.liara.run/public/boy?username=Ash"
              }
              alt="img"
              className="h-10 w-10 rounded-full"
            />
          </li>
          <li className="-ml-2">
            <img
              src={toggle ? close : threeDots}
              alt="menu"
              onClick={() => setToggle((val) => !val)}
              className="h-6 w-6"
              title="More options"
            />
          </li>
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } bg-background py-4 px-5 border-2 border-primary absolute top-20 right-10 min-w-[140px] rounded-xl sidebar z-20`}
          >
            <ul className="list-none flex flex-col justify-start items-stretch gap-3">
              <li>{auth.userEmail}</li>
              <li>
                <LogOut />
              </li>
            </ul>
          </div>
        </ul>
      )}
      {/*larger screens*/}
    </nav>
  );
};

export default Navbar;
