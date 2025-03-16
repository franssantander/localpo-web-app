import { Avatar, Badge, Button } from "@mantine/core";
import React from "react";
import { ListApplicantsProps } from "../../../../interface/interface";

const ListApplicants: React.FC<ListApplicantsProps> = (props) => {
  const { applied, open } = props;
  const { img_profile, applicant_name, status, date_applied } = applied;

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Avatar size="lg" src={img_profile} alt="Profile" />
          <div className="grid grid-cols">
            <h1 className="text-textBlack font-bold">{applicant_name}</h1>
            <span className="text-textGray text-xs">
              Date Applied: {date_applied}
            </span>
            <Badge my={2} size="sm" radius="sm">
              {status}
            </Badge>
          </div>
        </div>
        <Button onClick={open} variant="outline" size="xs">
          View Application
        </Button>
      </div>
    </>
  );
};

export default ListApplicants;
