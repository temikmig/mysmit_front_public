import { useState } from "react";
import { SidebarMenuItem, type SidebarMenuItemProps } from "./SidebarMenuItem";

interface SidebarMenuProps {
  menuItems: SidebarMenuItemProps[];
}

export const SidebarMenu = ({ menuItems }: SidebarMenuProps) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (title: string) => {
    setOpenItem((prev) => (prev === title ? null : title));
  };

  return (
    <ul>
      {menuItems.map((item) => (
        <SidebarMenuItem
          key={item.title}
          isOpen={openItem === item.title}
          onToggle={() => handleToggle(item.title)}
          {...item}
        />
      ))}
    </ul>
  );
};
