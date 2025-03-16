import React, { useState } from "react";
import {
  Stepper,
  Button,
  Card,
  FileInput,
  TextInput,
  Select,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useFindJobHook } from "../hooks/useFindJobHook";

const ApplyForm: React.FC = () => {
  const {
    isPendingApplyJob,
    applyJobFn,
    form,
    active,
    setActive,
    nextStep,
    prevStep,
    isFirstStepCompleted,
    isSecondStepCompleted,
  } = useFindJobHook();

  return (
    <>
      <div className="w-full h-full max-w-[85rem] mx-auto py-32 px-4">
        <div className="gap-y-10 max-w-[46rem] mx-auto">
          <Stepper
            size="sm"
            active={active}
            classNames={{
              separator: "hidden md:block",
            }}
          >
            <Stepper.Step
              classNames={{
                step: "grid-cols gap-y-3",
              }}
              label="First step"
              description="Upload Your Resume & Cover Letter"
            >
              <div className="pt-10 max-w-[36rem] mx-auto">
                <Card p={32}>
                  <div className="grid grid-cols gap-y-10">
                    <div className="grid grid-cols gap-y-1">
                      <h1 className="font-bold text-textBlack text-xl">
                        Upload Your Resume & Cover Letter
                      </h1>
                      <p className="text text-neutral-500 text-sm">
                        Please upload the required documents to apply for this
                        position.
                      </p>
                    </div>
                    <div className="grid grid-rows gap-y-6">
                      <FileInput
                        label="Resume"
                        placeholder="Upload your Resume"
                        {...form.getInputProps("resume")}
                        rightSection={
                          <Icon icon="mdi:file-outline" fontSize={16} />
                        }
                      />
                      <FileInput
                        label="Cover Letter (Optional)"
                        placeholder="Upload your Cover Letter"
                        {...form.getInputProps("cover_letter")}
                        rightSection={
                          <Icon icon="mdi:file-outline" fontSize={16} />
                        }
                      />
                    </div>
                    <div className="flex gap-x-4 justify-end">
                      <Button variant="default" onClick={prevStep}>
                        Back
                      </Button>
                      <Button
                        disabled={isFirstStepCompleted}
                        onClick={nextStep}
                      >
                        Next step
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Stepper.Step>
            <Stepper.Step
              label="Second step"
              description="Background Information"
            >
              <div className="pt-10 max-w-[36rem] mx-auto">
                <Card p={32}>
                  <div className="grid grid-cols gap-y-10">
                    <div className="grid grid-cols gap-y-1">
                      <h1 className="font-bold text-textBlack text-xl">
                        Your Personal Information
                      </h1>
                      <p className="text text-neutral-500 text-sm">
                        Please fill out the following details to complete your
                        application.
                      </p>
                    </div>
                    <div className="grid grid-rows gap-y-6">
                      <TextInput
                        label="Phone Number"
                        placeholder="Enter your Phone Number"
                        {...form.getInputProps("phone_number")}
                        rightSection={<span className="text-xs">+63</span>}
                      />

                      <Select
                        label="Availability Time 1"
                        description="Additional Information"
                        placeholder="Please select availability time to contact"
                        data={[
                          "8:00 AM - 10:00 AM",
                          "11:00 AM - 12:00 PM",
                          "1:00 PM - 2:00 PM",
                          "3:00 PM - 5:00 PM",
                        ]}
                        {...form.getInputProps("availability_time_1")}
                      />
                      <Select
                        label="Availability Time 2"
                        description="Additional Information"
                        placeholder="Please select availability time to contact"
                        data={[
                          "8:00 AM - 10:00 AM",
                          "11:00 AM - 12:00 PM",
                          "1:00 PM - 2:00 PM",
                          "3:00 PM - 5:00 PM",
                        ]}
                        {...form.getInputProps("availability_time_2")}
                      />
                    </div>
                    <div className="flex gap-x-4 justify-end">
                      <Button variant="default" onClick={prevStep}>
                        Back
                      </Button>
                      <Button
                        disabled={isSecondStepCompleted}
                        onClick={nextStep}
                      >
                        Next step
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Stepper.Step>
            <Stepper.Step label="Final step" description="Review Application">
              <div className="pt-10 max-w-[36rem] mx-auto">
                <Card p={32}>
                  <div className="grid grid-cols gap-y-10">
                    <div className="grid grid-cols gap-y-1">
                      <h1 className="font-bold text-textBlack text-xl">
                        Review Your Application
                      </h1>
                      <p className="text text-neutral-500 text-sm">
                        Please review your files and information before
                        submitting your application.
                      </p>
                    </div>
                    <div className="grid grid-rows gap-y-6">
                      <FileInput
                        label="Resume"
                        placeholder="Upload your Resume"
                        {...form.getInputProps("resume")}
                        disabled
                      />
                      <FileInput
                        label="Cover Letter (Optional)"
                        placeholder="Upload your Cover Letter"
                        {...form.getInputProps("cover_letter")}
                        disabled
                      />
                      <TextInput
                        label="Phone Number"
                        placeholder="Enter your Phone Number"
                        {...form.getInputProps("phone_number")}
                        disabled
                      />
                      <Select
                        label="Availability Time 1"
                        description="Additional Information"
                        data={[
                          "8:00 AM - 10:00 AM",
                          "11:00 AM - 12:00 PM",
                          "1:00 PM - 2:00 PM",
                          "3:00 PM - 5:00 PM",
                        ]}
                        {...form.getInputProps("availability_time_1")}
                        disabled
                      />
                      <Select
                        label="Availability Time 2"
                        description="Additional Information"
                        data={[
                          "8:00 AM - 10:00 AM",
                          "11:00 AM - 12:00 PM",
                          "1:00 PM - 2:00 PM",
                          "3:00 PM - 5:00 PM",
                        ]}
                        {...form.getInputProps("availability_time_2")}
                        disabled
                      />
                    </div>
                    <div className="flex gap-x-4 justify-end">
                      <Button variant="default" onClick={prevStep}>
                        Back
                      </Button>
                      <Button
                        disabled={isPendingApplyJob}
                        onClick={() => {
                          applyJobFn(form.values);
                        }}
                      >
                        {isPendingApplyJob && (
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
                        {!isPendingApplyJob && "Submit Application"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Stepper.Step>
            <Stepper.Completed>
              <div className="pt-10 max-w-[27rem] mx-auto">
                <Card p={43} withBorder>
                  <div className="grid grid-cols gap-y-6">
                    <div className="flex flex-col gap-y-2 justify-center items-center">
                      <Icon
                        fontSize={34}
                        className="text-green-500"
                        icon="ri:checkbox-circle-fill"
                      />
                      <h1 className="text-green-500 font-bold text-2xl text-center">
                        Success
                      </h1>
                    </div>
                    <div className="grid grid-cols gap-y-3 justify-center text-center">
                      <h1 className="font-bold text-textBlack text-lg">
                        Your Application Has Been Submitted!
                      </h1>
                      <p className="text-textGray text-sm max-w-sm mx-auto">
                        Thank you for applying. We will review your application
                        and get back to you soon.
                      </p>
                    </div>
                    <div className="flex flex-col relative justify-center gap-3 md:flex gap-x-4">
                      <Button>Track your Application</Button>
                      <Link to="/">
                        <Button variant="subtle" fullWidth>
                          Return to Job Listings
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </Stepper.Completed>
          </Stepper>
        </div>
      </div>
    </>
  );
};

export default ApplyForm;
