import { Avatar, Badge, Button } from "@mantine/core";
import React from "react";
import { HiringProgressProps } from "../../../../interface/interface";

const ShortListed: React.FC<HiringProgressProps> = (props) => {
  const { shortListedData } = props;
  if (!shortListedData) return null;
  const { shortlisted_details, shortlisted_status, assigned_review } =
    shortListedData;

  return (
    <>
      <div className="grid grid-cols gap-y-3">
        <h1 className="font-bold text-textBlack">Shortlisted Details</h1>
        <div className="grid grid-cols gap-y-3 md:grid-cols-2 md:gap-x-14">
          <div className="flex flex-col gap-y-4">
            {shortlisted_details.map((short, index: number) => (
              <div key={index} className="grid grid-cols gap-y-1">
                <h1 className="text-textGray text-xs">{short.title_head}</h1>
                <span className="text-textBlack text-sm">{short.value}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="grid grid-cols gap-y-4">
              <div className="grid grid-cols gap-y-1">
                <h1 className="text-textGray text-xs">Interview Status</h1>
                <Badge color="yellow" radius="md">
                  {shortlisted_status}
                </Badge>
              </div>
              <div className="grid grid-cols gap-y-1">
                <h1 className="text-textGray text-xs">Assigned to Review</h1>
                <Avatar.Group>
                  {assigned_review.map((assign, index: number) => (
                    <Avatar key={index} src={assign.img_profile} />
                  ))}
                </Avatar.Group>
              </div>
              <div>
                <Button size="xs">Move to next stage</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortListed;
