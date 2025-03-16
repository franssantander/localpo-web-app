import { Divider } from "@mantine/core";
import React from "react";

const UserStatistics: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-between">
      <div className="w-full">
        <div className="flex flex-col gap-y-6 md:flex-row w-full justify-between">
          <div className="grid grid-cols gap-y-4">
            <h1 className="text-sm font-semibold text-textBlack">
              Jobs Posted
            </h1>
            <div>
              <h1 className="font-bold text-xl">8</h1>
              <span className="text-textGray text-xs">
                Number of jobs posted
              </span>
            </div>
          </div>

          <Divider orientation="vertical" />

          <div className="grid grid-cols gap-y-4">
            <h1 className="text-sm font-semibold text-textBlack">
              Applications Reviewed
            </h1>
            <div>
              <h1 className="font-bold text-xl">320</h1>
              <span className="text-textGray text-xs">
                Number of candidate reviewed
              </span>
            </div>
          </div>

          <Divider orientation="vertical" />

          <div className="grid grid-cols gap-y-4">
            <h1 className="text-sm font-semibold text-textBlack">
              Interviews Scheduled
            </h1>
            <div>
              <h1 className="font-bold text-xl">10</h1>
              <span className="text-textGray text-xs">
                Total interviews scheduled
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
