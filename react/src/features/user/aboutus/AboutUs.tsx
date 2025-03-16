import React from "react";
import About from "./components/About";
import SuccessNumbers from "./components/SuccessNumbers";

const AboutUs: React.FC = () => {
  return (
    <>
      <div className="max-w-[85rem] min-h-screen mx-auto px-4 py-48 grid grid-cols gap-y-44">
        <About />
        <SuccessNumbers />
      </div>
    </>
  );
};

export default AboutUs;
