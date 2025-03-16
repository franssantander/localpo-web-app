import { useForm } from "@mantine/form";
import { API_ENDPOINTS, API_PSGC_ENDPOINTS } from "../../../../api/endpoints";
import {
  useFetchApi,
  useFetchPsgc,
  useMutationApi,
} from "../../../../hooks/useQueryData";
import { useEffect } from "react";
import dayjs from "dayjs";
import { findOptionName, mapToOptions } from "../../../../util/psgcMapData";
import { useDisclosure } from "@mantine/hooks";
import { ToastNotification } from "../../../../components/employer/ToastNotification";
import { apiErrorMessages } from "../../../../util/apiErrorMessages";

export const useUpdateProfile = (payloadData) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: "controlled",
    initialValues: {
      department: "",
      role: "",
      address_1: "",
      address_2: "",
      region: "",
      province: "",
      city_municipalities: "",
      barangay: "",
    },

    transformValues: (values) => ({
      ...values,
      date_birth: values.date_birth
        ? dayjs(form.values.date_birth).format("DD/MM/YYYY")
        : null,
    }),
  });

  useEffect(() => {
    if (payloadData) {
      Object.entries(payloadData)?.forEach(([formKey, value]) => {
        if (
          formKey === "date_birth" &&
          dayjs(value, "DD/MM/YYYY", true).isValid()
        ) {
          form.setFieldValue(formKey, dayjs(value, "DD/MM/YYYY").toDate());
        } else {
          form.setFieldValue(formKey, value);
        }
      });
    }
  }, []);

  const {
    isSuccess,
    data,
    error,
    errorMessages,
    isPending,
    mutate: updateUserProfileFn,
  } = useMutationApi(
    { url: API_ENDPOINTS.UPDATE_USER_PROFILE, method: "POST" },
    ["update-profile"]
  );

  useEffect(() => {
    if (isSuccess) {
      ToastNotification(data);
      close();
    }
    if (error) {
      apiErrorMessages(form, errorMessages);
    }
  }, [isSuccess, error]);

  //* PSGC HANDLER

  const { data: regionData } = useFetchPsgc(
    {
      url: API_PSGC_ENDPOINTS.REGIONS,
      method: "GET",
    },
    ["regions"],
    {
      refetchOnWindowFocus: false,
    }
  );

  const regionOptions = mapToOptions(regionData, "code", "regionName");

  const formInput = form.getValues();

  const { data: provinceData } = useFetchPsgc(
    {
      url: formInput.region_code
        ? API_PSGC_ENDPOINTS.PROVINCES(formInput.region_code)
        : null,
      method: "GET",
    },
    ["provinces", formInput.region_code],
    {
      enabled: Boolean(formInput.region_code),
      refetchOnWindowFocus: false,
    }
  );

  const provinceOptions = mapToOptions(provinceData, "code", "name");

  const { data: municipalitiesData } = useFetchPsgc(
    {
      url: formInput.province_code
        ? API_PSGC_ENDPOINTS.MUNICIPALITIES(formInput.province_code)
        : null,
      method: "GET",
    },
    ["municipalities", formInput.province_code],
    {
      enabled: Boolean(formInput.province_code),
      refetchOnWindowFocus: false,
    }
  );

  const municipalityOptions = mapToOptions(municipalitiesData, "code", "name");

  const { data: brgyData } = useFetchPsgc(
    {
      url: formInput.municipalities_code
        ? API_PSGC_ENDPOINTS.BARANGAYS(formInput.municipalities_code)
        : null,
      method: "GET",
    },
    ["municipalities", formInput.municipalities_code],
    {
      enabled: Boolean(formInput.municipalities_code),
      refetchOnWindowFocus: false,
    }
  );

  const brgyOptions = mapToOptions(brgyData, "code", "name");

  const handleSubmit = (values) => {
    console.log("handleSubmit: ", values);
  };

  const handlePsgcChange = (field: string, code: string) => {
    const optionsMap = {
      region_code: regionOptions,
      province_code: provinceOptions,
      municipalities_code: municipalityOptions,
      barangay_code: brgyOptions,
    };
    const nameField = field.replace("_code", ""); 
    const options = optionsMap[field]; 
    const name = findOptionName(options, code); 
    form.setFieldValue(field, code);
    form.setFieldValue(nameField, name);
  };
  

  return {
    form,
    opened,
    open,
    close,
    updateUserProfileFn,
    isPending,
    errorMessages,
    regionOptions,
    provinceOptions,
    municipalityOptions,
    brgyOptions,
    handleSubmit,
    handlePsgcChange,
  };
};
