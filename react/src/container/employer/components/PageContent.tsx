import React from "react";
import Header from "./Header";
import RoutesContent from "../../../RoutesContent";

const PageContent: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <Header />
      <main className="bg-white px-4 lg:px-3">
        <RoutesContent />
      </main>
    </div>
  );
};

export default PageContent;
