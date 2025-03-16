import { Badge, Button } from "@mantine/core";
import React from "react";
import { FinalStageProps } from "../../../../interface/interface";

const FinalStage: React.FC<FinalStageProps> = (props) => {
  const { finalStageData } = props;
  if (!finalStageData) return null;
  const { finalstage_details, finalstage_status } = finalStageData;

  return (
    <>
      <div className="grid grid-cols gap-y-3">
        <h1 className="font-bold text-textBlack">Final Stage Details</h1>
        <div className="grid grid-cols gap-y-3 md:grid-cols-2 md:gap-x-14">
          <div className="flex flex-col gap-y-4">
            {finalstage_details.map((final, index: number) => (
              <div className="grid grid-cols gap-y-1" key={index}>
                <h1 className="text-textGray text-xs">{final.title_head}</h1>
                <span className="text-textBlack text-sm">{final.value}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="grid grid-cols gap-y-4">
              <div className="grid grid-cols gap-y-1">
                <h1 className="text-textGray text-xs">Interview Status</h1>
                <Badge color="yellow" radius="md">
                  {finalstage_status}
                </Badge>
              </div>

              <div>
                <Button size="xs">Confirm Hiring</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalStage;
