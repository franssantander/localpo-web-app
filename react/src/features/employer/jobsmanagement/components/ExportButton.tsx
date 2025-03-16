import { Button } from "@mantine/core";
import { ExportDataRowProps } from "../../../../interface/interface";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Icon } from "@iconify/react/dist/iconify.js";

const ExportButton = <T,>(props: ExportDataRowProps<T>) => {
  const { rowsData } = props;

  const exportToExcel = (data: any[]) => {
    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Jobs Data");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(dataBlob, "jobs_data.xlsx");
  };

  return (
    <>
      <Button
        rightSection={<Icon fontSize={18} icon="radix-icons:file-text" />}
        variant="outline"
        onClick={() => exportToExcel(rowsData)}
      >
        Export CSV
      </Button>
    </>
  );
};

export default ExportButton;
