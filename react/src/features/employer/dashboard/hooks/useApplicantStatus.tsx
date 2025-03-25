import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useFetchApi } from "../../../../hooks/useQueryData";

export const useApplicantStatus = (id) => {
    const { data, isFetching } = useFetchApi(
        {
            url: API_ENDPOINTS.VIEW_JOB_CARD(id),
            method: "GET",
        },
        ["view-job-card"]
    );

    const applicantStatusData = data?.data;

    return { applicantStatusData };
};
