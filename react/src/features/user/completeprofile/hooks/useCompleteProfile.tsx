import { useForm } from "@mantine/form";
import {
  useFetchApi,
  useFetchPsgc,
  useMutationApi,
} from "../../../../hooks/useQueryData";
import { Link } from "@mantine/tiptap";
import { API_ENDPOINTS, API_PSGC_ENDPOINTS } from "../../../../api/endpoints";
import { mapToOptions, findOptionName } from "../../../../util/psgcMapData";
import { useEffect, useState } from "react";
import { ToastNotification } from "../../../../components/employer/ToastNotification";
import { apiErrorMessages } from "../../../../util/apiErrorMessages";
import { useNavigate } from "react-router-dom";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-style";
import Superscript from "@tiptap/extension-document";
import SubScript from "@tiptap/extension-code";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";

type FIELD_OPTIONS =
  | "regions"
  | "province"
  | "city_municipalities"
  | "barangay";

export const useCompleteProfile = () => {
  const navigate = useNavigate();
  const [isCheckPresent, setIsCheckPresent] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      profile_picture: null,
      phone_number: "",
      description: "",
      date_birth: "",
      address_1: "",
      address_2: "",
      region: "",
      province: "",
      city_municipalities: "",
      barangay: "",
    },

    // validate: {
    //   //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });

  const experienceForm = useForm({
    mode: "controlled",
    initialValues: {
      position: "",
      company: "",
      location: "",
      start_date: null,
      end_date: null,
    },
    transformValues: (values) => ({
      ...values,
      start_date: values.start_date
        ? dayjs(values.start_date).format("MMM YYYY")
        : null,
      end_date: isCheckPresent
        ? "Present"
        : values.end_date
        ? dayjs(values.end_date).format("MMM YYYY")
        : null,
    }),
  });

  const disabledSubmitExperience =
    !experienceForm.values.position ||
    !experienceForm.values.company ||
    !experienceForm.values.location ||
    !experienceForm.values.start_date ||
    (!isCheckPresent && !experienceForm.values.end_date);

  const editor = useEditor({
    extensions: [
      Highlight,
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: form.values.description || "",
    onUpdate({ editor }) {
      form.setFieldValue("description", editor.getHTML());
    },
  });

  const {
    isSuccess,
    data,
    error,
    errorMessages,
    isPending,
    mutate: updateUserProfileFn,
  } = useMutationApi({ url: API_ENDPOINTS.USER_PROFILE, method: "POST" }, [
    "update-profile",
  ]);

  useEffect(() => {
    if (isSuccess) {
      ToastNotification(data);
      navigate("/");
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

  const handleCheckboxChange = (event) => {
    const isChecked = event.currentTarget.checked;
    setIsCheckPresent(isChecked);

    experienceForm.setValues({
      end_date: isChecked ? "Present" : null,
    });
  };

  const handleAddExperience = (values) => {
    close();
    experienceForm.reset();
    setIsCheckPresent(false);
    setExperiences((prevExperience) => [...prevExperience, values]);
  };

  const handleSubmitCompleteProfile = (value, experience) => {
    const payload = {
      ...value,
      experience: experience,

    };
    console.log("payload: ", payload);

    updateUserProfileFn(payload)
  };

  return {
    form,
    experienceForm,
    isCheckPresent,
    regionOptions,
    provinceOptions,
    municipalityOptions,
    brgyOptions,
    handleSubmit,
    handlePsgcChange,
    updateUserProfileFn,
    editor,
    handleCheckboxChange,
    opened,
    open,
    close,
    experiences,
    handleAddExperience,
    setExperiences,
    handleSubmitCompleteProfile,
    disabledSubmitExperience,
  };
};
