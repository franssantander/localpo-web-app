import React from "react";
import { Link } from "react-router-dom";
import FindJobInput from "../../../../components/user/FindJobInput";

const Hero: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center h-screen px-4 lg:pt-7">
      <div className="grid grid-cols gap-y-10">
        <div className="grid grid-cols gap-y-4">
          <h1 className="text-4xl text-textBlack font-black max-w-[46rem] lg:text-6xl lg:leading-tight">
            Your Dream Job Awaits. Discover It Here.
          </h1>
          <p className="max-w-lg text-textGray lg:text-lg">
            Connect with top companies and explore opportunities tailored for
            you. Your next career move is just a click away.
          </p>
        </div>
        <div className="grid grid-cols gap-y-3 lg:grid-cols-[1fr_auto_0.6fr] lg:gap-x-3 items-center">
          <FindJobInput />
          <Link
            to="/employers"
            className="text-md underline underline-offset-2 font-medium text-center"
          >
            Employers/Post a job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
