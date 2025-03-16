import React from "react";
import Dashboard from "../../features/employer/dashboard/Dashboard";

const InternalPage: React.FC = ({ apiKey, apiTable }) => {
  return (
    <>
      <Dashboard url={apiKey} table={apiTable} />
    </>
  );
};

export default InternalPage;
