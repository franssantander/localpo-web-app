import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, Modal, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

const AddressDetails: React.FC = ({ usersData }) => {
  const {
    address_1,
    address_2,
    region,
    region_code,
    province,
    province_code,
    city_municipalities,
    municipalities_code,
    barangay,
    barangay_code,
  } = usersData;

  const handleSubmit = (values) => {
    const payload = {
      address_1: values.address_1,
      address_2: values.address_2,
      region: values.region,
      region_code: values.region_code,
      province: values.province,
      province_code: values.province_code,
      city_municipalities: values.municipalities,
      municipalities_code: values.municipalities_code,
      barangay: values.barangay,
      barangay_code: values.barangay_code,
    };
    updateUserProfileFn(payload);
  };

  const {
    form,
    updateUserProfileFn,
    isPending,
    regionOptions,
    provinceOptions,
    municipalityOptions,
    brgyOptions,
    handlePsgcChange,
    opened,
    open,
    close,
  } = useUpdateProfile(usersData);

  return (
    <>
      <Card radius={12} p={20} withBorder>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg text-textBlack">Address Details</h1>
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
              <span className="text-textGray text-xs">Address 1</span>
              <h1 className="font-semibold text-textBlack text-sm">
                {address_1 ?? "_"}
              </h1>
            </div>
            <div className="space-y--1 py-4">
              <span className="text-textGray text-xs">Address 2</span>
              <h1 className="font-semibold text-textBlack text-sm">
                {address_2 ?? "_"}
              </h1>
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-x-4 items-center">
            <div className="space-y--1 py-4">
              <span className="text-textGray text-xs">Region</span>
              <h1 className="font-semibold text-textBlack text-sm">
                {region ?? "_"}
              </h1>
            </div>
            <div className="space-y--1 py-4">
              <span className="text-textGray text-xs">Province</span>
              <h1 className="font-semibold text-textBlack text-sm">
                {province ?? "_"}
              </h1>
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-x-4 items-center">
            <div className="space-y--1 py-4">
              <span className="text-textGray text-xs">Municipality</span>
              <h1 className="font-semibold text-textBlack text-sm">
                {city_municipalities ?? "_"}
              </h1>
            </div>
            <div className="space-y--1 py-4">
              <span className="text-textGray text-xs">Barangay</span>
              <h1 className="font-semibold text-textBlack text-sm">
                {barangay ?? "_"}
              </h1>
            </div>
          </div>
        </div>
      </Card>
      <Modal opened={opened} onClose={close} title="Address details" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="grid grid-cols gap-y-4">
            <TextInput
              size="xs"
              label="Address 1"
              placeholder="Enter address 1"
              {...form.getInputProps("address_1")}
            />
            <TextInput
              size="xs"
              label="Address 2"
              placeholder="Enter address 2"
              {...form.getInputProps("address_2")}
            />
            <div className="grid grid-cols-2 gap-4">
              <Select
                size="xs"
                label="Region"
                placeholder="Please select region"
                data={regionOptions || []}
                value={form.values.region_code}
                onChange={(code) => handlePsgcChange("region_code", code)}
              />
              <Select
                size="xs"
                label="Province"
                placeholder="Please select province"
                data={provinceOptions || []}
                value={form.values.province_code}
                onChange={(code) => handlePsgcChange("province_code", code)}
              />
              <Select
                size="xs"
                label="Municipality"
                placeholder="Please select municipality"
                data={municipalityOptions || []}
                value={form.values.municipalities_code}
                onChange={(code) =>
                  handlePsgcChange("municipalities_code", code)
                }
              />
              <Select
                size="xs"
                label="Barangay"
                placeholder="Please select barangay"
                data={brgyOptions || []}
                value={form.values.barangay_code}
                onChange={(code) => handlePsgcChange("barangay_code", code)}
              />
            </div>
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

export default AddressDetails;
