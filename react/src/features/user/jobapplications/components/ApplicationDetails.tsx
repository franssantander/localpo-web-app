import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge, Button, Card, Image, Menu } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { statusData } from "../../../../util/statusData";
import JobTaglist from "../../../../components/employer/JobTaglist";
import dayjs from "dayjs";
import JobDescription from "../../../../components/employer/JobDescription";
import { useJobApplicationsHook } from "../hooks/useJobApplicationsHook";

const ApplicationDetails: React.FC = () => {
  const location = useLocation();
  const applicationData = location.state.application_data;
  const {
    posted_job_id,
    title,
    status,
    location: company_location,
    company,
    company_overview,
    company_profile,
    bg_img,
    job_description,
    tags,
    date_applied,
    applicant_status,
    documents,
  } = applicationData;

  const { appliedJobs, withdrawApplicationFn } = useJobApplicationsHook();

  return (
    <>
      <div className="w-full h-full left-0">
        <Image
          h={300}
          src={bg_img}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </div>
      <div className="w-full h-full bg-white">
        <div className="w-full h-full pt-5 pb-32 max-w-[64rem] mx-auto px-4">
          <div className="grid grid-cols gap-y-10">
            <div className="flex flex-col gap-y-6 md:flex-row md:justify-between md:items-center">
              <div className="flex flex-col md:flex-row gap-x-4 pt-10">
                <Image
                  w="100"
                  src={company_profile}
                  fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                />
                <div className="grid grid-cols gap-y-1">
                  <h1 className="font-bold text-xl text-textBlack flex items-center gap-x-2">
                    {title}
                    <Badge size="sm" color={statusData(status)} variant="light">
                      {status}
                    </Badge>
                  </h1>
                  <div className="flex flex-col md:flex-row md:items-center gap-x-4">
                    <span className="flex items-center gap-x-1 text-textGray">
                      <Icon icon="ri:building-4-line" />
                      {company}
                    </span>
                    <Icon
                      className="text-textGray hidden md:block"
                      fontSize="6"
                      icon="ri:checkbox-blank-circle-fill"
                    />
                    <span className="flex items-center gap-x-1 text-textGray">
                      <Icon icon="ri:map-pin-line" />
                      {company_location}
                    </span>
                  </div>
                  <div>
                    {tags?.map((tag: string, index: number) => (
                      <JobTaglist tag={tag} key={index} index={index} />
                    ))}
                  </div>
                </div>
              </div>
              {appliedJobs?.length === 0 ? (
                <Button
                  size="xs"
                  component={Link}
                  state={{ job_id: posted_job_id }}
                  to={`/job-seeker/apply-job/${posted_job_id}`}
                >
                  Apply Now
                </Button>
              ) : (
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    withdrawApplicationFn({ applied_job_id: posted_job_id })
                  }
                >
                  Withdraw Application
                </Button>
              )}
            </div>
            <div className="grid grid-cols gap-y-4">
              <div className="text-textGray grid grid-cols gap-y-2">
                <JobDescription content={job_description} />
              </div>
            </div>
            <div className="grid grid-cols gapy-4">
              <h1 className="font-bold text-md text-textBlack">
                Company Overview
              </h1>
              <div className="grid grid-cols gap-y-3">
                <p className="text-textGray text-sm">{company_overview}</p>
              </div>
            </div>
            <div className="grid grid-cols gap-y-4">
              <h1 className="font-bold text-md text-textBlack">
                Application Details
              </h1>
              <div className="grid grid-cols gap-y-3">
                <p className="text-textGray text-sm">
                  Date Applied:{" "}
                  <span className="text-textBlack font-medium">
                    {dayjs(date_applied).format("MMM DD YYYY")}
                  </span>
                </p>
                <p className="text-textGray text-sm">
                  Status:{" "}
                  <span className="text-textBlack font-medium">
                    {applicant_status}
                  </span>
                </p>
                <p className="text-textGray text-sm">Interview Scheduled:</p>
                <p className="text-textGray text-sm">Offer Received:</p>
              </div>
            </div>
            <div className="grid grid-cols gap-y-4">
              <h1 className="font-bold text-md text-textBlack">
                Uploaded Documents
              </h1>
              <div className="grid grid-cols gap-y-3">
                {documents?.map((doc, index) => (
                  <Card key={index} radius="md" p={27} withBorder>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-3">
                        <Image src={doc.icon} w={76} />
                        <div>
                          <h1 className="font-bold text-md text-textBlack">
                            {doc.title}
                          </h1>
                          <span className="text-textGray text-sm">
                            {dayjs(doc.uploaded_date).format("MMM DD YYYY")}
                          </span>
                        </div>
                      </div>
                      <Menu shadow="md" width={170}>
                        <Menu.Target>
                          <Icon
                            className="cursor-pointer"
                            fontSize={24}
                            icon="ri:more-2-fill"
                          />
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label>Action</Menu.Label>
                          <Menu.Item
                            component={Link}
                            to={doc.file}
                            leftSection={<Icon icon="ri:download-2-fill" />}
                          >
                            Download
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationDetails;
