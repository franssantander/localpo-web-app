import { useState } from "react";
import { useFetchApi } from "../../../../hooks/useQueryData";

export const useDashboard = (apiKey: { url: string }, perPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useFetchApi(
    {
      url: `${apiKey.url}?per_page=${perPage}&page=${currentPage}`,
      method: "GET",
    },
    ["get-all-postedjob", currentPage],
    { enabled: !!apiKey.url }
  );

  const postedJobs = data?.data?.jobs;
  const overviewCards = data?.data?.overview;
  const totalItems = data?.pagination?.total ?? 0; // Assuming API provides metadata like total items
  const totalPages = Math.ceil(totalItems / perPage);


  return {
    postedJobs,
    overviewCards,
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    isError,
    refetch,
  };
};
