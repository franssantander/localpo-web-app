export const statusData = (statusObj: { status: string }) => {
  const status = typeof statusObj === "string" ? statusObj : statusObj?.status;
  
  switch (status) {
    case "Active":
      return "green";

    case "Closed":
      return "gray";

    default:
      return "default";
  }
};
