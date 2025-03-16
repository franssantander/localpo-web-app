import React from "react";
import AgGridTable from "../../../components/AgGridTable";
import { useColumnsDefs } from "../../../components/ColumnDefs";
import { useExportCsv } from "../../../hooks/useExportCsv";
import ExportCsv from "../../../components/ExportCsv";
import { useJobsManagementHook } from "./hooks/useJobsManagementHook";
import Modals from "../../../components/Modals";

const JobsManagement: React.FC = (apiKey) => {
  const columns = useColumnsDefs(JSON.parse(apiKey?.table), "JobsManagement");
  const { onBtnExport, gridRef } = useExportCsv();
  const { jobsManagementData } = useJobsManagementHook(apiKey, 10);

  return (
    <>
      <Modals page="JobsManagement" />
      <div>
        <div className="grid grid-cols gap-y-2">
          <h1 className="font-bold text-textBlack text-xl">Jobs Management</h1>
          <p className="text-textGray text-sm max-w-[16rem] md:max-w-[32rem] md:text-lg">
            Manage and track your job postings effectively. See performance and
            make updates as needed.
          </p>
        </div>
        <div className="py-14 grid grid-cols gap-y-5">
          <ExportCsv onBtnExport={onBtnExport} />
          <AgGridTable
            columnsDef={columns}
            rowData={jobsManagementData}
            gridRef={gridRef}
          />
        </div>
      </div>
    </>
  );
};

export default JobsManagement;
