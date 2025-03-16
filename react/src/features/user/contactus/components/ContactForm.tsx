import React from "react";
import { TextInput, Select, Button } from "@mantine/core";

const ContactForm: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-y-6 max-w-lg">
        <TextInput size="md" label="Full name" placeholder="Your Full Name" />
        <TextInput size="md" label="Email" placeholder="Your Email Address" />
        <Select
          size="md"
          label="Subject"
          placeholder="Select One Subject"
          data={["React", "Angular", "Vue", "Svelte"]}
        />
        <Button className="max-w-24">Submit</Button>
      </div>
    </>
  );
};

export default ContactForm;
