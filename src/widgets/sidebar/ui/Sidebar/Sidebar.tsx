import { useSelector } from "react-redux";

import { getSidebarOpen } from "@entities/ui";
import { useMenuItems } from "@features/menu-items";

import { SidebarRoot, VersionNum } from "./Sidebar.styled";
import { SidebarMenu } from "../SidebarMenu";

export const Sidebar = () => {
  const isSidebarOpen = useSelector(getSidebarOpen);

  const items = useMenuItems();

  return (
    <SidebarRoot isOpen={isSidebarOpen}>
      <SidebarMenu menuItems={items} isOpen={isSidebarOpen} />
      {isSidebarOpen && <VersionNum>mySmit.RedLine v2.0.0.377</VersionNum>}
    </SidebarRoot>
  );
};
