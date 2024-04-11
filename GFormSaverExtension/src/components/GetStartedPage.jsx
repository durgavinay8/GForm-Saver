/* eslint-disable no-undef */
import logo from "../assets/logo+text.png";
import heroImg from "../assets/hero-sec-img.svg";

function GetStartedPage() {
  const handleGetstarted = () => {
    chrome.tabs.create({
      url: "http://cr-awsbucket.s3-website-us-east-1.amazonaws.com",
    });
  };
  return (
    <div className="bg-background flex flex-col justify-start items-center font-poppins p-6 gap-3 w-[300px]">
      <img src={logo} alt="GFormSaver" />
      <img src={heroImg} alt="Illustration" className="max-w-md -mt-4" />
      <h2 className="text-3xl font-extralight">Simply, Stay</h2>
      <h1 className="uppercase font-pompiere text-6xl">organised!</h1>
      <p className="text-textcolor text-center">
        Effortlessly manage your Google Forms and responses with our intuitive
        Chrome extension. Say goodbye to chaos and hello to streamlined form
        management!
      </p>
      <button
        className="bg-cta rounded px-3 py-2 text-center text-white drop-shadow-lg self-stretch focus:outline-none active:outline-none hover:bg-[#eb4816e8]"
        onClick={handleGetstarted}
      >
        Get Started
      </button>
    </div>
  );
}

export default GetStartedPage;
