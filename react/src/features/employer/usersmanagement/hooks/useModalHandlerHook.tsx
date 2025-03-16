import { useEffect } from "react";
import { useMutationApi } from "../../../../hooks/useQueryData";
import { ToastNotification } from "../../../../components/employer/ToastNotification";

export const useModalHandlerHook = (url, closeModal) => {
  const {
    data,
    isSuccess,
    isPending,
    mutate: deleteUserFn,
  } = useMutationApi({ url: url, method: "POST" }, ["delete-user"]);

  useEffect(() => {
    if (isSuccess) {
      ToastNotification(data);
      closeModal();
    }
  }, [isSuccess]);

  return { data, isPending, deleteUserFn };
};
