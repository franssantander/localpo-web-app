import { API_HOMEPAGE } from "../api/endpoints";
import { useMutationApi } from "./useQueryData";

export const useClickSimilarJobHook = () => {
  const {
    data,
    isPending: isPendingViewJobSimilar,
    mutate: viewJobSimilar,
  } = useMutationApi({ url: API_HOMEPAGE.VIEW_JOB, method: "POST" }, [
    "view-jobsimilar",
  ]);

  const viewJobData = data?.data?.job;
  const viewSimilarJobData = data?.data?.similar_jobs;

  return { viewJobData, viewSimilarJobData, viewJobSimilar, isPendingViewJobSimilar };
};
