import React from "react";
import { Tabs } from "@mantine/core";
import ApplicationList from "./components/ApplicationList";
// import jobs from "../../../data/jobs.json";
import { useJobApplicationsHook } from "./hooks/useJobApplicationsHook";

const JobApplications: React.FC = () => {
  const { appliedJobs } = useJobApplicationsHook();

  return (
    <>
      <div className="w-full py-32 h-full max-w-[85rem] mx-auto px-4">
        <div>
          <h1 className="font-bold text-textBlack text-2xl">
            Job Applications
          </h1>
        </div>
        <div className="pt-10">
          <Tabs defaultValue="applied">
            <Tabs.List>
              <Tabs.Tab value="applied">Applied</Tabs.Tab>
              <Tabs.Tab value="interview">Interview Scheduled</Tabs.Tab>
            </Tabs.List>
            <div className="grid grid-cols pt-10 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
              {appliedJobs?.map((job, index) => (
                <ApplicationList job={job} key={index} />
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default JobApplications;
