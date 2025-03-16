export const useColumnAttribute = () => {
  const getColumnWidth = (columnName: string) => {
    switch (columnName) {
      case "id":
        return 1;

      case "profile_picture":
        return 70;

      case "actions":
        return 120;

      default:
        return undefined;
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "Active":
      case "Hired":
      case "Short Listed":
      case "Offer Accepted":
        return "green";

      case "New":
        return "blue";

      case "Under Review":
        return "orange";

      case "Inactive":
        return "gray";
      case "Pending Offer":
        return "yellow";

      case "Suspense":
      case "Withdraw":
      case "Closed":
        return "gray";

      case "Deleted":
      case "Reject":
        return "red";

      default:
        break;
    }
  };

  return { getColumnWidth, getStatusColor };
};
