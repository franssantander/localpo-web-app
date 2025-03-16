import React from "react";
import JobFilter from "../../features/user/jobs/components/JobFilter";
import FindJobInput from "../../components/user/FindJobInput";
import { ScrollArea } from "@mantine/core";
import JobList from "../../features/user/jobs/components/JobList";
// import jobData from "../../data/jobs.json";
import { useJobListHook } from "../../hooks/useJobListHook";
import JobDrawer from "./JobDrawer";
import { useDrawerStore } from "../../store/useDrawerStore";

const SearchJob: React.FC = () => {
  const { jobsData, saveJobFn, isSuccessSaveJob } = useJobListHook();
  const { isOpen, drawerData, openDrawer, closeDrawer } = useDrawerStore();

  return (
    <>
      <div className="lg:grid lg:grid-cols-5 lg:grid-rows-6 lg:gap-4 lg:py-10">
        <div className="lg:row-span-6 lg:border lg:border-neutral-300 lg:rounded-md lg:bg-white">
          <JobFilter />
        </div>

        <div className="mt-4 lg:mt-0 lg:col-span-4 lg:row-span-6 h-full">
          <FindJobInput />
          {/* <FilterMobile /> */}
          <div className="w-full mt-3">
            <ScrollArea h={570} scrollbarSize={8}>
              <div className="grid grid-cols gap-y-3">
                {jobsData?.data?.map((job, index) => (
                  <JobList
                    job={job}
                    key={index}
                    saveJobFn={saveJobFn}
                    openDrawer={openDrawer}
                  />
                ))}
                {isOpen && (
                  <JobDrawer
                    drawerData={drawerData}
                    saveJobFn={saveJobFn}
                    closeDrawer={closeDrawer}
                    isSuccessSaveJob={isSuccessSaveJob}
                  />
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchJob;
