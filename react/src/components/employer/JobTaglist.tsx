import { Badge } from "@mantine/core";
import React from "react";

interface JobTagListProps {
  tag: string;
  index: number;
}

const JobTaglist: React.FC<JobTagListProps> = (props) => {
  const { tag, index } = props;
  return (
    <Badge
      color="gray"
      variant="light"
      key={index}
      radius="sm"
      size="sm"
      className="m-1"
    >
      {tag}
    </Badge>
  );
};

export default JobTaglist;
