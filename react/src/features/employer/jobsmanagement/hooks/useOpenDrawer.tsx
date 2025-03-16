import { useDisclosure } from "@mantine/hooks";
import { ViewApplicationDrawerProps } from "../../../../interface/interface";
import { useState } from "react";

export function useOpenDrawer() {
  const [selectedApplicant, setSelectedApplicant] = useState<
    ViewApplicationDrawerProps["selectedApplicant"] | null
  >(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleOpenApplicant = (
    applicant: ViewApplicationDrawerProps["selectedApplicant"]
  ) => {
    setSelectedApplicant(applicant);
    open();
  };

  return { opened, close, selectedApplicant, handleOpenApplicant };
}
