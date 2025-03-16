import { ModuleRegistry } from "@ag-grid-community/core";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([CsvExportModule]);

export const useExportCsv = () => {
  const gridRef = useRef<AgGridReact | null>(null);

  const onBtnExport = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  }, []);

  return { onBtnExport, gridRef };
};
