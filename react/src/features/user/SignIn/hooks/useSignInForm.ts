import { useForm } from "@mantine/form";
import { useMutationApi } from "../../../../hooks/useQueryData";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

export const useSignInForm = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 0 ? null : "Password is required"),
    },
  });

  const {
    data,
    isPending,
    errorMessages,
    isSuccess,
    error,
    mutate: loginFn,
  } = useMutationApi(
    {
      url: API_ENDPOINTS.LOGIN,
      method: "POST",
    },
    ["login"]
  );

  useEffect(() => {
    if (isSuccess) {
      const token = data?.access_token;
      if (token) {
        setToken(token);

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken?.role;

        if (userRole === "HR Manager") {
          navigate("/app/dashboard");
        } else {
          navigate("/job-seeker/find-jobs");
        }
      }
    }

    if (error) {
      if (error?.status === 403) {
        navigate(error.response.data.url);
      }

      form.setFieldError("email", errorMessages);
    }
    // }, [data, error, navigate, isSuccess]);
  }, [data?.access_token]);

  return { form, data, isPending, isSuccess, loginFn };
};
