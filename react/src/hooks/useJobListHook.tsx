import { useEffect, useState } from "react";
import { useFetchApi, useMutationApi } from "./useQueryData";
import { API_ENDPOINTS, API_HOMEPAGE } from "../api/endpoints";
import { ToastNotification } from "../components/employer/ToastNotification";
import { useAuth } from "../context/AuthProvider";
import { useDrawerStore } from "../store/useDrawerStore";

export const useJobListHook = (perPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { authUser } = useAuth();
  const { clearDrawerData } = useDrawerStore();
  const {
    data: jobsData,
    isLoading,
    isFetching,
    refetch,
  } = useFetchApi(
    {
      url: authUser.token
        ? API_ENDPOINTS.GET_AUTH_ALL_JOBS(perPage, currentPage)
        : API_HOMEPAGE.ALL_JOBS(perPage, currentPage),
      method: "GET",
    },
    ["jobs-data", currentPage],
    { enabled: false }
  );

  const {
    data: saveJobData,
    isSuccess: isSuccessSaveJob,
    mutate: saveJobFn,
  } = useMutationApi({ url: API_ENDPOINTS.SAVE_JOB, method: "POST" }, [
    "save-job",
  ]);

  // const saveJobFn = (data) => {
  //   clearDrawerData();
  //   saveJobFnMutation(data);
  // };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccessSaveJob) {
      refetch();
      ToastNotification(saveJobData);
    }
  }, [isSuccessSaveJob]);

  const totalItems = jobsData?.pagination?.total ?? 0;
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    jobsData,
    isLoading,
    isFetching,
    totalPages,
    saveJobFn,
    isSuccessSaveJob,
  };
};
