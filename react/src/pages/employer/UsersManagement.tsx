import React from "react";
import UsersManagement from "../../features/employer/usersmanagement/UsersManagement";

const InternalPage: React.FC = ({ apiKey, apiTable }) => {
  return (
    <>
      <UsersManagement url={apiKey} table={apiTable} />
    </>
  );
};

export default InternalPage;
