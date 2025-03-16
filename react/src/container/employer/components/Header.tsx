import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ActionIcon,
  Button,
  Image,
  Drawer,
  Burger,
  Avatar,
  Menu,
} from "@mantine/core";
import logo from "../../../assets/relume.svg";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";

const Header: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { userData } = useUserStore();

  return (
    <>
      <div className="sticky top-0 z-40 border-b-[1px] py-2 w-full bg-white">
        <div className="p-1 px-7 flex items-center justify-between lg:px-3">
          <div>
            <h1 className="text-xs text-textGray">Company</h1>
            <span className="flex items-center gap-x-2">
              <Image w={24} src={logo} />
              <h1 className="font-bold text-sm md:text-lg">
                {userData?.user?.company}
              </h1>
            </span>
          </div>
          <div>
            <Burger
              className="lg:hidden"
              opened={opened}
              onClick={open}
              aria-label="Toggle navigation"
            />
            <div className="hidden lg:flex items-center gap-x-6">
              <ActionIcon color="black" variant="transparent">
                <Icon fontSize={20} icon="mdi:notifications-none" />
              </ActionIcon>

              <Button component={Link} to="post-job" size="xs">
                Post a Job
              </Button>

              <Menu shadow="md" width={140}>
                <Menu.Target>
                  <Avatar
                    className="cursor-auto"
                    src={userData?.user?.avatar}
                    alt={userData?.user?.name}
                    name={userData?.user?.name}
                    color="initials"
                  />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>User Profile</Menu.Label>
                  <Menu.Item
                    rightSection={
                      <Icon icon="radix-icons:avatar" fontSize={14} />
                    }
                  >
                    Profile
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    rightSection={
                      <Icon icon="radix-icons:exit" fontSize={14} />
                    }
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <Drawer opened={opened} onClose={close} title="Menu">
        <div className="flex flex-col gap-y-7 px-4 pt-10">
          {userData?.sidebar?.map((nav, index: number) => (
            <Link to={nav.path} key={index} onClick={close}>
              <div className="flex gap-x-4 items-center text-sm">
                <Icon fontSize={24} className="text-textGray" icon={nav.icon} />
                <span className="text-2xl text-textGray">{nav.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Header;
