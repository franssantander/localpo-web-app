import React from "react";
import { Button, Divider, Modal } from "@mantine/core";
import { useModalStore } from "../../../../store/useModalStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useModalHandlerHook } from "../hooks/useModalHandlerHook";

export const UserManagementModal: React.FC = () => {
  const { modalData, isOpen, closeModal, actionName, url } = useModalStore();
  const { isPending, deleteUserFn } = useModalHandlerHook(url, closeModal);

  return (
    <Modal.Root opened={isOpen} onClose={closeModal} centered>
      <Modal.Overlay />
      <Modal.Content
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <h1 className="space-y-4 text-textBlack grid grid-cols gap-y-1">
              {`${actionName} user`}
            </h1>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <h1 className="text-textBlack font-medium">
              {`Are you sure you want to ${actionName} this user? ${modalData?.name}`}
            </h1>
            <Divider mt={23} />
            <div className="flex justify-end space-x-2">
              <Button size="xs" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                size="xs"
                disabled={isPending}
                onClick={() => deleteUserFn({ id: modalData?.id })}
              >
                {isPending ? (
                  <h1 className="flex items-center gap-x-2 text-sm">
                    <Icon
                      className="animate-spin"
                      icon="radix-icons:reload"
                      width="15"
                      height="15"
                    />
                    Loading...
                  </h1>
                ) : (
                  actionName
                )}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
