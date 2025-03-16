import React from "react";
import { Card, Image, Badge, ActionIcon, Divider, Menu } from "@mantine/core";
import { PostedJobCardProps } from "../../../../interface/interface";
import logo from "../../../../assets/relume.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import JobTaglist from "../../../../components/employer/JobTaglist";
import { statusData } from "../../../../util/statusData";

const PostedJobCards: React.FC<PostedJobCardProps> = (props) => {
  const { postedJobCards } = props;

  const {
    id,
    job_title,
    company,
    location,
    tags,
    applications,
    status,
    posted_date,
  } = postedJobCards;

  return (
    <Link to={`${id}`} state={postedJobCards}>
      <Card h="100%" shadow="sm" withBorder>
        <div className="grid grid-cols gap-1">
          <div className="flex justify-between items-center">
            <Badge size="sm" color={statusData(status)} variant="light">
              {status}
            </Badge>
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <ActionIcon variant="subtle" aria-label="Settings">
                  <Icon fontSize={20} icon="radix-icons:dots-horizontal" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item rightSection={<Icon icon="radix-icons:pencil-1" />}>
                  Edit
                </Menu.Item>
                <Menu.Item
                  color="red"
                  rightSection={<Icon icon="radix-icons:trash" />}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <div className="grid grid-cols gap-y-4">
            <div className="flex gap-3 items-center">
              <Image w={32} src={logo} />
              <div>
                <h1 className="font-bold text-sm text-textBlack">
                  {job_title}
                </h1>
                <p className="text-textGray text-xs flex items-center gap-x-2">
                  {company}
                  <Icon
                    className="text-textGray hidden md:block"
                    fontSize="4"
                    icon="ri:checkbox-blank-circle-fill"
                  />
                  <span>{location}</span>
                </p>
              </div>
            </div>
          </div>
          <div>
            {tags.map((tag, index) => (
              <JobTaglist tag={tag} index={index} />
            ))}
          </div>
          <Divider my="sm" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <Icon
                className="text-textGray"
                icon="mdi:briefcase-variant-outline"
              />
              <div className="flex items-center gap-1">
                <h1 className="font-bold text-textBlack">
                  {applications ?? 0}
                </h1>
                <span className="text-xs text-textGray">applications</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <Icon
                className="text-textGray"
                icon="mdi:clock-time-four-outline"
              />
              <span className="text-xs text-textGray">
                {dayjs(posted_date).format("MMM. D, YYYY")}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PostedJobCards;
