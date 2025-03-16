import React from "react";
import { Card, Avatar, Menu, ActionIcon } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { UpcomingInterviewProps } from "../../../../interface/interface";
import { Link } from "react-router-dom";
import _ from "lodash";
import RescheduleInterviewModal from "../../../../components/employer/RescheduleInterviewModal";
import { useOpenScheduleModal } from "../../../../hooks/useOpenScheduleModal";

const UpcomingInterview: React.FC<UpcomingInterviewProps> = (props) => {
  const { inter } = props;
  const {
    id,
    img_profile,
    applicant_name,
    job_title,
    interview_type,
    start_time,
  } = inter;

  const {
    opened: isOpenedInterviewModal,
    open: openInterviewModal,
    close: closeInterviewModal,
  } = useOpenScheduleModal();

  return (
    <>
      <Card shadow="xs" withBorder>
        <div className="flex items-center gap-x-2">
          <Avatar src={img_profile} alt="Profile" />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-bold text-textBlack">
                {applicant_name}
              </h1>

              <Menu shadow="md" width={180}>
                <Menu.Target>
                  <ActionIcon variant="subtle" aria-label="Settings">
                    <Icon fontSize={20} icon="radix-icons:dots-horizontal" />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item
                    className="text-xs"
                    component={Link}
                    to={`/app/applications/${_.replace(
                      String(id),
                      /\s+/g,
                      "-"
                    )}`}
                  >
                    View Details
                  </Menu.Item>
                  <Menu.Item className="text-xs" onClick={openInterviewModal}>
                    Reschedule Interview
                  </Menu.Item>
                  <Menu.Item className="text-xs">Send Reminder</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            <div className="flex items-center gap-x-2 text-xs text-textGray">
              <h1>{job_title}</h1>
              <Icon fontSize={6} icon="mdi:checkbox-blank-circle" />
              <p>{start_time}</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-textGray mt-2 font-medium">
          {interview_type}
        </p>
      </Card>
      <RescheduleInterviewModal
        isOpenedInterviewModal={isOpenedInterviewModal}
        closeInterviewModal={closeInterviewModal}
        selectedEvent={inter}
      />
    </>
  );
};

export default UpcomingInterview;
