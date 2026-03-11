import { Box, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import { PageHeaderBox } from "./PageHeader.styled";
import { PageHeaderActionItem, PageHeaderTabItem } from "../../model";
import { PageHeaderActions } from "../PageHeaderActions";
import { PageHeaderTabs } from "../PageHeaderTabs";
interface PageHeaderProps {
  pageTitle: string;
  actions?: PageHeaderActionItem[];
  tabs?: PageHeaderTabItem[];
  activeTab?: string | number;
  onTabChange?: (value: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: ReactNode;
  hasFilters?: boolean;
  filtersButton?: boolean;
  rightBlock?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({
  pageTitle,
  actions,
  tabs,
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  filters,
  hasFilters,
  filtersButton,
  rightBlock,
}) => {
  return (
    <PageHeaderBox>
      {tabs && tabs.length > 1 && activeTab && onTabChange ? (
        <PageHeaderTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      ) : (
        <Typography variant="h4">{tabs ? tabs[0].label : pageTitle}</Typography>
      )}
      <Box display="flex" alignItems="center" justifyContent="center">
        {rightBlock}
        {actions && (
          <PageHeaderActions
            actions={actions}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            filters={filters}
            hasFilters={hasFilters}
            filtersButton={filtersButton}
          />
        )}
      </Box>
    </PageHeaderBox>
  );
};
