import { useDisclosure } from "@mantine/hooks";

export function useOpenScheduleModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return { opened, open, close };
}
