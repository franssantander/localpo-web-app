import React from "react";
import SearchJob from "../../../components/user/SearchJob";
import classes from "../../../assets/findjob.module.css";
import { Overlay } from "@mantine/core";

const FindJob: React.FC = () => {
  return (
    <>
      <div className="bg-bgColor h-full">
        <div className="lg:max-w-[85rem] mx-auto px-4 py-20">
          <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />
            <div className="grid grid-cols gap-y-4 z-10 relative">
              <h1 className="font-bold text-4xl text-white">
                Start Your Job Search Today
              </h1>
              <p className="text-textGray">
                Join our community and unlock endless opportunities to advance
                your career. Sign up now!
              </p>
            </div>
          </div>
          <SearchJob />
        </div>
      </div>
    </>
  );
};

export default FindJob;
