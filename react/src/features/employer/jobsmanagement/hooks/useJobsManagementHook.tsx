import { useState } from "react";
import { useFetchApi } from "../../../../hooks/useQueryData";

export const useJobsManagementHook = (
  apiKey: { url: string },
  perPage = 10
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useFetchApi(
    {
      url: `${apiKey.url}?per_page=${perPage}&page=${currentPage}`,
      method: "GET",
    },
    ["get-all-jobsmanagement", currentPage],
    { enabled: true }
  );

  const jobsManagementData = data?.data;
  const totalItems = data?.pagination?.total ?? 0;
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    jobsManagementData,
    isLoading,
    isError,
    refetch,
    totalPages,
    currentPage,
  };
};
