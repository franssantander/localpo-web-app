import React from "react";
import classes from "../../../../assets/ctasection.module.css";
import { Button, Overlay } from "@mantine/core";

const CtaSection: React.FC = () => {
  return (
    <>
      <div>
        <div className={classes.wrapper}>
          <Overlay color="#000" opacity={0.65} zIndex={1} />
          <div className="grid grid-cols gap-y-4 z-10 relative">
            <h1 className="font-bold text-4xl text-center text-white">
              Ready to Hire Your Next Star?
            </h1>
            <p className="text-center text-neutral-300 max-w-96 mx-auto">
              Join our platform today and connect with top talent across various
              industries. Start posting jobs and find the perfect candidates to
              grow your team!
            </p>
            <div className="w-full justify-center flex gap-x-3">
              <Button variant="filled">Start Posting</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CtaSection;
