import React from "react";
import usersmanagementCard from "../../../data/usersmanagementCard.json";
import StatCard from "../../../components/employer/StatCard";
import AgGridTable from "../../../components/AgGridTable";
import { useColumnsDefs } from "../../../components/ColumnDefs";
import { useExportCsv } from "../../../hooks/useExportCsv";
import ExportCsv from "../../../components/ExportCsv";
import Modals from "../../../components/Modals";
import { useTableHook } from "./hooks/useTableHook";

const UsersManagement: React.FC = (apiKey) => {
  const columns = useColumnsDefs(JSON.parse(apiKey?.table), "UsersManagement");
  const { onBtnExport, gridRef } = useExportCsv();
  const { tableData, statsData } = useTableHook(apiKey, 10);


  return (
    <>
      <div className="grid grid-cols gap-y-2">
        <h1 className="font-bold text-textBlack text-xl">Users Management</h1>
        <p className="text-textGray text-sm max-w-[16rem] md:max-w-[32rem] md:text-lg">
          Manage and track your job postings effectively. See performance and
          make updates as needed.
        </p>
      </div>
      <div className="grid grid-cols gap-y-11 my-14">
        <div className="grid grid-cols gap-y-3">
          <div className="grid grid-cols gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {statsData?.map((card, index) => (
              <StatCard
                key={index}
                title={card.title}
                description={card.description}
                total={card.total}
                icon={card.icon}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="py-4 grid grid-cols gap-y-5">
        <ExportCsv onBtnExport={onBtnExport} />
        <AgGridTable
          columnsDef={columns}
          rowData={tableData}
          gridRef={gridRef}
        />
      </div>
      <Modals page="UsersManagement" />
    </>
  );
};

export default UsersManagement;
