import { Tabs } from "@mui/material";
import { FC } from "react";

import { HeaderTab } from "./PageHeaderTabs.styled";
import { PageHeaderTabItem } from "../../model";
import { PageHeaderCount } from "../PageHeaderCount";

interface PageHeaderTabsProps {
  tabs: PageHeaderTabItem[];
  activeTab: string | number;
  onTabChange: (value: string) => void;
}

export const PageHeaderTabs: FC<PageHeaderTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <Tabs
      variant="scrollable"
      scrollButtons={false}
      value={activeTab}
      onChange={(_, value) => onTabChange(value)}
    >
      {tabs.map((tab) => (
        <HeaderTab
          key={tab.value}
          value={tab.value}
          label={
            <PageHeaderCount
              count={tab.badgeContent}
              isActive={activeTab === tab.value}
              isAlert={Boolean(
                tab.importantBadge && tab.badgeContent && tab.badgeContent > 0,
              )}
            >
              {tab.label}
            </PageHeaderCount>
          }
        />
      ))}
    </Tabs>
  );
};
