import { useMemo, useState } from "react";
import { RowData } from "../interface/interface";

export function useFilterSearch(rowsData: RowData[]) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return rowsData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, rowsData]);

  return { search, setSearch, filteredData };
}
