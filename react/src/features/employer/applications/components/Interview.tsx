import { Avatar, Badge, Button } from "@mantine/core";
import React from "react";
import { InterviewProps } from "../../../../interface/interface";

const Interview: React.FC<InterviewProps> = (props) => {
  const { interviewData } = props;
  if (!interviewData) return null;
  const { interview_details, interview_status, assigned_interview } =
    interviewData;

  return (
    <>
      <div className="grid grid-cols gap-y-3">
        <h1 className="font-bold text-textBlack">Interview Details</h1>
        <div className="grid grid-cols gap-y-3 md:grid-cols-2 md:gap-x-14">
          <div className="grid grid-cols gap-y-4">
            {interview_details.map((inter, index: number) => (
              <div className="grid grid-cols gap-y-1" key={index}>
                <h1 className="text-textGray text-xs">{inter.title_head}</h1>
                <span className="text-textBlack text-sm">{inter.value}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="grid grid-cols gap-y-4">
              <div className="grid grid-cols gap-y-1">
                <h1 className="text-textGray text-xs">Interview Status</h1>
                <Badge color="yellow" radius="md">
                  {interview_status}
                </Badge>
              </div>
              <div className="grid grid-cols gap-y-1">
                <h1 className="text-textGray text-xs">Assigned Interviewer</h1>
                <Avatar.Group>
                  {assigned_interview.map((assign, index: number) => (
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

export default Interview;
