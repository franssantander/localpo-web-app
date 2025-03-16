import React from "react";
import SearchJob from "../../../components/user/SearchJob";
import classes from "../../../assets/findjobmain.module.css";
import { Overlay } from "@mantine/core";

const MainFindJobs: React.FC = () => {
  return (
    <>
      <div className="w-full">
        <div className={classes.wrapper}>
          <Overlay color="#000" opacity={0.65} zIndex={1} />
          <div className="grid grid-cols gap-y-3 z-10 relative px-4 text-center mx-auto">
            <h1 className="font-bold text-4xl text-white">
              Start Your Job Search Today
            </h1>
            <p className="text-neutral-300 max-w-md mx-auto">
              Join our community and unlock endless opportunities to advance
              your career. Sign up now!
            </p>
          </div>
        </div>
        <div className=" px-4 max-w-[85rem] mx-auto h-full pb-32">
          <SearchJob />
        </div>
      </div>
    </>
  );
};

export default MainFindJobs;
