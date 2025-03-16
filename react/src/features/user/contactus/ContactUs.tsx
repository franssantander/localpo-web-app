import React from "react";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";

const ContactUs: React.FC = () => {
  return (
    <>
      <div className="w-full max-w-[85rem] grid grid-cols gap-y-28 mx-auto px-4 py-32">
        <div>
          <h1 className="text-textGray">Connect</h1>
          <div className="grid grid-cols gap-y-4">
            <h1 className="font-bold text-4xl text-textBlack">
              Get in Touch with Us
            </h1>
            <p className="text-textGray">
              We’re here to help you with any inquiries or support you need.
            </p>
          </div>
        </div>
        <div className="grid gap-y-20 lg:grid-cols-2 lg:gap-x-10">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
