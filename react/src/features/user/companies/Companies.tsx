import React from "react";
import companies from "../../../data/company.json";
import CompanyList from "./components/CompanyList";

const Companies: React.FC = () => {
  return (
    <div className="py-20 px-4">
      <div className="grid grid-cols gap-y-4 text-center">
        <h1 className="text-textBlack font-bold text-4xl">
          Top Companies Hiring
        </h1>
        <p className="text-textGray max-w-2xl mx-auto">
          Explore top-rated companies and find the perfect match for your career
          goals. Learn about company culture, values, and opportunities to see
          where your next big move could be.
        </p>
      </div>
      <div className="grid gap-y-6 sm:grid-cols-2 gap-x-2 pt-20 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4">
        {companies.map((company, index) => (
          <CompanyList company={company} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Companies;
