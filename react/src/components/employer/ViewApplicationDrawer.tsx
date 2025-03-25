import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Card,
    Divider,
    Drawer,
    Image,
    List,
    ScrollArea,
    Menu,
} from "@mantine/core";
import { ViewApplicationDrawerProps } from "../../interface/interface";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import { useOpenScheduleModal } from "../../hooks/useOpenScheduleModal";
import { Link } from "react-router-dom";
import JobDescription from "./JobDescription";

const ViewApplicationDrawer: React.FC<ViewApplicationDrawerProps> = (props) => {
    const {
        selectedApplicant,
        opened: isDrawerOpen,
        close: closeDrawer,
    } = props;

    const {
        opened: isScheduleModalOpen,
        open: openScheduleModal,
        close: closeScheduleModal,
    } = useOpenScheduleModal();

    if (!selectedApplicant) return null;

    const {
        img_profile,
        bg_cover,
        job_title,
        applicant_name,
        applicant_email,
        contact_number,
        location,
        status,
        available_date,
        available_time,
        description,
        availability_time_1,
        availability_time_2,
        experience,
        skills,
        documents,
    } = selectedApplicant;

    const parsedExperience = JSON.parse(experience);
    const parsedSkills = skills ? JSON.parse(skills) : [];
    const skillsText = parsedSkills.join(", ");

    console.log("experience: ", parsedExperience);
    // console.log("parsedSkills: ", skillsText);

    return (
        <>
            <Drawer
                size={830}
                opened={isDrawerOpen}
                onClose={closeDrawer}
                title="Applied Candidate"
                position="right"
                scrollAreaComponent={ScrollArea.Autosize}
            >
                <div className="relative">
                    <Image
                        fit="cover"
                        h={190}
                        src={bg_cover}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                    />
                    <div className="w-full px-4">
                        <div className="absolute top-[9rem]">
                            <Avatar
                                className="border-2"
                                size="xl"
                                src={img_profile}
                                alt="Profile"
                            />
                        </div>
                        <div className="flex flex-col gap-y-3 pt-12 justify-between md:flex-row">
                            <div>
                                <h1 className="font-bold text-2xl text-textBlack flex items-center gap-x-2">
                                    {applicant_name}
                                    <Badge
                                        variant="light"
                                        radius="sm"
                                        size="sm"
                                    >
                                        {status}
                                    </Badge>
                                </h1>
                                <span className="text-textGray">
                                    {job_title}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-2.5">
                                <ActionIcon variant="outline" size={30}>
                                    <Icon fontSize={16} icon="ri:mail-line" />
                                </ActionIcon>
                                <Button size="xs" onClick={openScheduleModal}>
                                    Schedule Interview
                                </Button>
                                <Button size="xs" variant="outline" color="red">
                                    Reject Application
                                </Button>
                            </div>
                        </div>
                        <Divider size="sm" my={44} />
                        <div className="grid grid-cols gap-y-9 pb-32 lg:grid-cols-[1fr_.8fr] lg:gap-x-4">
                            <div className="grid grid-cols gap-y-9">
                                <div className="grid grid-cols gap-y-3">
                                    <h1 className="font-bold text-lg text-textBlack">
                                        Description
                                    </h1>
                                    <div>
                                        <JobDescription content={description} />
                                    </div>
                                    {/* <p className="text-sm text-textGray"></p> */}
                                </div>
                                {experience && (
                                    <div className="grid grid-cols gap-y-3">
                                        <h1 className="font-bold text-lg text-textBlack">
                                            Experience
                                        </h1>
                                        {parsedExperience?.map((exp, index) => (
                                            <List
                                                key={index}
                                                type="unordered"
                                                className="list-disc text-textGray grid grid-cols gap-y-4"
                                                size="sm"
                                                icon={
                                                    <Icon
                                                        icon="ri:checkbox-circle-fill"
                                                        fontSize={24}
                                                        color="green"
                                                    />
                                                }
                                            >
                                                <List.Item className="text-sm leading-6">
                                                    <h1 className="font-medium text-textBlack">
                                                        {exp.position} -{" "}
                                                        {exp.company}
                                                    </h1>
                                                    <span className="text-xs">
                                                        {exp.start_date} - {exp.end_date}
                                                    </span>
                                                </List.Item>
                                            </List>
                                        ))}
                                        {/* {parsedExperience?.map((exp, index) => (
                      <List
                        key={index}
                        type="unordered"
                        className="list-disc text-textGray grid grid-cols gap-y-4"
                        size="sm"
                        icon={
                          <Icon
                            icon="ri:checkbox-circle-fill"
                            fontSize={24}
                            color="green"
                          />
                        }
                      >
                        <List.Item className="text-sm leading-6">
                          <h1 className="font-medium text-textBlack">
                            {exp.position} - {exp.company}
                          </h1>
                          <span className="text-xs">
                            {exp.start_date} - {exp.end_date}
                          </span>
                        </List.Item>
                      </List>
                    ))} */}
                                    </div>
                                )}
                                <div className="grid grid-cols gap-y-3">
                                    <h1 className="font-bold text-lg text-textBlack">
                                        Skills
                                    </h1>
                                    <div className="flex items-center gap-x-3 flex-wrap">
                                        <List
                                            className="text-textGray"
                                            size="sm"
                                        >
                                            <List.Item>{skillsText}</List.Item>
                                        </List>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-14 lg:border-2 lg:rounded-lg lg:p-4">
                                <div className="grid grid-cols gap-y-3">
                                    <h1 className="font-bold text-lg text-textBlack">
                                        Overview
                                    </h1>
                                    <List
                                        type="unordered"
                                        className="list-disc text-textGray grid grid-cols gap-y-4"
                                        size="sm"
                                    >
                                        <List.Item
                                            icon={
                                                <Icon
                                                    fontSize={24}
                                                    icon="ri:mail-line"
                                                />
                                            }
                                        >
                                            {applicant_email}
                                        </List.Item>
                                        <List.Item
                                            icon={
                                                <Icon
                                                    fontSize={24}
                                                    icon="ri:phone-line"
                                                />
                                            }
                                        >
                                            {contact_number}
                                        </List.Item>
                                        <List.Item
                                            icon={
                                                <Icon
                                                    fontSize={24}
                                                    icon="ri:map-pin-line"
                                                />
                                            }
                                        >
                                            {location}
                                        </List.Item>
                                    </List>
                                </div>
                                <div className="grid grid-cols gap-y-3">
                                    <h1 className="font-bold text-lg text-textBlack">
                                        Availability
                                    </h1>
                                    <List
                                        type="unordered"
                                        className="list-disc text-textGray grid grid-cols gap-y-4"
                                        size="sm"
                                    >
                                        <List.Item
                                            icon={
                                                <Icon
                                                    fontSize={24}
                                                    icon="ri:time-line"
                                                />
                                            }
                                        >
                                            {availability_time_1}
                                        </List.Item>
                                        <List.Item
                                            icon={
                                                <Icon
                                                    fontSize={24}
                                                    icon="ri:time-line"
                                                />
                                            }
                                        >
                                            {availability_time_2}
                                        </List.Item>
                                    </List>
                                </div>
                                <div className="grid grid-cols gap-y-3">
                                    <h1 className="font-bold text-lg text-textBlack">
                                        File Attachment
                                    </h1>
                                    {documents?.map((doc, index) => (
                                        <Card
                                            key={index}
                                            radius="sm"
                                            shadow="sm"
                                            withBorder
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-x-2">
                                                    <Image
                                                        src={doc.icon}
                                                        w={47}
                                                    />
                                                    <div>
                                                        <h1 className="text-textBlack font-medium text-sm">
                                                            {doc.title}
                                                        </h1>
                                                        <span className="text-textGray text-xs">
                                                            File -{" "}
                                                            {doc.file_size}
                                                            {/* {dayjs(doc.uploaded_date).format("MMM DD YYYY")} */}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Menu shadow="md" width={160}>
                                                    <Menu.Target>
                                                        <ActionIcon variant="transparent">
                                                            <Icon
                                                                fontSize={24}
                                                                icon="radix-icons:dots-vertical"
                                                            />
                                                        </ActionIcon>
                                                    </Menu.Target>

                                                    <Menu.Dropdown>
                                                        <Menu.Label>
                                                            Action
                                                        </Menu.Label>
                                                        <Menu.Item
                                                            component={Link}
                                                            to={doc.file}
                                                            rightSection={
                                                                <Icon icon="radix-icons:download" />
                                                            }
                                                        >
                                                            Download
                                                        </Menu.Item>
                                                        <Menu.Item
                                                            rightSection={
                                                                <Icon icon="radix-icons:eye-open" />
                                                            }
                                                        >
                                                            View
                                                        </Menu.Item>
                                                    </Menu.Dropdown>
                                                </Menu>
                                            </div>
                                        </Card>
                                    ))}
                                    {/* <Card radius="sm" shadow="sm" withBorder>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <Image src={pdfSvg} w={47} />
                        <div>
                          <h1 className="text-textBlack font-medium text-sm">
                            John Doe Resume.pdf
                          </h1>
                          <span className="text-textGray text-xs">
                            File - 2.1 mb
                          </span>
                        </div>
                      </div>
                      <Menu shadow="md" width={160}>
                        <Menu.Target>
                          <ActionIcon variant="transparent">
                            <Icon
                              fontSize={24}
                              icon="radix-icons:dots-vertical"
                            />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label>Action</Menu.Label>
                          <Menu.Item
                            rightSection={<Icon icon="radix-icons:download" />}
                          >
                            Download
                          </Menu.Item>
                          <Menu.Item
                            rightSection={<Icon icon="radix-icons:eye-open" />}
                          >
                            View
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                  </Card>
                  <Card radius="sm" shadow="sm" withBorder>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <Image src={docxSvg} w={47} />
                        <div>
                          <h1 className="text-textBlack font-medium text-sm">
                            John Doe Resume.docx
                          </h1>
                          <span className="text-textGray text-xs">
                            File - 2.1 mb
                          </span>
                        </div>
                      </div>
                      <Menu shadow="md" width={160}>
                        <Menu.Target>
                          <ActionIcon variant="transparent">
                            <Icon
                              fontSize={24}
                              icon="radix-icons:dots-vertical"
                            />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label>Action</Menu.Label>
                          <Menu.Item
                            rightSection={<Icon icon="radix-icons:download" />}
                          >
                            Download
                          </Menu.Item>
                          <Menu.Item
                            rightSection={<Icon icon="radix-icons:eye-open" />}
                          >
                            View
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                  </Card> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <ScheduleInterviewModal
                opened={isScheduleModalOpen}
                close={closeScheduleModal}
                img_profile={img_profile}
            />
        </>
    );
};

export default ViewApplicationDrawer;
