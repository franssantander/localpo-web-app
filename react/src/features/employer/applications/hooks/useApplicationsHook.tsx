import { useState } from "react";
import { useFetchApi } from "../../../../hooks/useQueryData";

export const useApplicationsHook = (
  apiKey: { url: string },
  perPage = 10
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useFetchApi(
    {
      url: `${apiKey.url}`,
      method: "GET",
    },
    ["get-all-applications"],
    { enabled: true }
  );

  const applicationsData = data?.data;
//   const totalItems = data?.pagination?.total ?? 0;
//   const totalPages = Math.ceil(totalItems / perPage);

  return {
    applicationsData,
    isLoading,
    isError,
    refetch,
    // totalPages,
    currentPage,
  };
};
