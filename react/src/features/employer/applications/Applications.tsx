import React from "react";
import applicationsData from "../../../data/applications.json";
import ApplicationsCol from "../../../data/ApplicationsCol.json";
import ShortListedCol from "../../../data/ShortListedCol.json";
import { useColumnsDefs } from "../../../components/ColumnDefs";
import { useExportCsv } from "../../../hooks/useExportCsv";
import JobsManagementTab from "./components/JobsManagementTab";

const Applications: React.FC = () => {
  const columns = useColumnsDefs(ApplicationsCol, "Applications");
  const shortListedCol = useColumnsDefs(ShortListedCol, "Shortlisted");
  const { onBtnExport, gridRef } = useExportCsv();

  return (
    <>
      <div>
        <div className="grid grid-cols gap-y-2">
          <h1 className="font-bold text-textBlack text-xl">Applications</h1>
          <p className="text-textGray text-sm max-w-[16rem] md:max-w-[32rem] md:text-lg">
            Manage and track your job postings effectively. See performance and
            make updates as needed.
          </p>
          <JobsManagementTab
            columns={columns}
            shortListedCol={shortListedCol}
            applicationsData={applicationsData}
            onBtnExport={onBtnExport}
            gridRef={gridRef}
          />
        </div>
      </div>
    </>
  );
};

export default Applications;
