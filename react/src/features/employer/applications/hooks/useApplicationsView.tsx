import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useFetchApi } from "../../../../hooks/useQueryData";

export const useApplicationsView = (id) => {
    const {
        data,
        isFetching: viewApplicationFetching,
        isLoading: viewApplicationLoading,
    } = useFetchApi(
        { url: API_ENDPOINTS.VIEW_APPLICATION(id), method: "GET" },
        ["view-application", id],
        { enabled: true }
    );

    const viewApplicationData = data?.data;

    return {
        viewApplicationData,
        data,
    };
};
