import React from "react";
import Logo from "../../assets/relume.svg";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Drawer } from "@mantine/core";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Profile from "./components/Profile";
import { useUserStore } from "../../store/useUserStore";

const Navbar: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { userData } = useUserStore();

  return (
    <>
      <div className="w-full fixed top-0 bg-bgColor z-50">
        <div className="max-w-[85rem] mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-x-10">
            <div className="flex items-center gap-x-2">
              <img className="hidden md:block w-6" src={Logo} alt="Local Po" />
              <h1 className="hidden md:block font-black text-sm">LOCAL PO</h1>
              <Burger
                className="lg:hidden"
                opened={opened}
                onClick={open}
                aria-label="Toggle navigation"
              />
            </div>
            <div className="hidden text-sm lg:flex lg:flex-row lg:gap-x-6">
              {userData?.sidebar?.map((item, index) =>
                item.title ? (
                  <Link className="text-textGray" to={item.path} key={index}>
                    {item.title}
                  </Link>
                ) : null
              )}
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <Icon icon="ri:notification-2-line" />
            <Profile />
          </div>
        </div>
      </div>
      <Drawer opened={opened} onClose={close} title="Menu">
        <div className="px-4 grid grid-cols gap-y-14">
          <div className="flex items-center gap-x-2">
            <img className="w-7 md:w-10" src={Logo} alt="Local Po" />
            <h1 className="font-black  md:text-xl">LOCAL PO</h1>
          </div>
          <div className="flex flex-col gap-y-4 text-2xl">
            {userData?.sidebar?.map((item, index) => (
              <Link to={item.path} key={index}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
