import React from "react";
import { Card, Image, ActionIcon, Badge } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { JobListProps } from "../../interface/interface";
import dayjs from "dayjs";
import JobTaglist from "../employer/JobTaglist";
import { statusData } from "../../util/statusData";
import { useDrawerStore } from "../../store/useDrawerStore";

const SimilarJobs: React.FC<JobListProps> = (props) => {
  const { similarJob, saveJobFn } = props;
  const { openDrawer } = useDrawerStore();
  if (!similarJob) {
    return [];
  }
  const {
    id,
    job_title,
    company_name,
    company_profile,
    location,
    tags,
    created_at,
    status,
    is_saved,
    is_applied,
  } = similarJob;

  return (
    <div className="w-full relative">
      <Card
        className="cursor-pointer"
        onClick={() => openDrawer(id)}
        shadow="sm"
        padding="sm"
        radius="md"
        withBorder
      >
        <div className="flex items-start justify-between w-full">
          <div className="grid grid-cols gap-y-2">
            <div className="flex items-center gap-x-2">
              <div>
                <Image
                  radius="sm"
                  src={company_profile}
                  w={50}
                  h={50}
                  fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                />
              </div>
              <div className="grid grid-cols gap-y-1">
                <h1 className="font-bold text-sm text-textBlack flex items-center gap-x-3">
                  {job_title}
                  <Badge size="sm" color={statusData(status)} variant="light">
                    {status}
                  </Badge>
                </h1>
                <div>
                  <div className="flex gap-x-2 items-center text-textGray">
                    <h1 className="text-xs flex font items-center gap-x-1">
                      <Icon icon="ri:building-4-line" />
                      {company_name}
                    </h1>
                    <Icon fontSize={6} icon="material-symbols:circle" />
                    <h1 className="text-xs flex items-center gap-x-1">
                      <Icon icon="ri:map-pin-line" />
                      {location}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {tags?.map((tag: string, index: number) => (
                <JobTaglist tag={tag} key={index} index={index} />
              ))}
            </div>
            <div className="flex justify-start pt-2">
              <h1 className="text-xs text-textGray">
                {dayjs(created_at).format("MMM DD YYYY")}
              </h1>
            </div>
          </div>
        </div>
      </Card>
      <div className="absolute right-3 top-4 flex items-center gap-x-3">
        {is_applied && <h1 className="text-xs text-textGray">Applied</h1>}
        <ActionIcon
          onClick={() => saveJobFn({ id: id })}
          size={34}
          variant={is_saved ? "filled" : "default"}
          aria-label="Bookmark"
        >
          <Icon icon="ri:bookmark-line" />
        </ActionIcon>
      </div>
    </div>
  );
};

export default SimilarJobs;
