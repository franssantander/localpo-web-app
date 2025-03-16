import { Button, Divider, Modal } from "@mantine/core";
import React from "react";
import { useModalStore } from "../../../../store/useModalStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCloseJob } from "../hooks/useCloseJob";

const CloseJobModal: React.FC = () => {
  const { modalData, isOpen, closeModal } = useModalStore();
  const { isPendingCloseJob, jobStatusFn } = useCloseJob();

  return (
    <Modal.Root opened={isOpen} onClose={closeModal} centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            {modalData?.status === "Active" ? (
              <h1 className="font-medium space-y-4 text-textBlack grid grid-cols gap-y-1">
                Close Job Posting - {modalData?.job_title}
                <span className="font-normal text-textGray text-xs">
                  Closing this job will make it inactive.
                </span>
              </h1>
            ) : (
              <h1 className="font-medium space-y-4 text-textBlack grid grid-cols gap-y-1">
                Reopen Job{" "}
                <span className="font-normal text-textGray text-xs">
                  Reopen this job will make it active and visible to candidates.
                </span>
              </h1>
            )}
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <h1 className="text-textBlack">
              {modalData?.status === "Active"
                ? "Are you sure you want to close this job? Candidates will no longer be able to apply."
                : "Are you want to reopen this job? Candidates can able to view and apply this position."}
            </h1>
            <Divider mt={23} />
            <div className="flex justify-end space-x-2">
              <Button size="xs" variant="outline">
                Cancel
              </Button>
              <Button
                size="xs"
                disabled={isPendingCloseJob}
                onClick={() => jobStatusFn({ id: modalData?.id })}
              >
                {isPendingCloseJob && (
                  <h1 className="flex items-center gap-x-2 text-sm">
                    <Icon
                      className="animate-spin"
                      icon="radix-icons:reload"
                      width="15"
                      height="15"
                    />
                    Loading...
                  </h1>
                )}
                {!isPendingCloseJob &&
                  modalData?.status === "Active" &&
                  "Close job"}
                {!isPendingCloseJob &&
                  modalData?.status !== "Active" &&
                  "Reopen job"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default CloseJobModal;
