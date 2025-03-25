import React from "react";
import { Badge, Breadcrumbs, Button, Image } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import ApplicantStatus from "./ApplicantStatus";
import JobTaglist from "../../../../components/employer/JobTaglist";
import JobDescription from "../../../../components/employer/JobDescription";
import dayjs from "dayjs";
import CloseJobModal from "./CloseJobModal";
import { useModalStore } from "../../../../store/useModalStore";
import { statusData } from "../../../../util/statusData";
import { useApplicantStatus } from "../hooks/useApplicantStatus";

const PostedJob: React.FC = () => {
    const items = [
        { title: "Dashboard", href: "#" },
        { title: "Frontend Developer", href: "#" },
    ].map((item, index) => (
        <Link to={item.href} key={index}>
            {item.title}
        </Link>
    ));

    const location = useLocation();
    const viewJobData = location.state;
    const id = viewJobData.id;

    console.log(viewJobData)

    const { applicantStatusData } = useApplicantStatus(id);

    // const applicantsStatus = [
    //   {
    //     title: "Applied",
    //     count: 26,
    //   },
    //   {
    //     title: "In Review",
    //     count: 12,
    //   },
    //   {
    //     title: "Interviewed",
    //     count: 9,
    //   },
    //   {
    //     title: "ShortListed",
    //     count: 7,
    //   },
    //   {
    //     title: "Offer Made",
    //     count: 6,
    //   },
    //   {
    //     title: "Hired",
    //     count: 3,
    //   },
    //   {
    //     title: "Declined",
    //     count: 3,
    //   },
    //   {
    //     title: "Rejected",
    //     count: 3,
    //   },
    // ];

    const { openModal } = useModalStore();

    return (
        <>
            <div className="w-full">
                <div className="grid grid-cols gap-y-1">
                    <h1 className="font-bold text-textBlack text-2xl">
                        Job Posted
                    </h1>
                    <Breadcrumbs className="text-blue-500 text-sm">
                        {items}
                    </Breadcrumbs>
                </div>
                <div className="py-10">
                    <Image
                        h={300}
                        src={viewJobData.background_img}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                        radius="sm"
                    />
                    <div className="flex flex-col py-7 gap-y-4 md:flex-row md:justify-between md:items-center">
                        <div className="grid grid-cols gap-y-2">
                            <div>
                                <div className="grid grid-cols gap-y-1">
                                    <Badge
                                        variant="light"
                                        color={statusData(viewJobData.status)}
                                    >
                                        {viewJobData.status}
                                    </Badge>
                                </div>
                                <h1 className="text-textBlack font-bold text-xl sm:text-2xl">
                                    {viewJobData.job_title}
                                </h1>
                                <div className="flex items-center gap-x-3">
                                    <span className="text-textGray text-sm">
                                        {viewJobData.location}
                                    </span>
                                    <Icon
                                        className="text-textGray"
                                        fontSize={6}
                                        icon="mdi:checkbox-blank-circle"
                                    />
                                    <span className="text-textGray text-sm">
                                        {dayjs(viewJobData.posted_date).format(
                                            "MMM DD YYYY"
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {viewJobData.tags.map(
                                    (tag: string, index: number) => (
                                        <JobTaglist
                                            tag={tag}
                                            key={index}
                                            index={index}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <Button
                                size="xs"
                                color={
                                    viewJobData.status === "Active" ? "red" : ""
                                }
                                variant={
                                    viewJobData.status === "Active"
                                        ? "outline"
                                        : ""
                                }
                                onClick={() => openModal("modal", viewJobData)}
                            >
                                {viewJobData.status === "Active"
                                    ? "Close Job Posting"
                                    : "Reopen Job"}
                            </Button>
                            {viewJobData.status === "Active" && (
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
                    <div className="grid grid-cols gap-y-9">
                        <JobDescription content={viewJobData.job_description} />
                        <div className="grid grid-cols gap-y-3">
                            <h1 className="font-bold text-textBlack text-md">
                                Company Overview
                            </h1>
                            <p className="text-textGray text-sm sm:max-w-2xl">
                                {viewJobData.company_description}
                            </p>
                        </div>
                        <div className="grid grid-cols gap-y-3">
                            <h1 className="font-bold text-textBlack text-md">
                                Applicant Status
                            </h1>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex gap-2">
                                {applicantStatusData?.map((appl, index) => (
                                    <ApplicantStatus appl={appl} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CloseJobModal status={viewJobData.status} />
        </>
    );
};

export default PostedJob;
