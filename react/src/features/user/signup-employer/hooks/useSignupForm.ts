import { useForm } from "@mantine/form";
import { useMutationApi } from "../../../../hooks/useQueryData";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import { useEffect } from "react";

export const useSignupForm = () => {
  const navigate = useNavigate();

  const { setToken } = useAuth();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      phone_number: (value) =>
        value.length > 0 ? null : "Phone number is required",
      name: (value) => (value.length > 0 ? null : "Full name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        const passwordRegex =
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(value)
          ? null
          : "Use at least 8 characters, including a number and a special character";
      },
      password_confirmation: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const {
    isPending,
    data,
    isSuccess,
    errorMessages,
    mutate: submitFn,
  } = useMutationApi(
    {
      url: API_ENDPOINTS.REGISTER,
      method: "POST",
    },
    "signupEmployer"
  );

  if (errorMessages && typeof errorMessages === "object") {
    Object.entries(errorMessages).forEach(([key, message]) => {
      form.setFieldError(key, message);
    });
  }

  useEffect(() => {
    if (isSuccess) {
      const token = data?.access_token;
      const verificationUrl = data?.verification_url;
      setToken(token);
      navigate(verificationUrl);
    }
  }, [data?.verification_url]);

  return { isPending, form, submitFn };
};
