import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSidebarOpen, setSidebarOpen } from "@entities/ui";

import { SidebarMenuItem, type SidebarMenuItemProps } from "../SidebarMenuItem";

interface SidebarMenuProps {
  menuItems: SidebarMenuItemProps[];
  isOpen: boolean;
}

export const SidebarMenu = ({ menuItems, isOpen }: SidebarMenuProps) => {
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector(getSidebarOpen);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (title: string) => {
    setOpenItem((prev) => (prev === title ? null : title));
    dispatch(setSidebarOpen(true));
  };

  useEffect(() => {
    if (!isSidebarOpen) setOpenItem(null);
  }, [isSidebarOpen]);

  return (
    <>
      {menuItems.map((item) => (
        <SidebarMenuItem
          key={item.title}
          isOpen={isOpen}
          isItemOpen={openItem === item.title}
          onToggle={() => handleToggle(item.title)}
          {...item}
        />
      ))}
    </>
  );
};
