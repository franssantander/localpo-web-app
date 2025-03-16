import { Breadcrumbs } from "@mantine/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import UserStatistics from "./UserStatistics";
import LogsActivity from "./LogsActivity";
import { useViewUserHook } from "../hooks/useViewUserHook";

const UsersView: React.FC = () => {
  const items = [
    { title: "Users Management", href: "#" },
    { title: "Profile Overview", href: "#" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  const location = useLocation();
  const viewData = location.state;
  const { usersData, viewUserIsLoading } = useViewUserHook(viewData.id);

  console.log("usersData: ", usersData);

  return (
    <>
      <div className="grid grid-cols gap-y-2">
        <h1 className="font-bold text-textBlack text-xl">Users Management</h1>
        <Breadcrumbs className="text-blue-500">{items}</Breadcrumbs>
        <div className="py-14 grid md:grid-cols-[.5fr_1fr] gap-7">
          {viewUserIsLoading && "Loading"}
          {!viewUserIsLoading && (
            <>
              <UserProfile usersData={usersData} />
              <div className="flex flex-col space-y-10">
                <UserStatistics />
                <LogsActivity />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersView;
