import React from "react";
import { Badge, Button, Card, Image } from "@mantine/core";
import { JobListProps } from "../../../../interface/interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import JobTaglist from "../../../../components/employer/JobTaglist";
import { statusData } from "../../../../util/statusData";
import dayjs from "dayjs";

const ApplicationList: React.FC<JobListProps> = (props) => {
  const { job } = props;

  const {
    posted_job_id,
    company_profile,
    title,
    company,
    location,
    tags,
    status,
    applicant_status,
    date_applied,
  } = job;

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div>
          <Image
            radius="sm"
            w="auto"
            fit="contain"
            h={100}
            src={company_profile}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </div>
        <div className="absolute right-4">
          <Badge>{applicant_status}</Badge>
        </div>
        <div className="grid grid-cols gap-y-7">
          <div>
            <div className="flex flex-col gap-y-2 pt-3">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-textBlack flex items-center gap-x-2">
                  {title}
                  <Badge size="sm" color={statusData(status)} variant="light">
                    {status}
                  </Badge>
                </h1>
              </div>
              <div className="grid grid-cols gap-y-2">
                <div className="flex items-center gap-x-2">
                  <Icon className="text-textGray" icon="ri:building-4-line" />
                  <span className="text-textGray text-xs">{company}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Icon className="text-textGray" icon="ri:map-pin-line" />
                  <span className="text-textGray text-xs">{location}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {tags?.map((tag: string, index: number) => (
                <JobTaglist tag={tag} key={index} index={index} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <Link
              state={{ application_data: job }}
              to={`/job-seeker/view-application/${posted_job_id}`}
            >
              <Button size="xs" w="100%">
                View Application
              </Button>
            </Link>
            <span className="text-xs text-textGray flex justify-end">
              Applied on {dayjs(date_applied).format("MMM DD YYYY")}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ApplicationList;
