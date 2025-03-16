import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal, TextInput, Button } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import React, { useRef } from "react";
import { RescheduleInterviewModalProps } from "../../interface/interface";

const RescheduleInterviewModal: React.FC<RescheduleInterviewModalProps> = (
  props
) => {
  const { isOpenedInterviewModal, closeInterviewModal, selectedEvent } = props;
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Modal
        opened={isOpenedInterviewModal}
        onClose={closeInterviewModal}
        title="Reschedule Schedule Interview"
      >
        <div className="grid grid-cols gap-y-10">
          <div className="grid grid-cols gap-4">
            <div className="grid grid-cols gap-y-4">
              <TextInput
                label="Candidate Name"
                value={selectedEvent?.applicant_name}
                disabled
              />
              <TextInput
                label="Position Applied"
                value={selectedEvent?.job_applied}
                disabled
              />
            </div>
            <div className="grid grid-cols gap-y-4">
              <DateInput
                valueFormat="MMM DD YYYY"
                label="Date & Time"
                leftSection={
                  <Icon
                    icon="mdi:calendar-blank-outline"
                    className="text-neutral-500 text-md"
                  />
                }
              />
              <div className="grid grid-cols-2 gap-x-4">
                <TimeInput
                  leftSection={
                    <Icon
                      icon="mdi:access-time"
                      className="text-neutral-500 text-md"
                    />
                  }
                  ref={ref}
                  size="xs"
                  onClick={() => ref.current?.showPicker()}
                />
                <TimeInput
                  leftSection={
                    <Icon
                      icon="mdi:access-time"
                      className="text-neutral-500 text-md"
                    />
                  }
                  ref={ref}
                  size="xs"
                  onClick={() => ref.current?.showPicker()}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-x-2">
              <Button size="xs">Confirm Reschedule</Button>
              <Button variant="outline" size="xs" onClick={closeInterviewModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RescheduleInterviewModal;
