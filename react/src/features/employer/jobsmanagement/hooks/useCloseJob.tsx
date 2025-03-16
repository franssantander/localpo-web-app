import { useEffect } from "react";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useMutationApi } from "../../../../hooks/useQueryData";
import { useModalStore } from "../../../../store/useModalStore";
import { ToastNotification } from "../../../../components/employer/ToastNotification";

export const useCloseJob = () => {
  const { modalData, closeModal } = useModalStore();
  const {
    data: closeJobData,
    isPending: isPendingCloseJob,
    isSuccess: isSuccessJobStatus,
    mutate: jobStatusFn,
  } = useMutationApi(
    {
      url:
        modalData?.status === "Active"
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
    }
  }, [isSuccessJobStatus, closeModal, closeJobData]);

  return { isPendingCloseJob, jobStatusFn };
};
