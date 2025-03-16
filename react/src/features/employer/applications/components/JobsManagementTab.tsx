import React from "react";
import ExportCsv from "../../../../components/ExportCsv";
import AgGridTable from "../../../../components/AgGridTable";
import { JobsManagementTabProps } from "../../../../interface/interface";
import { Tabs } from "@mantine/core";

const JobsManagementTab: React.FC<JobsManagementTabProps> = (props) => {
  const { columns, shortListedCol, applicationsData, onBtnExport, gridRef } =
    props;
  return (
    <>
      <Tabs className="py-14" variant="outline" defaultValue="applicants">
        <Tabs.List>
          <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
          <Tabs.Tab value="shortlisted">Shortlisted Review</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="applicants">
          <div className="py-5 grid grid-cols gap-y-5">
            <ExportCsv onBtnExport={onBtnExport} />
            <AgGridTable
              columnsDef={columns}
              rowData={applicationsData}
              gridRef={gridRef}
            />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="shortlisted">
          <div className="py-5 grid grid-cols gap-y-5">
            <ExportCsv onBtnExport={onBtnExport} />
            <AgGridTable
              columnsDef={shortListedCol}
              rowData={applicationsData}
              gridRef={gridRef}
            />
          </div>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default JobsManagementTab;
