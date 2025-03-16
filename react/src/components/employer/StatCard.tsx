import { Icon } from "@iconify/react/dist/iconify.js";
import { Card } from "@mantine/core";
import React from "react";
import { StatCardProps } from "../../interface/interface";

const StatCard: React.FC<StatCardProps> = ({
  title,
  description,
  total,
  icon,
}) => {
  return (
    <Card shadow="sm" withBorder>
      <div className="grid grid-cols gap-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-textBlack">{title}</h1>
          <Icon className="text-textBlack" fontSize={24} icon={icon} />
        </div>
        <div className="flex flex-col gap-y-1">
          <h1 className="font-bold text-textBlack text-xl">{total}</h1>
          <p className="text-textGray text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
