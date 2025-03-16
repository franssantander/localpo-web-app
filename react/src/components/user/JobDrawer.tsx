import React from "react";
import {
  Image,
  ActionIcon,
  Badge,
  Drawer,
  Button,
  ScrollArea,
} from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { JobListProps } from "../../interface/interface";
// import jobData from "../../data/jobs.json";
import SimilarJobs from "../../components/user/SimalarJobs";
import { Link, useNavigate } from "react-router-dom";
import JobDescription from "../employer/JobDescription";
import { useDrawerStore } from "../../store/useDrawerStore";
import { useJobDrawerHook } from "../../hooks/useJobDrawerHook";
import { statusData } from "../../util/statusData";
import JobTaglist from "../employer/JobTaglist";
import dayjs from "dayjs";

const JobDrawer: React.FC<JobListProps> = (props) => {
  const { isOpen } = useDrawerStore();
  const { saveJobFn, closeDrawer } = props;

  const {
    jobDrawer,
    similarJob,
    isPendingDrawerView,
    isPendingWithdrawApplication,
    withdrawApplicationFn,
  } = useJobDrawerHook();

  console.log('job_drawer', jobDrawer)
  const {
    id,
    company_profile,
    bg_img,
    job_title,
    job_description,
    location,
    status,
    posted,
    company_name,
    tags,
    is_applied,
    is_saved,
  } = jobDrawer || {};


  return (
    <>
      <Drawer
        opened={isOpen}
        onClose={closeDrawer}
        position="bottom"
        scrollAreaComponent={ScrollArea.Autosize}
        size="full"
        style={{ overflow: "hidden" }}
        classNames={{
          inner: "pt-10",
        }}
      >
        <div>
          <Image
            src={bg_img}
            h={250}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </div>
        <div className="grid lg:grid-cols-[4fr_2fr] px-4 gap-y-10 lg:pt-6 lg:px-4 mb-10">
          <div className="lg:pr-14">
            <div className="pt-4 flex flex-col gap-y-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-x-4">
                <div>
                  <Image
                    radius="sm"
                    src={company_profile}
                    w={80}
                    h={80}
                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-md text-textBlack flex items-center gap-x-3">
                    {job_title}
                    <Badge size="sm" color={statusData(status)} variant="light">
                      {status}
                    </Badge>
                  </h1>
                  <div>
                    <div className="flex gap-x-3 items-center text-textGray">
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
                    <div>
                      {tags?.map((tag: string, index: number) => (
                        <JobTaglist tag={tag} key={index} index={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-3">
                  {is_applied ? (
                    <Button size="xs" disabled>
                      Applied
                    </Button>
                  ) : (
                    <Button
                      size="xs"
                      component={Link}
                      state={{ job_id: id }}
                      to={`/job-seeker/apply-job/${id}`}
                    >
                      Apply Now
                    </Button>
                  )}
                  {is_applied && (
                    <Button
                      size="xs"
                      variant="outline"
                      disabled={isPendingWithdrawApplication}
                      onClick={() =>
                        withdrawApplicationFn({ applied_job_id: id })
                      }
                    >
                      {isPendingWithdrawApplication && (
                        <h1 className="flex items-center gap-x-2 text-sm">
                          <Icon
                            className="animate-spin"
                            icon="radix-icons:reload"
                            width="15"
                            height="15"
                          />
                          Loading...
                        </h1>
                      )}
                      {!isPendingWithdrawApplication && "Withdraw Application"}
                    </Button>
                  )}
                  <ActionIcon
                    size="lg"
                    variant={is_saved ? "filled" : "default"}
                    aria-label="Bookmark"
                    onClick={() => saveJobFn({ id: id })}
                  >
                    <Icon icon="ri:bookmark-line" />
                  </ActionIcon>
                  <ActionIcon size="lg" variant="default" aria-label="Share">
                    <Icon icon="ri:share-line" />
                  </ActionIcon>
                </div>
                <h1 className="text-textGray text-xs flex justify-end pt-4">
                  {dayjs(posted).format("MMM DD YYYY")}
                </h1>
              </div>
            </div>
            <div className="grid grid-cols gap-y-2 py-7">
              <JobDescription
                isOpen={isOpen}
                close={closeDrawer}
                content={job_description}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="font-bold text-textBlack">Similar Job</h1>
            <ScrollArea h={500}>
              <div className="grid grid-cols gap-y-4">
                {!isPendingDrawerView && (
                  <>
                    {similarJob &&
                      similarJob?.map((similarJob: object[], index: number) => (
                        <SimilarJobs
                          similarJob={similarJob}
                          saveJobFn={saveJobFn}
                          key={index}
                        />
                      ))}
                  </>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default JobDrawer;
