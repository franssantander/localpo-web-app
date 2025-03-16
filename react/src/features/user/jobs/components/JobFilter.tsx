import React from "react";
import { Button, Checkbox, Divider, Select } from "@mantine/core";

const JobFilter: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-between px-2 py-4">
        <h1 className="text-xs font-bold text-textBlack">Filter</h1>
        <Button size="xs" variant="transparent">
          Clear all
        </Button>
      </div>
      <Divider />
      <div className="px-2 py-4">
        <Select
          classNames={{ label: "font-bold" }}
          size="xs"
          label="Date Posted"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
        />
      </div>
      <Divider />
      <div className="px-2 py-4 grid grid-cols gap-y-2">
        <h1 className="text-xs font-bold text-textBlack">Job type</h1>
        <div className="grid grid-cols-2 gap-y-4">
          <Checkbox label="Full-time" size="xs" />
          <Checkbox label="Internship" size="xs" />
          <Checkbox label="Part-time" size="xs" />
          <Checkbox label="Freelancer" size="xs" />
          <Checkbox label="Contract" size="xs" />
        </div>
      </div>
      <Divider />
      <div className="px-2 py-4 grid grid-cols gap-y-2">
        <h1 className="text-xs font-bold text-textBlack">Experience Level</h1>
        <div className="grid grid-cols-2 gap-y-4">
          <Checkbox label="Fresh-grad" size="xs" />
          <Checkbox label="Less than 1 year" size="xs" />
          <Checkbox label="1-3 years" size="xs" />
          <Checkbox label="3-5 years" size="xs" />
          <Checkbox label="5-10 years" size="xs" />
        </div>
      </div>
      <Divider />
      <div className="px-2 py-4 grid grid-cols gap-y-2">
        <h1 className="text-xs font-bold text-textBlack">Remote/On-site</h1>
        <div className="grid grid-cols-2 gap-y-4">
          <Checkbox label="On-site" size="xs" />
          <Checkbox label="Hybrid" size="xs" />
          <Checkbox label="Remote" size="xs" />
        </div>
      </div>
      <Divider />
      <div className="px-2 py-4">
        <Select
          classNames={{ label: "font-bold" }}
          size="xs"
          label="Location"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
        />
      </div>
    </>
  );
};

export default JobFilter;
