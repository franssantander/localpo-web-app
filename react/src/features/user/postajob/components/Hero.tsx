import { Button } from "@mantine/core";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center h-screen px-4 lg:pt-7">
      <div>
        <div className="grid grid-cols gap-y-4">
          <h1 className="text-textBlack text-3xl font-black max-w-lg md:text-5xl md:leading-tight">
            Find the Perfect Fit: Post Your Job Today!
          </h1>
          <p className="md:text-lg text-textGray max-w-lg">
            Connect with top talent and accelerate your company's growth by
            posting your job listings with ease.
          </p>
        </div>
        <div className="pt-4">
          <Button>Post a Job Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
