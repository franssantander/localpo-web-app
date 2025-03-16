import React from "react";
import SavedJobList from "./components/SavedJobList";
import { useDrawerStore } from "../../../store/useDrawerStore";
import JobDrawer from "../../../components/user/JobDrawer";
import { useSaveJobHook } from "./hooks/useSaveJobHook";

const SavedJobs: React.FC = () => {
  const { isOpen, openDrawer, drawerData, closeDrawer } = useDrawerStore();
  const { savedJobsData, saveJobFn } = useSaveJobHook();

  return (
    <>
      <div className="w-full h-full py-32 max-w-[85rem] mx-auto px-4 grid grid-cols gap-y-10">
        <h1 className="font-bold text-textBlack text-2xl">Saved Jobs</h1>
        <div className="grid grid-cols gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {savedJobsData?.map((job, index) => (
            <SavedJobList
              job={job}
              key={index}
              saveJobFn={saveJobFn}
              openDrawer={openDrawer}
            />
          ))}
          {isOpen && (
            <JobDrawer
              saveJobFn={saveJobFn}
              openDrawer={openDrawer}
              isOpen={isOpen}
              closeDrawer={closeDrawer}
              drawerData={drawerData}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SavedJobs;
