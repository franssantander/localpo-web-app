import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Badge, Box, Card, Divider, List } from "@mantine/core";
import React from "react";
import { CardProfileProps } from "../../../../interface/interface";

const CardProfile: React.FC<CardProfileProps> = (props) => {
  const { cardProfileData } = props;

  if (!cardProfileData) {
    return <div>No candidate data available.</div>;
  }

  const {
    img_profile,
    applicant_name,
    job_title,
    applied_job,
    date_applied,
    status,
    hire_stage,
    applicant_email,
    applicant_phone,
  } = cardProfileData;

  return (
    <div>
      <Card shadow="sm" radius="md" withBorder>
        <div className="flex items-center gap-x-2">
          <Avatar size="lg" src={img_profile} />
          <div className="flex flex-col gap-y-1">
            <h1 className="text-textBlack font-bold text-sm">
              {applicant_name}
            </h1>
            <span className="text-textGray text-xs">{job_title}</span>
          </div>
        </div>
        <div className="grid grid-cols gap-y-2 py-7">
          <div className="flex items-center gap-x-2">
            <h1 className="font-bold">Applied Job</h1>
            <Badge radius="md" variant="light">
              {status}
            </Badge>
          </div>
          <div className="bg-neutral-100 p-2 rounded-md">
            <h1 className="text-textBlack font-medium">{applied_job}</h1>
            <span className="text-textGray text-xs">
              Applied on {date_applied}
            </span>
          </div>
        </div>
        <div className="grid grid-cols gap-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-textBlack font-bold">Stage</h1>
            <span className="flex items-center gap-x-1">
              <Icon className="text-primaryColor" icon="ri:circle-fill" />
              <span className="text-xs font-medium text-textGray">
                {hire_stage}
              </span>
            </span>
          </div>
          <div className="flex gap-x-2">
            <Box w="100%" className="p-4 bg-primaryColor"></Box>
            <Box w="100%" className="p-4 bg-neutral-300"></Box>
            <Box w="100%" className="p-4 bg-neutral-300"></Box>
            <Box w="100%" className="p-4 bg-neutral-300"></Box>
          </div>
        </div>
        <Divider my={32} size={3} />
        <div className="grid grid-cols gap-y-3">
          <h1 className="font-bold text-textBlack">Contact</h1>
          <List spacing="xs" size="sm" center>
            <List.Item
              className="text-textGray"
              icon={<Icon fontSize={20} icon="ri:mail-line" />}
            >
              {applicant_email}
            </List.Item>
            <List.Item
              className="text-textGray"
              icon={<Icon fontSize={20} icon="ri:phone-line" />}
            >
              {applicant_phone}
            </List.Item>
          </List>
        </div>
      </Card>
    </div>
  );
};

export default CardProfile;
