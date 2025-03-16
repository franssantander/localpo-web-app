import React from "react";
import { Card, Image, ActionIcon, Badge } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { JobListProps } from "../../../../interface/interface";
import JobDescription from "../../../../components/employer/JobDescription";
import { useDrawerStore } from "../../../../store/useDrawerStore";
import { statusData } from "../../../../util/statusData";
import JobTaglist from "../../../../components/employer/JobTaglist";
import { useJobListHook } from "../../../../hooks/useJobListHook";
import dayjs from "dayjs";

const JobList: React.FC<JobListProps> = (props) => {
  const { job, saveJobFn, openDrawer } = props;
  const {
    id,
    img,
    title,
    company,
    location,
    tags,
    job_description,
    posted,
    status,
    is_saved,
    is_applied,
  } = job;

  return (
    <div className="w-full relative">
      <Card
        className="cursor-pointer"
        onClick={() => openDrawer(id)}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <div className="relative">
          <div className="grid grid-cols gap-y-4 lg:flex lg:items-center lg:gap-x-4">
            <div>
              <Image
                radius="md"
                src={img}
                h={80}
                w={80}
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
              />
            </div>
            <div className="grid grid-cols gap-y-1">
              <h1 className="font-bold text-textBlack flex items-center gap-x-3">
                {title}
                <Badge size="sm" color={statusData(status)} variant="light">
                  {status}
                </Badge>
              </h1>
              <div className="flex gap-x-3 items-center text-sm text-textGray">
                <h1 className="text-xs md:text-sm flex items-center gap-x-1">
                  <Icon icon="ri:building-4-line" />
                  {company}
                </h1>
                <Icon fontSize={6} icon="material-symbols:circle" />
                <h1 className="text-xs md:text-sm flex items-center gap-x-1">
                  <Icon icon="ri:map-pin-line" />
                  {location}
                </h1>
              </div>
              <div>
                {tags?.map((tag: string, index: number) => (
                  <JobTaglist tag={tag} key={index} index={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-textGray grid grid-cols gap-y-2">
              <JobDescription content={job_description} />
            </div>
          </div>
          <div className="justify-end flex mt-3">
            <h1 className="text-textGray text-sm">
              {dayjs(posted).format("MMM DD YYYY")}
            </h1>
          </div>
        </div>
      </Card>
      <div className="absolute right-4 top-5 flex items-center gap-x-4">
        {is_applied && (
          <h1 className="text-sm text-textGray font-medium">Applied</h1>
        )}
        <ActionIcon
          onClick={() => saveJobFn({ id: id })}
          size={37}
          variant={is_saved ? "filled" : "default"}
          aria-label="Bookmark"
        >
          <Icon icon="ri:bookmark-line" />
        </ActionIcon>
      </div>
    </div>
  );
};

export default JobList;
