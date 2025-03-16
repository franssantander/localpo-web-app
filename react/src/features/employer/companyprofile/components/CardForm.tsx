import React from "react";
import {
  Button,
  Card,
  FileInput,
  Progress,
  Select,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { useCompanyProfile } from "../hooks/useCompanyProfile";
import dayjs from "dayjs";
import { Icon } from "@iconify/react/dist/iconify.js";

const CardForm: React.FC = () => {
  const { form, submitCompanyProfile, isPending } = useCompanyProfile();

  return (
    <Card radius="md" shadow="md" withBorder>
      <div className="grid grid-cols gap-y-2">
        <h1 className="text-2xl font-bold text-textBlack">
          Create Company Profile
        </h1>
        <p className="text-textGray max-w-lg">
          Help us tailor your experience and unlock all features by completing
          your profile.
        </p>
        <div>
          <Progress w="100%" value={50} />
          <span className="text-xs text-textGray">50%</span>
        </div>
      </div>
      <form onSubmit={form.onSubmit((values) => submitCompanyProfile(values))}>
        <div className="grid grid-cols gap-y-2">
          <div className="grid grid-cols gap-y-7 pt-10">
            <h1 className="text-textGray font-bold text-lg">Company Details</h1>
            <div className="grid grid-cols gap-7 md:grid-cols-2">
              <FileInput
                accept="image/png,image/jpeg"
                label="Company logo"
                description="Upload the company's logo image."
                placeholder="Only accept image, png and jpeg file"
                rightSection={
                  <Icon icon="mdi:image-outline" width="18" height="18" />
                }
                clearable
                {...form.getInputProps("company_profile")}
              />
              <TextInput
                className="bg-inherit"
                label="Company name"
                description="The full legal name of the company."
                placeholder="Enter your phone number"
                withAsterisk
                {...form.getInputProps("company_name")}
              />
              <Select
                className="bg-inherit"
                label="Industry type"
                description="Select the industry that the company belongs to."
                placeholder="Please select industry type"
                withAsterisk
                data={[
                  "Information Technology",
                  "Health Care",
                  "Manufacturing",
                ]}
                {...form.getInputProps("industry_type")}
              />
              <YearPickerInput
                label="Year establish"
                description="Year when the company was established."
                placeholder="Enter your company year establish"
                onChange={(date) =>
                  form.setFieldValue(
                    "year_establish",
                    date ? dayjs(date).format("YYYY") : ""
                  )
                }
              />
              <Textarea
                label="Company description"
                description="A brief description of the company’s mission, vision, and what it does."
                placeholder="Enter brief description"
                rightSection={
                  <Icon icon="mdi:pencil-outline" width="18" height="18" />
                }
                {...form.getInputProps("company_description")}
              />
            </div>
          </div>
          <div className="grid grid-cols gap-y-7 pt-10">
            <h1 className="text-textGray font-bold text-lg">
              Company Contact Information
            </h1>
            <div className="grid grid-cols gap-7 md:grid-cols-2">
              <TextInput
                label="Company address"
                placeholder="Enter address of the company"
                description="Full address of the company."
                withAsterisk
                rightSection={
                  <Icon icon="mdi:map-marker-outline" width="18" height="18" />
                }
                {...form.getInputProps("company_address")}
              />
              <TextInput
                label="Phone number"
                placeholder="Enter phone number"
                description="Company’s contact phone number."
                rightSection={<span className="text-xs">+63</span>}
                withAsterisk
                {...form.getInputProps("company_phone")}
              />
              <TextInput
                label="Company email"
                placeholder="Enter company email"
                description="Official company email address."
                withAsterisk
                rightSection={
                  <Icon icon="mdi:alternate-email" width="18" height="18" />
                }
                {...form.getInputProps("company_email")}
              />
              <TextInput
                label="Company website"
                description="The company’s official website link."
                placeholder="Enter company website"
                rightSection={<Icon icon="mdi:globe" width="18" height="18" />}
                {...form.getInputProps("company_website")}
              />
              <TagsInput
                label="Company social media"
                description="Social media links."
                placeholder="Press Enter to submit a tag"
                rightSection={
                  <Icon icon="mdi:sparkles-outline" width="18" height="18" />
                }
                {...form.getInputProps("company_socialmed")}
              />
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <Button size="xs" type="submit" disabled={isPending}>
            {isPending && (
              <h1 className="flex items-center gap-x-2 text-sm">
                <Icon
                  className="animate-spin"
                  icon="radix-icons:reload"
                  width="15"
                  height="15"
                />
                Submitting...
              </h1>
            )}
            {!isPending && "Save & Continue"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CardForm;
