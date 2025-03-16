import {
  useMutation,
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import axiosClient from "../api/axiosClient";

interface ApiConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATH";
}

interface QueryOptions<TData = unknown, TError = unknown>
  extends Partial<UseQueryOptions<TData, TError>> {
  enabled?: boolean;
  retry?: boolean | number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchOnMount?: boolean;
}

type QueryKey = string | string[];

export const useFetchApi = <TData = unknown, TError = unknown>(
  apiConfig: ApiConfig,
  queryKey: QueryKey,
  queryOptions: QueryOptions<TData, TError> = {}
) => {
  const { data, isLoading, isFetching, error, isSuccess, refetch } = useQuery<
    TData,
    TError
  >({
    queryKey,
    queryFn: async () => {
      const response = await axiosClient({
        url: apiConfig.url,
        method: apiConfig.method,
      });
      return response.data;
    },
    enabled: queryOptions.enabled ?? true,
    retry: queryOptions.retry ?? 3,
    refetchOnWindowFocus: queryOptions.refetchOnWindowFocus ?? true,
    refetchOnReconnect: queryOptions.refetchOnReconnect ?? true,
    refetchOnMount: queryOptions.refetchOnMount ?? true,
  });

  return {
    data,
    isSuccess,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};

export const useFetchPsgc = <TData = unknown, TError = unknown>(
  apiConfig: ApiConfig,
  queryKey: QueryKey,
  queryOptions: QueryOptions<TData, TError> = {}
) => {
  const { data, isLoading, isFetching, error, isSuccess, refetch } = useQuery<
    TData,
    TError
  >({
    queryKey,
    queryFn: async () => {
      // const response = await fetch({
      //   url: apiConfig.url,
      //   method: apiConfig.method,
      // });

      const response = await fetch(apiConfig.url);
      const data = await response.json();

      return data;
    },
    enabled: queryOptions.enabled ?? true,
    retry: queryOptions.retry ?? 3,
    refetchOnWindowFocus: queryOptions.refetchOnWindowFocus ?? true,
    refetchOnReconnect: queryOptions.refetchOnReconnect ?? true,
    refetchOnMount: queryOptions.refetchOnMount ?? true,
  });

  return {
    data,
    isSuccess,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};

export const useMutationApi = (
  apiConfig: ApiConfig,
  queryKeyToInvalidate: QueryKey
) => {
  const queryClient = useQueryClient();

  const mutationFn = async (payload) => {
    const response = await axiosClient({
      headers: { "Content-Type": "multipart/form-data" },
      url: apiConfig.url,
      method: apiConfig.method,
      data: payload,
    });

    return response.data;
  };

  const { mutate, data, isPending, isSuccess, error, reset } = useMutation({
    mutationFn,
    onMutate: async (newData) => {
      await queryClient.cancelQueries(queryKeyToInvalidate);

      const previousData = queryClient.getQueryData(queryKeyToInvalidate);

      queryClient.setQueryData(queryKeyToInvalidate, (oldData) => {
        return {
          ...oldData,
          data: [
            ...(oldData?.data || []),
            { id: (oldData?.data?.length || 0) + 1, ...newData },
          ],
        };
      });

      return { previousData };
    },
    onSuccess: (success) => {
      queryClient.invalidateQueries(queryKeyToInvalidate);
    },
    onError: (error, newData, context) => {
      const { response } = error;

      if (response?.data?.notification) {
        const title = response?.data?.notification?.title;
        const message = response?.data?.notification?.message;

        notifications.show({
          color: "red",
          title: title,
          message: message,
        });
      }
      // const errorMessages = response?.data?.errors
      //   ? Object.values(response.data.errors)
      //   : "An unexpected error occurred";

      // notifications.show({
      //   color: "red",
      //   title: "Something went wrong",
      //   message: errorMessages,
      // });

      if (context?.previousData) {
        queryClient.setQueryData(queryKeyToInvalidate, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeyToInvalidate);
    },
  });

  const errorMessages = error?.response?.data?.message;

  return { mutate, reset, data, isPending, isSuccess, error, errorMessages };
};
