import { useDisclosure } from "@mantine/hooks";

export function useOpenEditDrawer() {
  const [opened, { open, close }] = useDisclosure(false);

  return { opened, open, close };
}
