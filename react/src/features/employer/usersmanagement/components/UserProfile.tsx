import { Icon } from "@iconify/react/dist/iconify.js";
import { ActionIcon, Avatar, Badge, Divider, List, Menu } from "@mantine/core";
import React from "react";
import { useOpenEditDrawer } from "../../../../hooks/useOpenEditDrawer";
import UserProfileDrawer from "./UserProfileDrawer";
import { statusData } from "../../../../util/statusData";
import dayjs from "dayjs";

const UserProfile: React.FC = ({ usersData }) => {
  const {
    opened: isOpenEditUser,
    open: openEditUser,
    close: closeEditUser,
  } = useOpenEditDrawer();

  if (!usersData) {
    return [];
  }

  const {
    name,
    status,
    role,
    department,
    email,
    employment_id,
    phone_number,
    reports_to,
    office_location,
    date_join,
  } = usersData;

  return (
    <>
      <div>
        <div className="grid grid-cols gap-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Avatar
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                size="lg"
                alt="user profile"
              />
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-textBlack text-lg font-bold flex items-center gap-x-2">
                    {name}
                    <Badge
                      size="xs"
                      radius="sm"
                      variant="light"
                      color={statusData(status)}
                    >
                      {status}
                    </Badge>
                  </h1>
                  <span className="text-sm text-textGray">{role}</span>
                </div>
              </div>
            </div>
            {/* <Menu shadow="md" width={140}>
              <Menu.Target>
                <ActionIcon variant="outline" aria-label="Settings">
                  <Icon
                    icon="radix-icons:dots-horizontal"
                    className="text-lg"
                  />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                  onClick={openEditUser}
                  rightSection={
                    <Icon icon="radix-icons:pencil-1" width="15" height="15" />
                  }
                >
                  Edit Profile
                </Menu.Item>
                <Menu.Item
                  color="red"
                  rightSection={
                    <Icon icon="radix-icons:trash" width="15" height="15" />
                  }
                >
                  Delete User
                </Menu.Item>
              </Menu.Dropdown>
            </Menu> */}
          </div>
          {/* <div className="flex items-center gap-x-2">
            <Button onClick={openEditUser} variant="light" size="xs">
              Edit Profile
            </Button>
            <Menu shadow="md" width={140}>
              <Menu.Target>
                <ActionIcon variant="outline" aria-label="Settings">
                  <Icon
                    icon="radix-icons:dots-horizontal"
                    className="text-md"
                  />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                  color="red"
                  rightSection={
                    <Icon icon="radix-icons:trash" width="15" height="15" />
                  }
                >
                  Delete User
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div> */}
        </div>
        <div className="py-7 grid grid-cols gap-y-7">
          <div className="grid grid-cols gap-y-4">
            <h1 className="font-bold text-textBlack">Profile Overview</h1>
            <List spacing="lg" size="sm" center>
              <List.Item
                icon={
                  <Icon
                    className="text-textGray"
                    icon="ri:user-3-line"
                    width="18"
                    height="18"
                  />
                }
              >
                <h1 className="text-textGray gap-x-1 flex items-center">
                  Full name:
                  <span className="text-textBlack font-medium">{name}</span>
                </h1>
              </List.Item>
              <List.Item
                icon={
                  <Icon
                    className="text-textGray"
                    icon="ri:suitcase-line"
                    width="18"
                    height="18"
                  />
                }
              >
                <h1 className="text-textGray gap-x-1 flex items-center">
                  Position:
                  <span className="text-textBlack font-medium">{role}</span>
                </h1>
              </List.Item>
              <List.Item
                icon={
                  <Icon
                    className="text-textGray"
                    icon="ri:building-4-line"
                    width="18"
                    height="18"
                  />
                }
              >
                <h1 className="text-textGray gap-x-1 flex items-center">
                  Department
                  <span className="text-textBlack font-medium">
                    {department}
                  </span>
                </h1>
              </List.Item>
            </List>
          </div>
          <Divider />
          <div className="grid grid-cols gap-y-4">
            <h1 className="font-bold text-textBlack">Correct Details</h1>
            <List spacing="lg" size="sm" center>
              <List.Item
                icon={
                  <Icon
                    className="text-textGray"
                    icon="ri:mail-line"
                    width="18"
                    height="18"
                  />
                }
              >
                <h1 className="text-textGray gap-x-1 flex items-center">
                  Email:
                  <span className="text-textBlack font-medium">{email}</span>
                </h1>
              </List.Item>
              <List.Item
                icon={
                  <Icon
                    className="text-textGray"
                    icon="ri:phone-line"
                    width="18"
                    height="18"
                  />
                }
              >
                <h1 className="text-textGray gap-x-1 flex items-center">
                  Phone:
                  <span className="text-textBlack font-medium">
                    {phone_number}
                  </span>
                </h1>
              </List.Item>
            </List>
          </div>
          <Divider />
          <div className="grid grid-cols gap-y-4">
            <h1 className="font-bold text-textBlack">Employee Details</h1>
            <List spacing="lg" size="sm" center>
              <List.Item
                icon={
                  <Icon
                    className="text-textGray"
                    icon="ri:pass-valid-line"
                    width="18"
                    height="18"
                  />
                }
              >
                <h1 className="text-textGray gap-x-1 flex items-center">
                  Employee ID:
                  <span className="text-textBlack font-medium">
                    {employment_id}
                  </span>
                </h1>
              </List.Item>
              <List.Item
                icon={
                  <Icon
                    className="text-textGray"
                    icon="ri:calendar-line"
                    width="18"
                    height="18"
                  />
                }
              >
                <h1 className="text-textGray gap-x-1 flex items-center">
                  Date of joining:
                  <span className="text-textBlack font-medium">
                    {dayjs(date_join).format("MMM DD YYYY")}
                  </span>
                </h1>
              </List.Item>
              <List.Item
                icon={
                  <Icon
                    className="text-textGray"
                    icon="ri:map-pin-line"
                    width="18"
                    height="18"
                  />
                }
              >
                <h1 className="text-textGray gap-x-1 flex items-center">
                  Office Location:
                  <span className="text-textBlack font-medium">
                    {office_location}
                  </span>
                </h1>
              </List.Item>
              <List.Item
                icon={
                  <Icon
                    className="text-textGray"
                    icon="ri:team-line"
                    width="18"
                    height="18"
                  />
                }
              >
                <h1 className="text-textGray gap-x-1 flex items-center">
                  Reports to:
                  <span className="text-textBlack font-medium">
                    <Avatar.Group>
                      <Avatar src="image.png" />
                      <Avatar src="image.png" />
                      <Avatar src="image.png" />
                      <Avatar>+5</Avatar>
                    </Avatar.Group>
                  </span>
                </h1>
              </List.Item>
            </List>
          </div>
        </div>
      </div>
      {/* <UserProfileDrawer
        isOpenEditUser={isOpenEditUser}
        closeEditUser={closeEditUser}
      /> */}
    </>
  );
};

export default UserProfile;
