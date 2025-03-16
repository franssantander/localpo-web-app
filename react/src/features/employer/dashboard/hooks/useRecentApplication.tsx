import dayjs from "dayjs";

export const useRecentApplication = (date_applied) => {
  const isNewApplication = dayjs().diff(dayjs(date_applied), "day") === 0;
  const statusLabel = isNewApplication ? "New" : "Applied";

  return { statusLabel };
};
