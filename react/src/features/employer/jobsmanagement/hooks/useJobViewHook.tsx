import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useFetchApi } from "../../../../hooks/useQueryData";

export const useJobViewHook = (id: string) => {
    const {
        data,
        isFetching: viewJobFetching,
        isLoading: viewJobIsLoading,
    } = useFetchApi(
        { url: API_ENDPOINTS.VIEW_JOB(id), method: "GET" },
        ["view-job", id],
        { enabled: true }
    );

    const viewJobData = data?.data?.jobs_data;
    const appliedApplicants = data?.data?.applicants_data;

    return {
        viewJobData,
        appliedApplicants,
        viewJobFetching,
        viewJobIsLoading,
    };
};
