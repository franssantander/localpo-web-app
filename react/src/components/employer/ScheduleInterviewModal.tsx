import React, { useRef, useState } from "react";
import {
  Avatar,
  Modal,
  TextInput,
  List,
  Select,
  Button,
  ScrollArea,
} from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DateInput, TimeInput } from "@mantine/dates";
import { ScheduleInterviewModalProps } from "../../interface/interface";

const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = (
  props
) => {
  const { opened, close, img_profile } = props;

  const [value, setValue] = useState<Date | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Modal
      classNames={{ title: "font-bold text-textBlack" }}
      opened={opened}
      onClose={close}
      title="Schedule Interview"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-1">
          <Avatar size="xl" src={img_profile} alt="Profile" />
          <div className="text-xs text-textGray">
            <List spacing={5} size="xs" center>
              <List.Item className="font-bold text-lg text-textBlack">
                John Mark Doe
              </List.Item>
              <List.Item
                className="text-sm"
                icon={<Icon icon="ri:mail-line" fontSize={17} />}
              >
                johnmarkdoe@gmail.com
              </List.Item>
              <List.Item
                className="text-sm"
                icon={<Icon icon="ri:phone-line" fontSize={17} />}
              >
                09876543212
              </List.Item>
            </List>
          </div>
        </div>
        <div className="space-y-2">
          <TextInput
            size="xs"
            label="Candidate name"
            placeholder="John Mark Doe"
            disabled
          />
          <TextInput
            size="xs"
            label="Position applied"
            placeholder="Software Engineer"
            disabled
          />
          <Select
            size="xs"
            label="Interviewer"
            placeholder="Select Interviewer"
            data={[
              "HR - Kelly Willams",
              "HR - Sarrah Hernandez",
              "HR - Kace Wood",
              "HR - John Sevelte",
            ]}
          />
        </div>
        <div className="space-y-2">
          <DateInput
            size="xs"
            value={value}
            onChange={setValue}
            label="Date interview"
            placeholder="Select date for interview"
          />
          <div className="grid grid-cols-2 gap-x-4">
            <TimeInput
              label="Start of interview"
              placeholder="Select time for interview"
              ref={ref}
              size="xs"
              onClick={() => ref.current?.showPicker()}
            />
            <TimeInput
              label="End of interview"
              placeholder="Select time for interview"
              ref={ref}
              size="xs"
              onClick={() => ref.current?.showPicker()}
            />
          </div>
          <Select
            size="xs"
            label="Interview mode"
            placeholder="Select type of interview mode"
            data={["Virtual", "In-Person"]}
          />
        </div>
        <div className="flex items-center justify-end gap-x-3 pt-6">
          <Button size="xs">Schedule Interview</Button>
          <Button size="xs" onClick={close} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleInterviewModal;
