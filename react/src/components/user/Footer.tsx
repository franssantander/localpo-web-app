import { Image, Divider } from "@mantine/core";
import relumeLogo from "../../assets/relumeWhite.svg";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router-dom";

export const Footer: React.FC = () => {

  const location = useLocation();
  const isCompleteProfileSec = "/employer/complete-profile".includes(location.pathname);

  const links = [
    {
      title: "Jobs Seekers",
      links: [
        {
          title: "Find Jobs",
          url: "/",
        },
        {
          title: "Career Advice",
          url: "/",
        },
        {
          title: "Resume Builder",
          url: "/",
        },
        {
          title: "Job Alerts",
          url: "/",
        },
      ],
    },
    {
      title: "Employers",
      links: [
        {
          title: "Post a Job",
          url: "/",
        },
        {
          title: "Employer Dashboard",
          url: "/",
        },
        {
          title: "Hiring Resources",
          url: "/",
        },
        {
          title: "Pricing Plans",
          url: "/",
        },
      ],
    },
    {
      title: "Sources",
      links: [
        {
          title: "Help Center",
          url: "/",
        },
        {
          title: "Community",
          url: "/",
        },
        {
          title: "Privicy Policy",
          url: "/",
        },
        {
          title: "Terms of Service",
          url: "/",
        },
      ],
    },
  ];

  const socials = [
    {
      icon: "ri:linkedin-box-fill",
      url: "/",
    },
    {
      icon: "ri:facebook-box-fill",
      url: "/",
    },
    {
      icon: "ri:twitter-x-fill",
      url: "/",
    },
    {
      icon: "ri:instagram-fill",
      url: "/",
    },
  ];

  return (
    <>
      <footer className={`${!isCompleteProfileSec && "hidden"} py-20 bg-[#2D2727] grid grid-cols items-center gap-y-9 px-4 mt-auto`}>
        <div className="md:grid md:grid-cols-2 md:gap-x-2">
          <div className="grid grid-cols gap-y-3 justify-center text-center text-white md:justify-start md:text-left">
            <div className="flex items-center gap-x-2 justify-center md:justify-start">
              <Image w={32} src={relumeLogo} />
              <h1 className="text-2xl font-bold">LOCAL PO</h1>
            </div>
            <p className="max-w-sm md:text-sm text-neutral-300">
              Lorem ipsum dolor sit amet consectetur. Ut duis sed interdum etiam
              varius id magna.
            </p>
          </div>
          <div className="hidden md:flex md:justify-around">
            {links.map((link, index) => (
              <div className="grid grid-cols gap-y-4" key={index}>
                <h3 className="text-md font-bold text-white">{link.title}</h3>
                <ul className="text-xs grid grid-cols gap-y-3">
                  {link.links.map((subLink, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subLink.url}
                        className="text-neutral-400 hover:underline"
                      >
                        {subLink.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <Divider my="lg" size="sm" color="gray" />
        <div className="grid grid-cols gap-y-10 items-center md:grid-cols-2 md:justify-between">
          <div>
            <p className="text-neutral-400 font-light text-center md:text-left md:text-sm">
              © 2024 LocalePo Inc. All rights reserved.
            </p>
          </div>
          <div className="flex gap-x-4 justify-center md:justify-end">
            {socials.map((social, index) => (
              <Icon
                fontSize={24}
                color="white"
                icon={social.icon}
                key={index}
              />
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};
