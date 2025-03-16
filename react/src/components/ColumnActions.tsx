import React from "react";
import { Menu, ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ColumnActionsProps, MenuItem } from "../interface/interface";
import { getMenuItems } from "../util/getMenuItems";
import { useModalStore } from "../store/useModalStore";

const ColumnActions: React.FC<ColumnActionsProps> = ({ page, rowData }) => {
  const menuItems = getMenuItems({ page, rowData });
  const openModal = useModalStore((state) => state.openModal);

  return (
    <>
      <Menu shadow="md" width={150}>
        <Menu.Target>
          <ActionIcon variant="transparent" aria-label="Settings" size="xl">
            <Icon icon="radix-icons:dots-horizontal" fontSize={20} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Actions</Menu.Label>
          {Array.isArray(menuItems) &&
            (menuItems as MenuItem[]).map((item, index) => {
              return (
                <Menu.Item
                  key={index}
                  component={item.link ? Link : undefined}
                  state={item.link ? rowData : null}
                  to={item.link ?? "#"}
                  color={item.color}
                  onClick={() =>
                    openModal(item.type, rowData, item.label, item.url)
                  }
                  rightSection={<Icon icon={item.icon} />}
                >
                  {item.label}
                </Menu.Item>
              );
            })}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ColumnActions;
