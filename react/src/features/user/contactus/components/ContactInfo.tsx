import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const ContactInfo: React.FC = () => {
  const socials = [
    {
      icon: "ri:facebook-box-line",
      title: "Facebook",
    },
    {
      icon: "ri:instagram-line",
      title: "Instagram",
    },
    {
      icon: "ri:linkedin-box-line",
      title: "LinkedIn",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-y-9">
        <div className="grid grid-cols gap-y-1">
          <h1 className="font-bold text-textBlack">
            Customer Support Contact Details
          </h1>
          <p className="text-textGray">
            Prefer to reach us directly? Here’s how you can contact us:
          </p>
        </div>
        <div className="grid grid-cols gap-y-1">
          <h1 className="font-bold text-textBlack">Call us</h1>
          <p className="text-textGray">
            Stay connected with us for the latest updates and wellness tips.
          </p>
          <div className="flex items-center gap-x-3">
            <Icon fontSize={18} icon="ri:phone-line" />
            <span className="underline">+65 1234 5678</span>
          </div>
        </div>
        <div className="grid grid-cols gap-y-1">
          <h1 className="font-bold text-textBlack">
            Follow us on social media:
          </h1>
          <p className="text-textGray">
            Stay connected with us for the latest updates and wellness tips.
          </p>
          <div className="grid grid-cols gap-y-2">
            {socials.map((item, index) => (
              <div className="flex items-center gap-x-2" key={index}>
                <Icon fontSize={18} icon={item.icon} />
                <span className="text-textGray">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
