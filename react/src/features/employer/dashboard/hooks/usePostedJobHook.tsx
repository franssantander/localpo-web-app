import { useEffect } from "react";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useMutationApi } from "../../../../hooks/useQueryData";
import { ToastNotification } from "../../../../components/employer/ToastNotification";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../../store/useModalStore";

export const usePostedJobHook = (status) => {
  const { closeModal } = useModalStore();
  const navigate = useNavigate();
  const {
    data: closeJobData,
    isPending: isPendingCloseJob,
    isSuccess: isSuccessJobStatus,
    mutate: jobStatusFn,
  } = useMutationApi(
    {
      url:
        status === "Active"
          ? API_ENDPOINTS.CLOSE_JOB
          : API_ENDPOINTS.REOPEN_JOB,
      method: "POST",
    },
    ["jobstatus"]
  );

  useEffect(() => {
    if (isSuccessJobStatus) {
      ToastNotification(closeJobData);
      closeModal();
      setTimeout(() => {
        navigate("/app/dashboard");
      }, 1000);
    }
  }, [isSuccessJobStatus]);

  return { closeJobData, isPendingCloseJob, jobStatusFn };
};
