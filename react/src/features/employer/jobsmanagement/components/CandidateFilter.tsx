import { Icon } from "@iconify/react/dist/iconify.js";
import { Select, TextInput } from "@mantine/core";
import React from "react";

const CandidateFilter: React.FC = () => {
  return (
    <>
      <TextInput
        size="md"
        placeholder="Search Candidate"
        leftSection={<Icon fontSize={24} icon="radix-icons:magnifying-glass" />}
      />
      <div className="grid grid-cols-2 gap-x-4">
        <Select
          placeholder="Filter By"
          data={["React", "Angular", "Vue", "Svelte"]}
        />
        <Select
          placeholder="Sort By"
          data={["React", "Angular", "Vue", "Svelte"]}
        />
      </div>
    </>
  );
};

export default CandidateFilter;
