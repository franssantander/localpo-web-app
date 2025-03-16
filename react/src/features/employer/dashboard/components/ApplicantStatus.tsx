import { Badge, Card } from "@mantine/core";
import React from "react";
import { ApplicantStatusProps } from "../../../../interface/interface";

const ApplicantStatus: React.FC<ApplicantStatusProps> = (props) => {
  const { appl } = props;
  const { title, count } = appl;

  return (
    <>
      <Card w="100%" withBorder>
        <div className="items-center justify-center flex flex-col gap-y-2">
          <h1 className="text-textBlack text-sm font-medium">{title}</h1>
          <Badge variant="light" radius="sm">
            {count}
          </Badge>
        </div>
      </Card>
    </>
  );
};

export default ApplicantStatus;
