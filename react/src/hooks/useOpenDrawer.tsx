import { useDisclosure } from "@mantine/hooks";
import { CandidateDrawerProps } from "../interface/interface";
import { useState } from "react";

export function useOpenDrawer() {
  const [selectedApplicant, setSelectedApplicant] = useState<
    CandidateDrawerProps["selectedApplicant"] | null
  >(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleOpenApplicant = (applicant: CandidateDrawerProps["selectedApplicant"]) => {
    setSelectedApplicant(applicant);
    open();
  };

  return { opened, close, selectedApplicant, handleOpenApplicant };
}
