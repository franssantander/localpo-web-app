import React from "react";
import SignInForm from "./components/SignInForm";

const SignIn: React.FC = () => {

  return (
    <div className="h-screen flex flex-col items-center justify-center max-w-[85rem] mx-auto px-4">
      <SignInForm />
    </div>
  );
};

export default SignIn;
