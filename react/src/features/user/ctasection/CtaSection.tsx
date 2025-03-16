import { Button, Overlay } from "@mantine/core";
import classes from "../../../assets/ctasection.module.css";
import React from "react";

const CtaSection: React.FC = () => {
  return (
    <div>
      <div className={classes.wrapper}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />
        <div className="grid grid-cols gap-y-4 z-10 relative">
          <h1 className="font-bold text-4xl text-center text-white">
            Start Your Job Search Today
          </h1>
          <p className="text-center text-white max-w-96 mx-auto">
            Join our community and unlock endless opportunities to advance your
            career. Sign up now!
          </p>
          <div className="w-full justify-center flex gap-x-3">
            <Button variant="filled">Sign Up</Button>
            <Button variant="outline">Log In</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
