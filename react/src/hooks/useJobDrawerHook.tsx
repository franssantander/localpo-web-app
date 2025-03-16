import { useEffect } from "react";
import { API_ENDPOINTS, API_HOMEPAGE } from "../api/endpoints";
import { useFetchApi, useMutationApi } from "./useQueryData";
import { useAuth } from "../context/AuthProvider";
import { useDrawerStore } from "../store/useDrawerStore";
import { ToastNotification } from "../components/employer/ToastNotification";

export const useJobDrawerHook = () => {
  const { drawerData } = useDrawerStore();

  //* VIEW AUTH JOB DRAWER
  const { data: jobDrawerData, isLoading: isPendingDrawerView } = useFetchApi(
    {
      url: drawerData ? API_ENDPOINTS.VIEW_AUTH_JOB(drawerData) : null,
      method: "GET",
    },
    ["view-job", drawerData],
    { enabled: !!drawerData }
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

  const jobDrawer = jobDrawerData?.data?.job;
  const similarJob = jobDrawerData?.data?.similar_jobs;

  useEffect(() => {
    if (isSuccesswithdrawApplication) {
      ToastNotification(withdrawApplicationData);
    }
  }, [isSuccesswithdrawApplication, withdrawApplicationData]);

  return {
    jobDrawer,
    similarJob,
    isPendingDrawerView,
    isPendingWithdrawApplication,
    withdrawApplicationFn,
  };
};
