import { useState } from "react";
import { useFetchApi } from "../../../../hooks/useQueryData";

export const useTableHook = (apiKey: { url: string }, perPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useFetchApi(
    {
      url: `${apiKey.url}?per_page=${perPage}&page=${currentPage}`,
      method: "GET",
    },
    ["get-all-users", currentPage],
    { enabled: true }
  );

  const tableData = data?.data?.users;
  const statsData = data?.data?.overview;
  //   const totalItems = data?.pagination?.total ?? 0;
  //   const totalPages = Math.ceil(totalItems / perPage);

  return {
    tableData,
    statsData,
    isLoading,
    isError,
    refetch,
    // totalPages,
    currentPage,
  };
};
