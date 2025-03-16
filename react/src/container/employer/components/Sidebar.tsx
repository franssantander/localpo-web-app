import React from "react";
import logo from "../../../assets/relume.svg";
import { Link } from "react-router-dom";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useUserStore } from "../../../store/useUserStore";

const Sidebar: React.FC = () => {
  const { userData } = useUserStore();

  return (
    <>
      <div className="min-h-screen hidden border-r  lg:flex flex-col transition-all relative w-16">
        <div className="flex items-center justify-between">
          <img className="w-8 m-auto pt-2" src={logo} alt="Local Po Logo" />
        </div>
        <nav className="gap-3 flex flex-col pt-10 ease-in-out transition-all relative justify-center items-center">
          {userData?.sidebar?.map((menu, index: number) =>
            menu.title ? (
              <Tooltip label={menu.title} position="left">
                <div className="hover:bg-neutral-100 rounded-md">
                  <ActionIcon
                    variant="subtle"
                    color="gray.1"
                    key={index}
                    component={Link}
                    to={menu.path}
                    size="lg"
                  >
                    <Icon
                      className="text-textGray"
                      icon={menu.icon}
                      fontSize={17}
                    />
                  </ActionIcon>
                </div>
              </Tooltip>
            ) : null
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
