import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutationApi } from "../../../../hooks/useQueryData";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useAuth } from "../../../../context/AuthProvider";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useEmailVerificationHooks = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [countdown, setCountdown] = useState({ code: 0 });
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const form = useForm<{ verification_code: string }>({
    mode: "uncontrolled",
    initialValues: {
      verification_code: "",
    },

    validate: {
      verification_code: (value) =>
        value.length > 0 ? null : "Verification code is required",
    },
  });

  const {
    data: verifyEmailData,
    isSuccess: isSuccessVerifyEmail,
    errorMessages: verifyError,
    isPending: isVerifyPending,
    mutate: verifyEmailFn,
  } = useMutationApi(
    {
      url: API_ENDPOINTS.VERIFY_EMAIL,
      method: "POST",
    },
    ["verifyEmail"]
  );

  const {
    isSuccess,
    data,
    reset,
    isPending,
    mutate: resendCodeFn,
  } = useMutationApi(
    {
      url: API_ENDPOINTS.RESEND_CODE,
      method: "GET",
    },
    ["resendCode"]
  );

  useEffect(() => {
    if (isSuccessVerifyEmail) {
      const token = verifyEmailData?.access_token;
      if (token) {
        setToken(token);
        notifications.show({
          title: "Congratulations!",
          message: verifyEmailData?.message,
        });
        setTimeout(() => {
          navigate(verifyEmailData?.url);
        }, 2000);
      }
    }
  }, [isSuccessVerifyEmail]);

  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: "Verification code sent successfully.",
        message: data.message,
      });
      reset();
    }
  }, [isSuccess, data, reset]);

  const handleResendCodeClick = () => {
    resendCodeFn();
    setCountdown((prev) => ({ ...prev, code: 32 }));
  };

  useEffect(() => {
    const savedCountdown = Cookies.get("countdowns");
    if (savedCountdown) {
      const remainingTimes = JSON.parse(savedCountdown);
      setCountdown(remainingTimes);
    }
  }, []);

  useEffect(() => {
    let timerCode: number;
    if (countdown.code > 0) {
      timerCode = setTimeout(
        () => setCountdown((prev) => ({ ...prev, code: prev.code - 1 })),
        1000
      );
      Cookies.set("countdowns", JSON.stringify(countdown), { expires: 1 });
    } else {
      Cookies.remove("countdowns");
    }

    return () => clearTimeout(timerCode);
  }, [countdown]);

  return {
    email,
    form,
    verifyError,
    isVerifyPending,
    verifyEmailFn,
    isPending,
    countdown,
    handleResendCodeClick,
  };
};
