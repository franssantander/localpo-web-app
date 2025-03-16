import React from "react";
import CardForm from "./components/CardForm";

const CompanyProfile: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center p-4">
        <div className="w-[98rem]">
          <CardForm />
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
