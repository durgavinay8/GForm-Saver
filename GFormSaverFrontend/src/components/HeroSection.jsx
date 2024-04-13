// import React from "react";

import { heroSecImg, arrowDown, GoogleLogo } from "../assets";
import SignIn from "./SignIn";

const HeroSection = () => {
  return (
    <section className="w-full  mb-10" id="OverviewSec">
      <p className="text-center px-10 pt-4 text-xl text-textcolor">
        Google Forms creators have a sleek dashboard from Google. But what about
        the users who fill out those forms? Enter{" "}
        <span className="text-primary text-2xl">GFormSaver</span>, offering a
        management tool tailored specifically for Google Forms{" "}
        <span className="text-cta text-2xl">Respondents</span>.
      </p>
      <div className=" flex flex-col-reverse sm:flex-row justify-between items-center font-poppins pb-10 md:py-0 md:pb-3 lg:px-20 lg:pt-10 lg:pb-3 md:gap-6">
        <div className="flex flex-col gap-5 items-center md:items-stretch xl:gap-7 max-w-lg">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extralight">
            Simply, Stay
          </h2>
          <h1 className="uppercase font-pompiere text-6xl lg:text-7xl xl:text-8xl">
            organised!
          </h1>
          <p className="text-textcolor text-center md:text-start">
            Effortlessly manage your <strong>Google Form Submissions</strong>{" "}
            with our intuitive Chrome extension. Say goodbye to chaos and hello
            to streamlined form management!
          </p>
          <a
            href="https://drive.google.com/drive/folders/1OcZWtve42-W3c9Qc8X0OHsFMpNZVxxRl?usp=sharing"
            className="bg-primary rounded px-3 py-2 text-center text-white md:mr-12 drop-shadow-lg self-stretch"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Extension
          </a>
          <SignIn CSS="flex gap-4 justify-center border-2 border-cta rounded px-3 py-2 text-center md:mr-12 drop-shadow-lg self-stretch hover:bg-cta hover:text-white">
            <img src={GoogleLogo} className="h-6" />
            Sign in with Google
          </SignIn>
        </div>
        <img
          src={heroSecImg}
          alt="Hero Section Image"
          className="md:size-[50%] lg:size-[70vh] lg:-mt-20 xl:size-[75vh]"
        />
      </div>
      <a
        className="text-center text-textcolor flex justify-center"
        href="#FeaturesSec"
      >
        <span>See what you can do with GFormSaver &nbsp;</span>
        <img src={arrowDown} alt="down-arrow" className="animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;
