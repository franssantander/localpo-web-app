import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useFetchApi } from "../../../../hooks/useQueryData";

export const useEditUserHook = (id: string) => {
  const {
    data,
    isFetching: viewUserFetching,
    isLoading: viewUserIsLoading,
  } = useFetchApi(
    { url: API_ENDPOINTS.VIEW_USER_PROFILE(id), method: "GET" },
    ["view-job", id],
    { enabled: true }
  );

  const usersData = data?.data;

  return { usersData, viewUserFetching, viewUserIsLoading };
};
