import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import React from "react";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

const PersonalInformation: React.FC = ({ usersData }) => {
  const { name, email, phone_number, date_birth } = usersData;
  const {
    form,
    isPending,
    updateUserProfileFn,
    opened,
    open,
    close,
  } = useUpdateProfile(usersData);

  const handleSubmit = (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      date_birth: values.date_birth,
    };
    updateUserProfileFn(payload);
  };

  return (
    <>
      <Card radius={12} p={20} withBorder>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg text-textBlack">Personal Details</h1>
          <div className="flex justify-end">
            <Button
              radius="xl"
              size="xs"
              variant="outline"
              onClick={open}
              rightSection={
                <Icon icon="radix-icons:pencil-1" width="15" height="15" />
              }
            >
              Edit
            </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols">
          <div className="w-full grid grid-cols-4 gap-x-4 items-center">
            <div className="space-y--1 py-4">
              <span className="text-textGray text-xs">Fullname</span>
              <h1 className="font-semibold text-textBlack text-sm">{name}</h1>
            </div>
            <div className="space-y--1 py-4">
              <span className="text-textGray text-xs">Email</span>
              <h1 className="font-semibold text-textBlack text-sm">{email}</h1>
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-x-4 items-center">
            <div className="space-y--1 py-4">
              <span className="text-textGray text-xs">Phone</span>
              <h1 className="font-semibold text-textBlack text-sm">
                {phone_number}
              </h1>
            </div>
            <div className="space-y--1 py-4">
              <span className="text-textGray text-xs">Date of birth</span>
              <h1 className="font-semibold text-textBlack text-sm">
                {date_birth ?? "_"}
              </h1>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        title="Personal Information"
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="grid grid-cols gap-y-4">
            <TextInput
              size="xs"
              label="Name"
              placeholder="Enter fullname"
              {...form.getInputProps("name")}
            />
            <TextInput
              size="xs"
              label="Email"
              placeholder="Enter email"
              rightSection={
                <Icon icon="mdi:alternate-email" width="18" height="18" />
              }
              {...form.getInputProps("email")}
            />
            <TextInput
              size="xs"
              label="Phone number"
              placeholder="Enter phone number"
              rightSection={<span className="mr-4 text-xs">+63</span>}
              {...form.getInputProps("phone_number")}
            />
            <DatePickerInput
              size="xs"
              label="Date of birth"
              placeholder="Pick a date of your birth"
              valueFormat="DD/MM/YYYY"
              rightSection={
                <Icon
                  icon="mdi:calendar-month-outline"
                  width="18"
                  height="18"
                />
              }
              {...form.getInputProps("date_birth")}
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

export default PersonalInformation;
