import { Avatar, Box, Divider } from "@mantine/core";
import React from "react";
import Interview from "./Interview";
import ShortListed from "./ShortListed";
import FinalStage from "./FinalStage";
import { HiringProgressTabProps } from "../../../../interface/interface";

const HiringProgressTab: React.FC<HiringProgressTabProps> = (props) => {
  const { hiringProgressData } = props;
  if (!hiringProgressData) {
    return <div>No data available</div>;
  }

  const { notes } = hiringProgressData;

  return (
    <>
      <div className="grid grid-cols  py-10">
        <div className="grid grid-cols gap-y-10">
          <div className="grid grid-cols gap-y-3">
            <h1 className="font-bold text-textBlack text-sm">Current Stage</h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <Box
                w="100%"
                className="bg-primaryColor/20 font-bold text-primaryColor text-sm text-center rounded-sm"
                p={14}
              >
                In-Review
              </Box>
              <Box
                w="100%"
                className="bg-primaryColor/20 font-bold text-primaryColor text-sm text-center rounded-sm"
                p={14}
              >
                Interview
              </Box>
              <Box
                w="100%"
                className="bg-neutral-200 font-bold text-textBlack text-sm text-center rounded-sm"
                p={14}
              >
                Shortlisted
              </Box>
              <Box
                w="100%"
                className="bg-neutral-200 font-bold text-textBlack text-sm text-center rounded-sm"
                p={14}
              >
                Hired/Declined
              </Box>
            </div>
          </div>
          <Interview interviewData={hiringProgressData} />
          <ShortListed shortListedData={hiringProgressData} />
          <FinalStage finalStageData={hiringProgressData} />
        </div>
        <Divider size="sm" my={36} />
        <div>
          <div className="grid grid-cols gap-y-5">
            <h1 className="text-sm font-bold text-textBlack">Notes</h1>
            <div className="grid grid-cols gap-y-4">
              {notes.map((note, index: number) => (
                <>
                  <div className="flex items-center gap-x-1" key={index}>
                    <Avatar src={note.img_profile} />
                    <div className="flex flex-col gap--1">
                      <h1 className="font-bold text-textBlack text-sm">
                        {note.name}
                      </h1>
                      <span className="text-textGray text-xs">
                        {note.position}
                      </span>
                    </div>
                  </div>
                  <p className="text-textGray text-sm">{note.text}</p>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HiringProgressTab;
