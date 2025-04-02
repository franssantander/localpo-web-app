import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Divider,
  Image,
  List,
  Menu,
} from "@mantine/core";
import pdfSvg from "../../../../assets/pdf-icon.svg";
import docxSvg from "../../../../assets/docx-icon.svg";
import React from "react";
import { ApplicantProfileProps } from "../../../../interface/interface";
import { useOpenScheduleModal } from "../../../../hooks/useOpenScheduleModal";
import ScheduleInterviewModal from "../../../../components/employer/ScheduleInterviewModal";

const ApplicantProfile: React.FC<ApplicantProfileProps> = (props) => {
  const { applicantProfileData } = props;

  const {
    opened: isScheduleModalOpen,
    open: openScheduleModal,
    close: closeScheduleModal,
  } = useOpenScheduleModal();

  if (!applicantProfileData) {
    return <div>No candidate data available.</div>;
  }

  const {
    img_profile,
    applicant_name,
    job_title,
    description,
    skills,
    work_experience,
    applicant_email,
    applicant_phone,
    availability_date,
    availability_time,
  } = applicantProfileData;

  return (
    <>
      <div className="py-10 md:grid">
        <div className="grid grid-cols gap-y-4 md:gap-y-2 md:flex md:justify-between md:items-center">
          <div className="flex items-center gap-x-2">
            <Avatar size="lg" src={img_profile} />
            <div className="flex flex-col gap--1">
              <h1 className="font-bold text-textBlack">{applicant_name}</h1>
              <span className="text-textGray text-sm">{job_title}</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1 justify-end sm:gap-x-2">
            <ActionIcon variant="outline">
              <Icon icon="ri:mail-line" />
            </ActionIcon>
            <Button size="xs" onClick={openScheduleModal}>
              Schedule Interview
            </Button>
            <Button size="xs" color="red" variant="outline">
              Reject Application
            </Button>
          </div>
        </div>
        <Divider size={2} my={42} />
        <div className="grid grid-cols gap-y-9 md:grid md:grid-cols-2 gap-x-9">
          <div className="grid grid-cols gap-y-9">
            <div className="grid grid-cols gap-y-3">
              <h1 className="font-bold text-textBlack text-md">Description</h1>
              <div className="text-textGray text-sm text-start">
                {description}
              </div>
            </div>
            <div className="grid grid-cols gap-y-3">
              <h1 className="font-bold text-textBlack text-md">Experience</h1>
              {/* <List
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
                {work_experience.map((exp, index: number) => (
                  <List.Item className="text-sm leading-6" key={index}>
                    <h1 className="font-medium text-textBlack">
                      {exp.job_title} - {exp.company}
                    </h1>
                    <span className="text-xs">{exp.years_experience}</span>
                  </List.Item>
                ))}
                <List.Item className="text-sm leading-6">
                  <h1 className="font-medium text-textBlack">
                    Backend Developer - Microsoft
                  </h1>
                  <span className="text-xs">June 2023 - May 2024</span>
                </List.Item>
              </List> */}
            </div>
            <div className="grid grid-cols gap-y-3">
              <h1 className="font-bold text-textBlack text-md">Skills</h1>
              <div>
                {/* <List
                  className="text-textGray flex items-center gap-x-3 flex-wrap"
                  size="sm"
                >
                  {skills.map((skill, index: number) => (
                    <List.Item key={index}>{skill}</List.Item>
                  ))}
                </List> */}
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols gap-y-9">
              <div className="grid grid-cols gap-y-3">
                <h1 className="font-bold text-textBlack text-md">Overview</h1>
                <List
                  type="unordered"
                  className="list-disc text-textGray grid grid-cols gap-y-2"
                  size="sm"
                >
                  <List.Item icon={<Icon fontSize={18} icon="ri:mail-line" />}>
                    {applicant_email}
                  </List.Item>
                  <List.Item icon={<Icon fontSize={18} icon="ri:phone-line" />}>
                    {applicant_phone}
                  </List.Item>
                  <List.Item
                    icon={<Icon fontSize={18} icon="ri:map-pin-line" />}
                  >
                    Metro Manila
                  </List.Item>
                </List>
              </div>
              <div className="grid grid-cols gap-y-3">
                <h1 className="font-bold text-textBlack text-md">
                  Availability
                </h1>
                <List
                  type="unordered"
                  className="list-disc text-textGray grid grid-cols gap-y-2"
                  size="sm"
                >
                  <List.Item
                    icon={<Icon fontSize={18} icon="ri:calendar-check-line" />}
                  >
                    {availability_date}
                  </List.Item>
                  <List.Item icon={<Icon fontSize={18} icon="ri:time-line" />}>
                    {availability_time}
                  </List.Item>
                </List>
              </div>
              <div className="grid grid-cols gap-y-3">
                <h1 className="font-bold text-lg text-textBlack">
                  File Attachment
                </h1>
                <Card radius="sm" shadow="sm" withBorder>
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
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScheduleInterviewModal
        opened={isScheduleModalOpen}
        close={closeScheduleModal}
        img_profile={img_profile}
      />
    </>
  );
};

export default ApplicantProfile;
