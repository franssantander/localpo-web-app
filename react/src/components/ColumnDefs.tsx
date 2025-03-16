import { useMemo } from "react";
import { Avatar, Badge } from "@mantine/core";
import { ColumnsData, CombinedRowData } from "../interface/interface";
import ColumnActions from "./ColumnActions";
import { useColumnAttribute } from "../hooks/useColumnAttribute";
import dayjs from "dayjs";

export const useColumnsDefs = (
  data: CombinedRowData[],
  page: string
): ColumnsData<CombinedRowData>[] => {
  const { getStatusColor, getColumnWidth } = useColumnAttribute();

  const columnsDefs = useMemo(() => {
    if (data.length === 0) return [];

    const includesColumn = ["actions", "img_profile", "profile_picture"];

    return Object.keys(data[0]).map((key) => {
      let column: ColumnsData<CombinedRowData> = {
        field: key as keyof CombinedRowData,
        headerName: data[0][key as keyof (typeof data)[0]],
        flex: !includesColumn.includes(key) ? 1 : undefined,
        width: getColumnWidth(key),
        filter: !includesColumn.includes(key)
          ? "agTextColumnFilter"
          : undefined,
        floatingFilter: true,
      };

      if (key === "img_profile" || key === "profile_picture") {
        column = {
          ...column,
          headerName: "",
          floatingFilter: false,
          cellRenderer: (params: { data: CombinedRowData }) => {
            const { img_profile } = params.data;
            return <Avatar size="md" src={img_profile} alt="Profile" />;
          },
        };
      }

      if (key === "status") {
        column = {
          ...column,
          headerName: "Status",
          cellRenderer: (params: { data: CombinedRowData }) => {
            const { status } = params.data;
            return (
              <Badge variant="light" color={getStatusColor(status)}>
                {status}
              </Badge>
            );
          },
        };
      }

      if (key === "actions") {
        column = {
          ...column,
          cellRenderer: (params: { data: CombinedRowData }) => (
            <ColumnActions page={page} rowData={params.data} />
          ),
        };
      }

      if (key === "created_at") {
        column = {
          ...column,
          cellRenderer: (params: { data: CombinedRowData }) => {
            const { created_at } = params.data;
            return <span>{dayjs(created_at).format("MMM DD YYYY")}</span>;
          },
        };
      }

      return column;
    });
  }, [data, page, getColumnWidth, getStatusColor]);

  return columnsDefs;
};
