import React, { useState } from "react";
import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  Divider,
  FileInput,
  Modal,
  Progress,
  Select,
  TagsInput,
  TextInput,
} from "@mantine/core";
import { DateInput, DatePickerInput, MonthPickerInput } from "@mantine/dates";
import { useCompleteProfile } from "../hooks/useCompleteProfile";
import dayjs from "dayjs";
import "@mantine/tiptap/styles.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RichTextEditor } from "@mantine/tiptap";

const CardForm: React.FC = () => {
  const {
    form,
    experienceForm,
    regionOptions,
    provinceOptions,
    municipalityOptions,
    brgyOptions,
    handleSubmit,
    handlePsgcChange,
    updateUserProfileFn,
    editor,
    handleCheckboxChange,
    opened,
    open,
    close,
    isCheckPresent,
    experiences,
    handleAddExperience,
    setExperiences,
    handleSubmitCompleteProfile,
    disabledSubmitExperience,
  } = useCompleteProfile();

  return (
    <>
      <Card radius="md" shadow="md" withBorder>
        <div className="grid grid-cols gap-y-2">
          <h1 className="text-2xl font-bold text-textBlack">
            Complete your profile
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
        <form
          onSubmit={form.onSubmit((values) =>
            handleSubmitCompleteProfile(values, experiences)
          )}
        >
          <div className="grid grid-cols gap-y-2">
            <div className="grid grid-cols gap-y-4 pt-10">
              <h1 className="text-textGray font-bold text-lg">
                Personal Information
              </h1>
              <div className="grid grid-cols gap-4 md:grid-cols-2">
                <FileInput
                  accept="image/png,image/jpeg"
                  label="Profile picture"
                  placeholder="Only accept image, png and jpeg file"
                  required
                  rightSection={
                    <Icon icon="mdi:image-outline" width="18" height="18" />
                  }
                  clearable
                  {...form.getInputProps("profile_picture")}
                />
                <TextInput
                  className="bg-inherit"
                  label="Phone number"
                  placeholder="Enter your phone number"
                  {...form.getInputProps("phone_number")}
                />
                <DatePickerInput
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
                  onChange={(date) =>
                    form.setFieldValue(
                      "date_birth",
                      date ? dayjs(date).format("DD/MM/YYYY") : ""
                    )
                  }
                />
                <div>
                  <TagsInput
                    label="Highlight your skills"
                    placeholder="You can select a options or can enter a new skill"
                    data={["Programmer", "Sales", "Marketing", "Voice over"]}
                    acceptValueOnBlur
                    {...form.getInputProps("skills")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-sm font-semibold">Profile Description</h1>
                <RichTextEditor editor={editor}>
                  <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />
                      <RichTextEditor.ClearFormatting />
                      <RichTextEditor.Highlight />
                      <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                      <RichTextEditor.Subscript />
                      <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.AlignLeft />
                      <RichTextEditor.AlignCenter />
                      <RichTextEditor.AlignJustify />
                      <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>

                  <RichTextEditor.Content />
                </RichTextEditor>
              </div>
              {/* Experience Section */}
              <div className="grid grid-cols gap-y-4 pt-10">
                <div className="flex justify-between">
                  <h1 className="text-textGray font-bold text-lg">
                    Experience
                  </h1>
                  <ActionIcon
                    variant="filled"
                    radius="xl"
                    aria-label="Settings"
                    onClick={open}
                  >
                    <Icon icon="mdi:add" fontSize={24} />
                  </ActionIcon>
                </div>
                <div>
                  {experiences.map((experience, index) => (
                    <div className="py-5" key={index}>
                      <div className="flex justify-between">
                        <h1 className="text-md font-semibold">
                          {experience.position}
                        </h1>
                        <ActionIcon
                          variant="outline"
                          aria-label="Settings"
                          onClick={() =>
                            setExperiences((prevExperience) =>
                              prevExperience.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <Icon icon="mdi:trash-outline" fontSize={16} />
                        </ActionIcon>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-textGray">
                          {experience.company} - {experience.location}
                        </p>
                        <p className="text-xs text-textGray">
                          {experience.start_date} - {experience.end_date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols gap-y-4 pt-10">
              <h1 className="text-textGray font-bold text-lg">
                Address Information
              </h1>
              <div className="grid grid-cols gap-4 md:grid-cols-2">
                <TextInput
                  label="Address 1"
                  placeholder="Enter your phone number"
                  {...form.getInputProps("address_1")}
                />
                <TextInput
                  label="Address 2 (Optional)"
                  placeholder="Enter your phone number"
                  {...form.getInputProps("address_2")}
                />
                <Select
                  label="Regions"
                  placeholder="Pick value"
                  data={regionOptions || []}
                  value={form.values.region_code}
                  onChange={(code) => handlePsgcChange("region_code", code)}
                />
                <Select
                  label="Province"
                  placeholder="Pick value"
                  data={provinceOptions || []}
                  value={form.values.province_code}
                  onChange={(code) => handlePsgcChange("province_code", code)}
                />
                <Select
                  label="City/Municipalities"
                  placeholder="Pick value"
                  data={municipalityOptions || []}
                  value={form.values.municipalities_code}
                  onChange={(code) =>
                    handlePsgcChange("municipalities_code", code)
                  }
                />
                <Select
                  label="Barangay"
                  placeholder="Pick value"
                  data={brgyOptions || []}
                  value={form.values.barangay_code}
                  onChange={(code) => handlePsgcChange("barangay_code", code)}
                />
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-end">
            <Button size="xs" type="submit">
              Save & Continue
            </Button>
          </div>
        </form>
      </Card>
      <Modal opened={opened} onClose={close} title="Add experience" centered>
        <form
          onSubmit={experienceForm.onSubmit((values) =>
            handleAddExperience(values)
          )}
          className="space-y-10"
        >
          <div className="w-full grid grid-cols">
            <div className="grid grid-cols gap-y-6">
              <TextInput
                withAsterisk
                label="Previous Job title/Position"
                size="xs"
                placeholder="Position"
                {...experienceForm.getInputProps("position")}
              />
              <TextInput
                withAsterisk
                label="Previous Company/Employer"
                size="xs"
                placeholder="Company/Employer"
                {...experienceForm.getInputProps("company")}
              />
              <TextInput
                withAsterisk
                label="Company Location/Employer Location"
                placeholder="Location"
                size="xs"
                {...experienceForm.getInputProps("location")}
              />
              <div className="space-y-6">
                <Checkbox
                  checked={isCheckPresent}
                  onChange={handleCheckboxChange}
                  size="xs"
                  label="I am currently working in this role"
                />

                <div className="grid grid-cols-2 w-full space-x-4">
                  <div>
                    <MonthPickerInput
                      withAsterisk
                      size="xs"
                      label="Start Date"
                      valueFormat="MMM YYYY"
                      placeholder="Month start"
                      {...experienceForm.getInputProps("start_date")}
                    />
                  </div>
                  <div>
                    {isCheckPresent ? (
                      <TextInput
                        size="xs"
                        label="End Date"
                        disabled
                        value="Present"
                      />
                    ) : (
                      <MonthPickerInput
                        withAsterisk
                        size="xs"
                        label="End Date"
                        valueFormat="MMM YYYY"
                        placeholder="Month end"
                        {...experienceForm.getInputProps("end_date")}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button disabled={disabledSubmitExperience} type="submit" size="xs">
              Add Experience
            </Button>
            <Button size="xs" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CardForm;
