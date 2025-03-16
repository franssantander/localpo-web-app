import React from "react";
import JobsManagement from "../../features/employer/jobsmanagement/JobsManagement";

const InternalPage: React.FC = ({ apiKey, apiTable }) => {
  return (
    <>
      <JobsManagement url={apiKey} table={apiTable} />
    </>
  );
};

export default InternalPage;
