import { useEffect } from "react";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useFetchApi, useMutationApi } from "../../../../hooks/useQueryData";
import { ToastNotification } from "../../../../components/employer/ToastNotification";

export const useSaveJobHook = () => {
  const {
    data: getSavedJobs,
    isSuccess,
    isLoading,
    refetch,
  } = useFetchApi(
    { url: API_ENDPOINTS.GET_ALL_SAVED_JOB, method: "GET" },
    ["get-all-savejob"],
    {
      enabled: false,
    }
  );

  const {
    data: saveJobData,
    isSuccess: isSuccessSaveJob,
    mutate: saveJobFn,
  } = useMutationApi({ url: API_ENDPOINTS.SAVE_JOB, method: "POST" }, [
    "save-job",
  ]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccessSaveJob) {
      refetch();
      ToastNotification(saveJobData);
    }
  }, [isSuccessSaveJob]);

  // const totalItems = getSavedJobs?.pagination?.total ?? 0;
  // const totalPages = Math.ceil(totalItems / perPage);

  const savedJobsData = getSavedJobs?.data;

  return { savedJobsData, saveJobFn };
};
