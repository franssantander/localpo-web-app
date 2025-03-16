import React from "react";
import Sidebar from "./components/Sidebar";
import PageContent from "./components/PageContent";

const EmployerLayout: React.FC = () => {
  return (
    <div
      id="employerLayout"
      className="flex flex-1 overflow-hidden w-screen h-screen relative"
    >
      <Sidebar />
      <div className="w-full overflow-y-auto">
        <PageContent />
      </div>
    </div>
  );
};

export default EmployerLayout;
