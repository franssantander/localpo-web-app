import React from "react";
import { Card, Image, Badge, List, ActionIcon } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { JobListProps } from "../../../../interface/interface";
import dayjs from "dayjs";
import JobTaglist from "../../../../components/employer/JobTaglist";

const SavedJobList: React.FC<JobListProps> = (props) => {
  const { job, saveJobFn, openDrawer } = props;
  const { id, img, title, company, location, tags, posted_date, is_jobsaved } = job;
  


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
        <div className="w-full flex justify-between">
          <div>
            <Image radius="sm" w={160} h={100} pb={7} src={img} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
          </div>
        </div>
        <div className="grid grid-cols gap-y-4">
          <div className="space-y-2">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-textBlack text-lg">{title}</h1>
              </div>
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
            </div>
            <div>
              {tags?.map((tag: string, index: number) => (
                <JobTaglist tag={tag} key={index} index={index} />
              ))}
            </div>
          </div>
          <span className="text-xs text-textGray text-right pt-3">
            {dayjs(posted_date).format("MMM DD YYYY")}
          </span>
        </div>
      </Card>
      <div className="absolute right-4 top-5">
        <ActionIcon
          className="absolute top-0"
          size="lg"
          variant={is_jobsaved ? "filled" : "default"}
          onClick={() => saveJobFn({ id: id })}
        >
          <Icon icon="ri:bookmark-line" />
        </ActionIcon>
      </div>
    </div>
  );
};

export default SavedJobList;
