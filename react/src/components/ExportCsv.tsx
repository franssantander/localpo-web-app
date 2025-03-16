import { Button } from "@mantine/core";
import React from "react";
import { ExportCsvProps } from "../interface/interface";

const ExportCsv: React.FC<ExportCsvProps> = ({ onBtnExport }) => {
  return (
    <div className="ml-auto w-auto">
      <Button
        className="w-auto"
        onClick={onBtnExport}
        size="xs"
        variant="outline"
      >
        Export Report
      </Button>
    </div>
  );
};

export default ExportCsv;
