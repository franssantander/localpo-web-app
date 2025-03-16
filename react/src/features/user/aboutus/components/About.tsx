import { Image } from "@mantine/core";
import React from "react";

const About: React.FC = () => {
  return (
    <>
      <div>
        <div className="grid gap-y-10 md:grid-cols-[1.2fr_1fr] md:gap-x-14">
          <div className="grid grid-cols gap-y-10">
            <div className="grid grid-cols gap-y-6">
              <h1 className="font-bold text-textBlack text-4xl">
                Connecting Talent with Opportunities: Your Gateway to Career
                Success
              </h1>
              <p className="text-textGray text-lg">
                We are dedicated to simplifying the job search process for both
                employers and candidates. Our platform empowers job seekers to
                find their ideal roles and allows companies to discover top
                talent effortlessly.
              </p>
            </div>
            <div className="flex flex-col gap-y-10 md:flex-row md:justify-between gap-x-10">
              <div className="grid grid-cols gap-y-3">
                <h1 className="font-bold text-textBlack text-2xl md:text-xl">
                  Our Mission
                </h1>
                <p className="text-textGray text-sm">
                  Our mission is to simplify hiring and job searching by
                  providing an intuitive platform that empowers both employers
                  and candidates. We are dedicated to creating a job market that
                  works for everyone, where talents meet opportunities
                  seamlessly.
                </p>
              </div>
              <div className="grid grid-cols gap-y-3">
                <h1 className="font-bold text-textBlack text-2xl md:text-xl">
                  Why Choose Us
                </h1>
                <p className="text-textGray text-sm">
                  We provide an unparalleled job search experience through our
                  user-friendly platform, trusted by thousands of companies and
                  job seekers alike. With powerful tools for both employers and
                  candidates, we simplify the hiring process from start to
                  finish.
                </p>
              </div>
            </div>
          </div>
          <div className="h-full">
            <Image
              radius="md"
              h="100%"
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
