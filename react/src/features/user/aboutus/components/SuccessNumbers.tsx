import { Image } from "@mantine/core";
import React from "react";

const SuccessNumbers: React.FC = () => {
  return (
    <>
      <div>
        <div className="grid gap-y-10 md:grid-cols-2 md:gap-x-10">
          <div>
            <Image
              h="100%"
              radius="md"
              src="https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
          <div className="grid grid-cols gap-y-7 md:gap-y-3">
            <div className="grid grid-cols gap-y-3">
              <h1 className="font-bold text-3xl text-textBlack">
                Our Success by the Numbers
              </h1>
              <p className="text-textGray">
                At LocalPo, we’re proud to be more than just a job board. We’ve
                built a community where talented professionals and innovative
                companies come together to create successful career journeys.
                Whether you’re looking to hire or be hired, we’ve made it our
                mission to ensure you find the perfect fit quickly and
                effortlessly.
              </p>
            </div>
            <div className="grid gap-y-9 md:grid-cols-2 md:gap-x-10 md:justify-between">
              <div className="grid grid-cols gap-y-4 md:gap-y-2">
                <h1 className="text-textBlack text-4xl font-black">97%</h1>
                <p className="text-textGray">
                  of job seekers who apply through our platform get contacted by
                  employers within the first 7 days.
                </p>
              </div>
              <div className="grid grid-cols gap-y-4 md:gap-y-2">
                <h1 className="text-textBlack text-4xl font-black">85%</h1>
                <p className="text-textGray">
                  of job postings result in interviews within the first 2 weeks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessNumbers;
