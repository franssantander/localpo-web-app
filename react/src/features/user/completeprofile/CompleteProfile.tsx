import React from "react";
import CardForm from "./components/CardForm";

const CompleteProfile: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center p-4 py-20">
        <div className="w-[55rem]">
          <CardForm />
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
