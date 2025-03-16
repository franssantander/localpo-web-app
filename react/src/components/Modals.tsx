import React from "react";
import { UserManagementModal } from "../features/employer/usersmanagement/components/UserManagementModal";
import { useModalStore } from "../store/useModalStore";
import CloseJobModal from "../features/employer/jobsmanagement/components/CloseJobModal";

interface propsModal {
  page: string;
}

const Modals: React.FC<propsModal> = (props) => {
  const { page } = props;
  const { modalType } = useModalStore();

  switch (page) {
    case "JobsManagement":
      if (modalType === "modal") {
        return <CloseJobModal />;
      }
      break;

    case "UsersManagement":
      if (modalType === "modal") {
        return <UserManagementModal />;
      }
      break;

    default:
      break;
  }
};

export default Modals;
