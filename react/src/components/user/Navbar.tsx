import React from "react";
import Logo from "../../assets/relume.svg";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Button, Drawer } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const location = useLocation();
  const isEmployerPage = ["/post-job", "/sign-in/employer", "/sign-up/employer"].includes(
    location.pathname
  );

  const links = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/find-job",
      title: "Find Jobs",
    },
    {
      path: "/post-job",
      title: "Post Job",
    },
    {
      path: "/about-us",
      title: "About Us",
    },
    {
      path: "/contact-us",
      title: "Contact Us",
    },
  ];

  return (
    <>
      <div className="w-full fixed top-0 bg-bgColor z-50">
        <div className="max-w-[85rem] mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <img className="w-6" src={Logo} alt="Local Po" />
            <h1 className="font-black text-sm">LOCAL PO</h1>
          </div>
          <div>
            <Burger
              className="lg:hidden"
              opened={opened}
              onClick={open}
              aria-label="Toggle navigation"
            />
            <div
              className={`${
                isEmployerPage
                  ? "hidden"
                  : "hidden lg:flex lg:flex-row lg:gap-x-6"
              }`}
            >
              {links.map((item, index) => (
                <Link className="text-textGray" to={item.path} key={index}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            {isEmployerPage ? (
              <>
                <Button component={Link} to="sign-in/employer" size="sm">
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="sign-in" size="sm">
                  Sign In
                </Button>
                <Button
                  size="sm"
                  variant="transparent"
                  to="post-job"
                  component={Link}
                >
                  Employers
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <Drawer opened={opened} onClose={close} title="Menu">
        <div className="flex flex-col gap-y-4 text-2xl">
          {links.map((item, index) => (
            <Link to={item.path} key={index}>
              {item.title}
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Button component={Link} to="sign-in" size="sm">
            Sign In
          </Button>
          <Button
            size="sm"
            variant="transparent"
            to="employers-signin"
            component={Link}
          >
            Employers
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
