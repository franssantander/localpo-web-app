import { useDisclosure } from "@mantine/hooks";
import { useModalStore } from "../store/useModalStore";

export const useColumnActions = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const openModal = useModalStore((state) => state.openModal);

  const handleMenuClick = (actionType: string) => {
    switch (actionType) {
      case "modal":
        open();
        break;

      default:
        break;
    }
  };

  return { opened, open, close, handleMenuClick, openModal };
};
