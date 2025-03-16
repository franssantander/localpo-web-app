import React from "react";
import IndustriesList from "./components/IndustriesList";
import { ScrollArea } from "@mantine/core";
import SearchJob from "../../../components/user/SearchJob";

const JobsSection: React.FC = () => {
  const industriesData = [
    {
      title: "Technology",
    },
    {
      title: "Healtcare",
    },
    {
      title: "Finance",
    },
    {
      title: "Marketing",
    },
    {
      title: "Education",
    },
    {
      title: "Engineering",
    },
    {
      title: "Customer Service",
    },
    {
      title: "Tutor Online",
    },
  ];

  return (
    <div className="w-full h-full bg-bgColor">
      <div className="w-full lg:pt-7 px-4">
        <div className="text-center grid grid-cols gap-y-3">
          <h1 className="text-textBlack font-bold text-4xl">
            Explore Our Featured Jobs Section
          </h1>
          <p className="text-textGray max-w-2xl mx-auto">
            Discover top opportunities across industries. Search by category or
            explore our latest job listings to find your next career move.
          </p>
        </div>
        <div className="pt-10 grid grid-cols gap-y-7">
          <ScrollArea
            h={50}
            type="always"
            scrollbarSize={10}
            offsetScrollbars={true}
          >
            <div className="flex items-center">
              {industriesData.map((industry, index) => (
                <IndustriesList industry={industry} key={index} />
              ))}
            </div>
          </ScrollArea>
          {/* <FilterMobile /> */}
        </div>
        <SearchJob />
      </div>
    </div>
  );
};

export default JobsSection;
