import React from "react";
import { Card, Avatar, Menu, ActionIcon, Badge } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RecentApplicationProps } from "../../../../interface/interface";
import ScheduleInterviewModal from "../../../../components/employer/ScheduleInterviewModal";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useRecentApplication } from "../hooks/useRecentApplication";

const RecentApplication: React.FC<RecentApplicationProps> = (props) => {
  const { recent, handleOpenApplicant } = props;
  const {
    img_profile,
    applicant_name,
    applied_position,
    status,
    date_applied,
  } = recent;

  const { statusLabel } = useRecentApplication(date_applied);
  const [opened, { open, close }] = useDisclosure(false);

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
                  <Menu.Item className="text-xs" onClick={handleOpenApplicant}>
                    View Application
                  </Menu.Item>
                  <Menu.Item className="text-xs" onClick={open}>
                    Schedule Interview
                  </Menu.Item>
                  <Menu.Item className="text-xs" color="red">
                    Reject Application
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            <div className="grid grid-cols gap-y-1 text-xs text-textGray">
              <h1>{applied_position}</h1>
              <Badge radius="sm" size="xs">
                {statusLabel}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-xs text-textGray mt-2 font-medium">
          Applied {dayjs(date_applied).format("MMM DD YYYY")}
        </p>
      </Card>
      <ScheduleInterviewModal
        opened={opened}
        close={close}
        img_profile={img_profile}
      />
    </>
  );
};

export default RecentApplication;
