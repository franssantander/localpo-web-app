import React from "react";
import { Avatar, Badge, Breadcrumbs, Button, Image } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import CandidateTabs from "./CandidateTabs";
import { useJobViewHook } from "../hooks/useJobViewHook";
import { statusData } from "../../../../util/statusData";
import JobDescription from "../../../../components/employer/JobDescription";
import dayjs from "dayjs";
import JobTaglist from "../../../../components/employer/JobTaglist";
import { useModalStore } from "../../../../store/useModalStore";
import Modals from "../../../../components/Modals";

const JobsManagementView: React.FC = () => {
  const items = [
    { title: "Jobs Management", href: "#" },
    { title: "Senior Software Engineer", href: "#" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  const location = useLocation();
  const id = location.state.id;
  const { viewJobData, viewJobIsLoading } = useJobViewHook(id);
  const { openModal } = useModalStore();

  return (
    <>
      {viewJobIsLoading && <h1>Loading</h1>}
      {!viewJobIsLoading && (
        <>
          <div>
            <div className="grid grid-cols gap-y-2">
              <h1 className="font-bold text-textBlack text-xl">
                Jobs Management
              </h1>
              <Breadcrumbs className="text-blue-500">{items}</Breadcrumbs>
            </div>
            <div className="py-14 grid md:grid-cols-[.7fr_1fr] gap-7">
              <CandidateTabs />
              <div>
                <Image radius="md" h={250} src={viewJobData?.background_img} />
                <div className="grid grid-cols gap-y-1 py-7">
                  <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
                    <div className="space-y-2">
                      <Avatar size="lg" src={viewJobData?.company_profile} />
                      <Badge
                        size="md"
                        color={viewJobData && statusData(viewJobData?.status)}
                        variant="light"
                        radius="md"
                      >
                        {viewJobData?.status}
                      </Badge>
                      <h1 className="font-bold text-2xl">
                        {viewJobData?.job_title}
                      </h1>
                      <div className="flex items-center gap-x-3 text-textGray">
                        <span>{viewJobData?.location}</span>
                        <Icon fontSize={6} icon="mdi:circle" />
                        <span>
                          {dayjs(viewJobData?.posted_date).format(
                            "MMM. DD, YYYY"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        {viewJobData?.tags.map((tag, index) => (
                          <JobTaglist tag={tag} index={index} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <Button
                        size="xs"
                        color={viewJobData?.status === "Active" ? "red" : ""}
                        variant={
                          viewJobData?.status === "Active" ? "outline" : ""
                        }
                        onClick={() => openModal("modal", viewJobData)}
                      >
                        {viewJobData?.status === "Active"
                          ? "Close Job Posting"
                          : "Reopen Job"}
                      </Button>
                      {viewJobData?.status === "Active" && (
                        <Button
                          size="xs"
                          component={Link}
                          state={viewJobData}
                          to="edit-job"
                        >
                          Edit Job
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols gap-y-10 py-10">
                    <JobDescription content={viewJobData?.job_description} />
                    <div className="grid grid-cols gap-y-3">
                      <h1 className="font-bold text-textBlack text-md">
                        Company Overview
                      </h1>
                      <p className="text-textGray text-sm sm:max-w-2xl">
                        {viewJobData?.company_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modals page="JobsManagement" />
        </>
      )}
    </>
  );
};

export default JobsManagementView;
