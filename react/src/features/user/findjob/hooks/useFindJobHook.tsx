import { useForm } from "@mantine/form";
import { useMutationApi } from "../../../../hooks/useQueryData";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const useFindJobHook = () => {
  const location = useLocation();
  const jobId = location.state.job_id;

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    mode: "controlled",
    initialValues: {
      posted_job_id: jobId,
      resume: null,
      cover_letter: null,
      phone_number: null,
      availability_time_1: null,
      availability_time_2: null,
    },
  });

  const isFirstStepCompleted = !form.values.resume;
  const isSecondStepCompleted =
    !form.values.phone_number ||
    !form.values.availability_time_1 ||
    !form.values.availability_time_2;

  const {
    data: applyJobData,
    isSuccess: isSuccessApplyJob,
    isPending: isPendingApplyJob,
    mutate: applyJobFn,
  } = useMutationApi({ url: API_ENDPOINTS.APPLY_JOB, method: "POST" }, [
    "apply-job",
  ]);

  useEffect(() => {
    if (isSuccessApplyJob) {
      form.reset();
      nextStep();
    }
  }, [isSuccessApplyJob]);

  return {
    isPendingApplyJob,
    applyJobFn,
    active,
    setActive,
    nextStep,
    prevStep,
    isFirstStepCompleted,
    isSecondStepCompleted,
    form,
  };
};
