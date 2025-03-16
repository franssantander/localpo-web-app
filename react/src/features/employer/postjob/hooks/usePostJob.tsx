import { Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-style";
import Superscript from "@tiptap/extension-document";
import SubScript from "@tiptap/extension-code";
import "@mantine/tiptap/styles.css";
import { useForm } from "@mantine/form";
import { useMutationApi } from "../../../../hooks/useQueryData";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { apiErrorMessages } from "../../../../util/apiErrorMessages";

export const usePostJob = (isEditMode: boolean) => {
  const location = useLocation();
  const formDataValue = location?.state;


  const form = useForm({
    mode: "controlled",
    initialValues: {
      id: null,
      background_img: null,
      job_title: null,
      job_description: null,
      location: null,
      salary_range: null,
      experience_level: null,
      job_expiry: null,
    },

    transformValues: (values) => ({
      ...values,
      job_expiry: values.job_expiry
        ? dayjs(form.values.job_expiry).format("DD/MM/YYYY")
        : null,
    }),
  });

  useEffect(() => {
    if (formDataValue) {
      Object.entries(formDataValue).forEach(([formKey, value]) => {
        if (typeof value === "string") {
          try {
            const parsedValue = JSON.parse(value);

            if (Array.isArray(parsedValue) || typeof parsedValue === "object") {
              form.setFieldValue(formKey, parsedValue);
            } else {
              form.setFieldValue(formKey, value);
            }
            if (formKey === "job_description") {
              form.setFieldValue("job_description", value);
            }
          } catch (e) {
            if (
              formKey === "job_expiry" &&
              dayjs(value, "DD/MM/YYYY", true).isValid()
            ) {
              form.setFieldValue(formKey, dayjs(value, "DD/MM/YYYY").toDate());
            } else if (formKey === "job_description" && editor) {
              editor.commands.setContent(value);
              form.setFieldValue(formKey, value);
            } else {
              form.setFieldValue(formKey, value);
            }

            if (formKey === "job_description") {
              form.setFieldValue("job_description", value);
            }
          }
        } else {
          form.setFieldValue(formKey, value);
        }
      });
    }
    if (location.pathname === "/app/post-job") {
      form.reset();
    }
  }, [formDataValue, location.pathname]);

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
    content: form.values.job_description || "",
    onUpdate({ editor }) {
      form.setFieldValue("job_description", editor.getHTML());
    },
  });

  const {
    data,
    isPending,
    isSuccess,
    errorMessages,
    error,
    mutate: handleFormJobFn,
  } = useMutationApi(
    {
      url: isEditMode ? API_ENDPOINTS.EDIT_JOB : API_ENDPOINTS.POST_JOB,
      method: "POST",
    },
    ["formjob"]
  );

  useEffect(() => {
    if (isSuccess) {
      // form.reset();
      notifications.show({
        title: data?.title,
        message: data?.message,
      });
    }

    if (error) {
      apiErrorMessages(form, errorMessages);
    }
  }, [isSuccess, error]);

  const richTextError = form.errors.job_description;

  return {
    form,
    editor,
    richTextError,
    formDataValue,
    isPending,
    handleFormJobFn,
  };
};
