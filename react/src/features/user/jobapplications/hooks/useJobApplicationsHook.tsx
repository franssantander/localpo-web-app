import { useEffect } from "react";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useFetchApi, useMutationApi } from "../../../../hooks/useQueryData";
import { ToastNotification } from "../../../../components/employer/ToastNotification";

export const useJobApplicationsHook = () => {
  const { data: appliedJobsData } = useFetchApi(
    { url: API_ENDPOINTS.GET_APPLIED_JOBS, method: "GET" },
    ["job-applications"]
  );

  //* Withdraw Application
  const {
    data: withdrawApplicationData,
    isSuccess: isSuccesswithdrawApplication,
    isPending: isPendingWithdrawApplication,
    mutate: withdrawApplicationFn,
  } = useMutationApi(
    { url: API_ENDPOINTS.WITHDRAW_APPLICATION, method: "POST" },
    ["withdraw-application"]
  );

  const appliedJobs = appliedJobsData?.data;

  useEffect(() => {
    if (isSuccesswithdrawApplication) {
      ToastNotification(withdrawApplicationData);
    }
  }, [isSuccesswithdrawApplication, withdrawApplicationData]);

  return { appliedJobs, withdrawApplicationFn };
};
