import React from "react";
import { Icon } from "@iconify/react";
import { Button, TextInput, Divider } from "@mantine/core";

const FindJobInput: React.FC = () => {
  return (
    <div className="grid grid-rows gap-y-3 lg:grid-cols-[1fr_auto_1fr_0.4fr] lg:bg-white lg:items-center lg:border lg:rounded-md border-gray-300 w-full">
      <TextInput
        classNames={{
          root: "bg-white border-2 border-gray-400 rounded-md lg:border-none",
        }}
        variant="unstyled"
        size="lg"
        placeholder="Job title, keywords"
        leftSection={<Icon icon="ri:briefcase-4-line" />}
      />
      <Divider
        classNames={{ root: "my-auto hidden lg:block bg-none" }}
        h={29}
        labelPosition="center"
        orientation="vertical"
        size="sm"
        color="gray"
      />
      <TextInput
        classNames={{
          root: "bg-white border-2 border-gray-400 rounded-md lg:border-none",
        }}
        variant="unstyled"
        size="lg"
        placeholder="City, state or address"
        leftSection={<Icon icon="ri:map-pin-line" />}
      />
      <Button className="absolute mr-2" size="sm">
        Find Jobs
      </Button>
    </div>
  );
};

export default FindJobInput;
