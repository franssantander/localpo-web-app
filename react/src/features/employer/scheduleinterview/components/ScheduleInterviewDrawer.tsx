import React from "react";
import {
  Drawer,
  Button,
  Avatar,
  Image,
  Badge,
  ActionIcon,
  Divider,
  List,
  Card,
  Menu,
  ScrollArea,
} from "@mantine/core";
import pdfSvg from "../../../../assets/pdf-icon.svg";
import docxSvg from "../../../../assets/docx-icon.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import dayjs from "dayjs";
import { useOpenScheduleModal } from "../../../../hooks/useOpenScheduleModal";
import RescheduleInterviewModal from "../../../../components/employer/RescheduleInterviewModal";
import { ScheduleInterviewDrawerProps } from "../../../../interface/interface";

const ScheduleInterviewDrawer: React.FC<ScheduleInterviewDrawerProps> = (
  props
) => {
  const { opened: isDrawerOpened, close: closeDrawer, selectedEvent } = props;

  const {
    opened: isOpenedInterviewModal,
    open: openInterviewModal,
    close: closeInterviewModal,
  } = useOpenScheduleModal();

  const formattedDate = selectedEvent?.date_interview
    ? dayjs(selectedEvent.date_interview, "DD-MM-YYYY").format("MMM DD, YYYY")
    : "No date provided";

  return (
    <>
      <Drawer
        size="xl"
        opened={isDrawerOpened}
        onClose={closeDrawer}
        title="Application Details"
        position="right"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div className="relative">
          <Image fit="cover" h={190} src={selectedEvent?.bg_cover} />
          <div className="w-full px-4">
            <div className="absolute top-[9rem]">
              <Avatar
                className="border-2"
                size="xl"
                src={selectedEvent?.img_profile}
                alt="Profile"
              />
            </div>
            <div className="flex flex-col gap-y-3 pt-12 justify-between md:flex-row">
              <div>
                <h1 className="font-bold text-2xl text-textBlack flex items-center gap-x-2">
                  {selectedEvent?.applicant_name}
                  <Badge variant="light" radius="sm" size="sm">
                    {selectedEvent?.status}
                  </Badge>
                </h1>
                <span className="text-textGray">
                  {selectedEvent?.job_title}
                </span>
              </div>
              <div className="flex items-center gap-x-2.5">
                <Button size="xs">Confirm Interview</Button>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={openInterviewModal}
                >
                  Reschedule Interview
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
                  <p className="text-sm text-textGray">
                    {selectedEvent?.description}
                  </p>
                </div>
                <div className="grid grid-cols gap-y-3">
                  <h1 className="font-bold text-lg text-textBlack">
                    Experience
                  </h1>
                  {selectedEvent?.experience.map((exp, index) => (
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
                          {exp.job_title} - {exp.company}
                        </h1>
                        <span className="text-xs">{exp.years_experience}</span>
                      </List.Item>
                    </List>
                  ))}
                </div>
                <div className="grid grid-cols gap-y-3">
                  <h1 className="font-bold text-lg text-textBlack">Skills</h1>
                  <div className="flex items-center gap-x-3 flex-wrap">
                    {selectedEvent?.skills.map((skill, index) => (
                      <List className="text-textGray" size="sm" key={index}>
                        <List.Item>{skill}</List.Item>
                      </List>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols gap-y-9 lg:border-2 lg:rounded-lg lg:p-4">
                <div className="grid grid-cols gap-y-3">
                  <h1 className="font-bold text-lg text-textBlack">Overview</h1>
                  <List
                    type="unordered"
                    className="list-disc text-textGray grid grid-cols gap-y-4"
                    size="sm"
                  >
                    <List.Item
                      icon={<Icon fontSize={24} icon="ri:mail-line" />}
                    >
                      {selectedEvent?.applicant_email}
                    </List.Item>
                    <List.Item
                      icon={<Icon fontSize={24} icon="ri:phone-line" />}
                    >
                      {selectedEvent?.phone_number}
                    </List.Item>
                    <List.Item
                      icon={<Icon fontSize={24} icon="ri:map-pin-line" />}
                    >
                      {selectedEvent?.applicant_live}
                    </List.Item>
                  </List>
                </div>
                <div className="grid grid-cols gap-y-3">
                  <h1 className="font-bold text-lg text-textBlack">
                    Schedule Interview
                  </h1>
                  <div className="grid grid-cols gap-y-1">
                    <h1 className="text-textGray text-sm">Date & Time</h1>
                    <p className="text-textBlack font-medium text-sm flex items-center gap-x-2">
                      {formattedDate}
                      <Icon
                        icon="mdi:checkbox-blank-circle"
                        className="text-textGray"
                        fontSize={6}
                      />
                      {selectedEvent?.start_time} - {selectedEvent?.end_time}
                    </p>
                  </div>
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
      </Drawer>
      <RescheduleInterviewModal
        isOpenedInterviewModal={isOpenedInterviewModal}
        closeInterviewModal={closeInterviewModal}
        selectedEvent={selectedEvent}
      />
    </>
  );
};

export default ScheduleInterviewDrawer;
