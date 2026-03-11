import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import {
  SpeedDial,
  SpeedDialAction,
  Box,
  Paper,
  Popper,
  ClickAwayListener,
} from "@mui/material";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { SearchField } from "./PageHeaderActions.styled";
import { PageHeaderActionItem } from "../../model";
interface PageHeaderActionsProps {
  actions: PageHeaderActionItem[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: ReactNode;
  filtersButton?: boolean;
  hasFilters?: boolean;
}

export const PageHeaderActions: FC<PageHeaderActionsProps> = ({
  actions,
  searchValue,
  onSearchChange,
  filters,
  filtersButton = true,
  hasFilters,
}) => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [anchorFilter, setAnchorFilter] = useState<HTMLElement | null>(null);

  const openFilter = Boolean(anchorFilter);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen) onSearchChange?.("");
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorFilter(anchorFilter ? null : event.currentTarget);
  };

  const handleToggle = () => {
    if (!hasFilters || !filtersButton) setOpen((prev) => !prev);
    if (open) {
      setSearchOpen(false);
      setAnchorFilter(null);
    }
    if (searchOpen) onSearchChange?.("");
  };

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <Box display="flex" alignItems="center">
      {onSearchChange && (
        <SearchField
          inputRef={inputRef}
          size="small"
          placeholder="Поиск..."
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          sx={{
            width: searchOpen ? 200 : 0,
          }}
        />
      )}
      <SpeedDial
        ariaLabel="Действия"
        icon={<MoreVertIcon />}
        direction="left"
        open={open}
        onClick={handleToggle}
        FabProps={{ onMouseEnter: undefined }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.title}
            icon={action.icon}
            tooltipTitle={action.title}
            onClick={action.onClick}
          />
        ))}
        {filters && filtersButton && (
          <SpeedDialAction
            icon={<FilterListIcon color={hasFilters ? "primary" : "inherit"} />}
            tooltipTitle="Фильтры"
            onClick={(e) => {
              e.stopPropagation();
              handleFilterClick(e);
            }}
          />
        )}
        {onSearchChange && (
          <SpeedDialAction
            icon={<SearchIcon />}
            tooltipTitle="Поиск"
            onClick={(e) => {
              e.stopPropagation();
              handleSearchClick();
            }}
          />
        )}
      </SpeedDial>
      {filters && (
        <ClickAwayListener onClickAway={() => setAnchorFilter(null)}>
          <Popper
            open={openFilter}
            anchorEl={anchorFilter}
            placement="bottom-end"
            sx={{ zIndex: 99 }}
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 8],
                },
              },
            ]}
          >
            <Paper sx={{ p: 2, minWidth: 300 }}>{filters}</Paper>
          </Popper>
        </ClickAwayListener>
      )}
    </Box>
  );
};
