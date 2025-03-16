import { useState } from "react";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useFetchApi } from "../../../../hooks/useQueryData";

export const useDashboardTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data: recentApplicationData, isFetching: isFetchingRecent } =
    useFetchApi(
      {
        url: API_ENDPOINTS.GET_RECENT_APPLICATION(perPage, currentPage),
        method: "GET",
      },
      ["recent-application"]
    );

  const recentApplicantData = recentApplicationData?.data?.recent_application;

  const totalItems = recentApplicationData?.pagination?.total ?? 0;
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    recentApplicationData,
    isFetchingRecent,
    totalItems,
    totalPages,
    recentApplicantData,
  };
};
