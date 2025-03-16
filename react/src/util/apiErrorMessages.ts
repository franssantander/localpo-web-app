export const apiErrorMessages = (form, errorMessages) => {
  if (errorMessages && typeof errorMessages === "object") {
    Object.entries(errorMessages).forEach(([key, message]) => {
      form.setFieldError(key, message);
    });
  }
};
