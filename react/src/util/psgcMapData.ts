export const mapToOptions = (data, valueKey = "code", labelKey = "name") =>
  data?.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  })) || [];

export const findOptionName = (options, code) =>
  options?.find((option) => option.value === code)?.label || "";
