import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridTableProps } from "../interface/interface";

const AgGridTable: React.FC<AgGridTableProps> = (props) => {
  const { columnsDef, rowData, gridRef } = props;

  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];

  return (
    <div className="ag-theme-quartz" style={{ height: 574 }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnsDef}
        pagination={true}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
};

export default AgGridTable;
