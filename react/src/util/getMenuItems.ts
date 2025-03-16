import _ from "lodash";
import { CombinedRowData, MenuItem } from "../interface/interface";

export const getMenuItems = ({
  page,
  rowData,
}: {
  page: string;
  rowData: CombinedRowData;
}): MenuItem[] => {
  switch (page) {
    case "JobsManagement":
      return rowData.actions?.map((action) => {
        return {
          label: action.label,
          url: action.url,
          link: action.link,
          color: action.color,
          type: action.type,
          icon: action.icon,
        };
      });
    case "Applications":
      return rowData.actions?.map((action) => {
        return {
          label: action.label,
          url: action.url,
          link: action.link,
          color: action.color,
          type: action.type,
          icon: action.icon,
        };
      });
    case "Shortlisted":
      return [
        {
          label: "View",
          link: `/app/applications/${_.replace(
            String(rowData.id),
            /\s+/g,
            "-"
          )}`,
          type: "new_page",
          icon: "radix-icons:eye-open",
        },
      ];
    case "UsersManagement":
      return rowData.actions?.map((action) => {
        return {
          label: action.label,
          link: action.link,
          url: action.url,
          color: action.color,
          type: action.type,
          icon: action.icon,
        };
      });
    default:
      return [];
  }
};
