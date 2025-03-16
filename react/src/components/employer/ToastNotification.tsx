import { notifications } from "@mantine/notifications";

export const ToastNotification = (data: {
  notification: { title: string; message: string };
}) => {
  notifications.show({
    title: data?.notification?.title,
    message: data?.notification?.message,
  });
};
