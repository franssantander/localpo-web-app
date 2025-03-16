import React from "react";
import { Menu, Avatar } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";

const Profile: React.FC = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar color="cyan" radius="xl">
          MK
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Profile</Menu.Label>
        <Menu.Item>Account Settings</Menu.Item>
        <Menu.Item>Resume Builder</Menu.Item>
        <Menu.Divider />
        <Menu.Item rightSection={<Icon icon="ri:logout-box-r-line" />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Profile;
