import React from "react";
import SignUpForm from "./components/SignUpForm";

const SignUpEmployer: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center max-w-[85rem] mx-auto px-4 sm:py-20">
      <SignUpForm />
    </div>
  );
};

export default SignUpEmployer;
