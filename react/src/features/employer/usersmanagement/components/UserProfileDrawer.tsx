import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Button,
  Drawer,
  FileInput,
  ScrollArea,
  TagsInput,
  TextInput,
} from "@mantine/core";
import React from "react";
import { UserProfileDrawerProps } from "../../../../interface/interface";

const UserProfileDrawer: React.FC<UserProfileDrawerProps> = (props) => {
  const { isOpenEditUser, closeEditUser } = props;

  return (
    <>
      <Drawer
        opened={isOpenEditUser}
        onClose={closeEditUser}
        title="Edit Profile"
        position="right"
        size="lg"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div className="px-4 pb-10">
          <div className="grid grid-cols gap-y-4">
            <Avatar
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              size="xl"
              alt="user profile"
            />
            <div className="flex flex-col">
              <h1 className="text-textBlack text-lg font-bold flex items-center gap-x-2">
                John Doe
              </h1>
              <span className="text-sm text-textGray">HR</span>
            </div>
          </div>
          <div className="pt-10 grid grid-cols gap-y-6">
            <div className="sm:grid sm:grid-cols-[.3fr_1fr] items-center gap-x-4">
              <h1 className="text-textBlack text-sm">Name</h1>
              <div className="flex gap-x-4 w-full">
                <TextInput className="w-full" placeholder="First name" />
                <TextInput className="w-full" placeholder="Last name" />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-[.3fr_1fr] items-center gap-x-4">
              <h1 className="text-textBlack text-sm">Email</h1>
              <div className="flex gap-x-4 w-full">
                <TextInput
                  leftSection={<Icon icon="ri:at-line" className="text-md" />}
                  className="w-full"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-[.3fr_1fr] items-center gap-x-4">
              <h1 className="text-textBlack text-sm">Position</h1>
              <div className="flex gap-x-4 w-full">
                <TextInput className="w-full" placeholder="Position" />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-[.3fr_1fr] items-center gap-x-4">
              <h1 className="text-textBlack text-sm">Department</h1>
              <div className="flex gap-x-4 w-full">
                <TextInput className="w-full" placeholder="Department" />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-[.3fr_1fr] items-center gap-x-4">
              <h1 className="text-textBlack text-sm">Profile picture</h1>
              <div className="flex gap-x-4 w-full">
                <FileInput
                  className="w-full"
                  leftSection={
                    <Icon icon="ri:upload-2-line" className="text-md" />
                  }
                  placeholder="Upload profile picture"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-[.3fr_1fr] items-center gap-x-4">
              <h1 className="text-textBlack text-sm">Phone number</h1>
              <div className="flex gap-x-4 w-full">
                <TextInput className="w-full" placeholder="Phone number" />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-[.3fr_1fr] items-center gap-x-4">
              <h1 className="text-textBlack text-sm">Dates of joining</h1>
              <div className="flex gap-x-4 w-full">
                <TextInput className="w-full" placeholder="Dates of joining" />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-[.3fr_1fr] items-center gap-x-4">
              <h1 className="text-textBlack text-sm">Reports to</h1>
              <div className="flex gap-x-4 w-full">
                <TagsInput
                  className="w-full"
                  placeholder="Reports to"
                  data={["React", "Angular", "Svelte"]}
                  acceptValueOnBlur
                />
              </div>
            </div>
            <div className="space-x-3 flex justify-end pt-3">
              <Button size="sm" variant="outline" onClick={closeEditUser}>
                Cancel
              </Button>
              <Button size="sm">Save changes</Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default UserProfileDrawer;
