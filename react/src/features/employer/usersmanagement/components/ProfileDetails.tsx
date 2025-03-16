import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Button, Card, FileInput, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

const ProfileDetails: React.FC = ({ usersData }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { profile_picture, name, role, department } = usersData;
  const { form, isPending, updateUserProfileFn } = useUpdateProfile(usersData);

  const handleSubmit = (values) => {
    const payload = {
      profile_picture: values.profile_picture,
      name: values.name,
      role: values.role,
      department: values.department,
    };
    updateUserProfileFn(payload);
    close();
  };

  return (
    <>
      <Card radius={12} p={20} withBorder>
        <div className="w-full flex items-center">
          <div className="w-full flex gap-x-4 items-center">
            <Avatar size={70} src={profile_picture} alt="it's me" />
            <div className="grid grid-cols gap-y-1">
              <h1 className="text-textBlack font-bold text-lg">{name}</h1>
              <div>
                <h1 className="text-textGray text-sm">{role}</h1>
                <h1 className="text-textGray text-sm">{department}</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              radius="xl"
              size="xs"
              variant="outline"
              onClick={() => open()}
              rightSection={
                <Icon icon="radix-icons:pencil-1" width="15" height="15" />
              }
            >
              Edit
            </Button>
          </div>
        </div>
      </Card>
      <Modal opened={opened} onClose={close} title="User Profile" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="grid grid-cols gap-y-4">
            <FileInput
              size="xs"
              label="User profile"
              rightSection={
                <Icon icon="radix-icons:upload" width="15" height="15" />
              }
              placeholder="Upload image jpg, jpeg, png format only."
              {...form.getInputProps("profile_picture")}
            />
            <Select
              size="xs"
              label="Select Department"
              placeholder="Please select first a department."
              data={["Human Resources"]}
              {...form.getInputProps("department")}
            />
            <Select
              size="xs"
              label="Select position"
              placeholder="Please select a designated position."
              data={["HR Manager"]}
              {...form.getInputProps("role")}
            />
          </div>
          <div className="pt-6 flex justify-end gap-x-2">
            <Button size="xs" type="submit" disabled={isPending}>
              {isPending && (
                <h1 className="flex items-center gap-x-2 text-sm">
                  <Icon
                    className="animate-spin"
                    icon="radix-icons:reload"
                    width="15"
                    height="15"
                  />
                  Loading...
                </h1>
              )}
              {!isPending && "Save Changes"}
            </Button>
            <Button size="xs" variant="outline" onClick={close}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProfileDetails;
