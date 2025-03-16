import React from "react";
import { Select } from "@mantine/core";

const FilterMobile: React.FC = () => {
  return (
    <div className="grid grid-cols gap-y-2">
      <div className="w-full grid grid-cols-3 gap-x-1">
        <Select
          size="xs"
          label="Date Posted"
          data={["Anytime", "Angular", "Vue", "Svelte"]}
          defaultValue="Anytime"
        />
        <Select
          size="xs"
          label="Job Type"
          data={[
            "Full-time",
            "Internship",
            "Part-time",
            "Freelancer",
            "Contract",
          ]}
          defaultValue="Full-time"
        />
        <Select
          size="xs"
          label="Experience Level"
          data={[
            "Fresh-grad",
            "Less than 1 year",
            "1-3 years",
            "3-5 years",
            "5-10 years",
          ]}
          defaultValue="Full-time"
        />
      </div>
      <div className="w-full grid grid-cols-3 gap-x-1">
        <Select
          size="xs"
          label="Remote/On-site"
          data={["On-site", "Hybrid", "Remote"]}
          defaultValue="On-site"
        />
        <Select
          size="xs"
          label="Location"
          data={["NCR", "Internship", "Part-time", "Freelancer", "Contract"]}
          defaultValue="Full-time"
        />
      </div>
    </div>
  );
};

export default FilterMobile;
