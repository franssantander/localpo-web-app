import { useForm } from "@mantine/form";
import { useMutationApi } from "../../../../hooks/useQueryData";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export const useCompanyProfile = () => {
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      company_profile: null,
      company_name: "",
      phone_number: "",
      industry_type: "",
      year_establish: "",
      company_description: "",
      company_address: "",
      company_phone: "",
      company_email: "",
      company_website: "",
    },

    validate: {
      company_name: (value) =>
        value.length > 0 ? null : "Company name is required",
      industry_type: (value) =>
        value.length > 0 ? null : "Please select industry type",
      company_email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      company_address: (value) =>
        value.length > 0 ? null : "Company address is required",
      company_phone: (value) =>
        value.length > 0 ? null : "Company phone number is required",
    },
  });

  const {
    errorMessages,
    data,
    isSuccess,
    isPending,
    mutate: submitCompanyProfile,
  } = useMutationApi(
    {
      url: API_ENDPOINTS.COMPANY_PROFILE,
      method: "POST",
    },
    ["complete-profile"]
  );

  if (errorMessages && typeof errorMessages === "object") {
    Object.entries(errorMessages).forEach(([key, message]) => {
      form.setFieldError(key, message);
    });
  }

  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: "Company profile completed!",
        message: data.message,
      });
      navigate("/app/dashboard");
    }
  }, [isSuccess]);

  return {
    form,
    isPending,
    submitCompanyProfile,
  };
};
