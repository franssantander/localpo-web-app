import { Avatar, Card, TextInput } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import PersonalInformation from "./PersonalInformation";
import AddressDetails from "./AddressDetails";
import { useEditUserHook } from "../hooks/useEditUserHook";

const UsersEdit: React.FC = () => {
  const location = useLocation();
  const editData = location.state;
  const id = location.state.id;

  const { usersData, viewUserFetching, viewUserIsLoading } =
    useEditUserHook(id);

  return (
    <>
      <div className="grid grid-cols gap-y-2 w-full">
        <h1 className="font-bold text-textBlack text-xl">Edit User Details</h1>
        {viewUserIsLoading && "Loading"}
        {!viewUserIsLoading && (
          <>
            <div className="w-full grid grid-cols gap-y-6 py-10">
              <ProfileDetails usersData={usersData} />
              <PersonalInformation usersData={usersData} />
              <AddressDetails usersData={usersData} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UsersEdit;
