import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Popover, Typography, IconButton, Button } from "@mui/material";
import { useState } from "react";

import { Trigger, MonthGrid, MonthItem } from "./MonthYearPicker.styled";

const monthsShort = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

const monthsFull = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export const MonthYearPicker = ({ value, onChange }: Props) => {
  const now = new Date();

  const todayMonth = now.getMonth();
  const todayYear = now.getFullYear();

  const displayDate = value
    ? {
        year: Number(value.split("-")[0]),
        month: Number(value.split("-")[1]) - 1,
      }
    : {
        year: todayYear,
        month: todayMonth,
      };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [draftYear, setDraftYear] = useState(displayDate.year);

  const open = Boolean(anchorEl);

  const openPicker = (e: React.MouseEvent<HTMLElement>) => {
    setDraftYear(displayDate.year);
    setAnchorEl(e.currentTarget);
  };

  const closePicker = () => setAnchorEl(null);

  const selectMonth = (monthIndex: number) => {
    const formatted = `${draftYear}-${String(monthIndex + 1).padStart(2, "0")}`;

    onChange?.(formatted);

    closePicker();
  };

  const goToCurrentMonth = () => {
    const formatted = `${todayYear}-${String(todayMonth + 1).padStart(2, "0")}`;

    onChange?.(formatted);

    closePicker();
  };

  const isDifferentFromToday =
    draftYear !== todayYear ||
    displayDate.year !== todayYear ||
    displayDate.month !== todayMonth;

  return (
    <>
      <Trigger onClick={openPicker}>
        <Typography variant="h4">
          {monthsFull[displayDate.month]} {displayDate.year}
        </Typography>

        <KeyboardArrowDownIcon fontSize="large" />
      </Trigger>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closePicker}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ width: 220 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 1,
              pt: 1,
            }}
          >
            <IconButton size="small" onClick={() => setDraftYear((y) => y - 1)}>
              <ChevronLeftIcon />
            </IconButton>

            <Typography fontWeight={600}>{draftYear}</Typography>

            <IconButton size="small" onClick={() => setDraftYear((y) => y + 1)}>
              <ChevronRightIcon />
            </IconButton>
          </Box>

          <MonthGrid>
            {monthsShort.map((m, i) => {
              const isActive =
                i === displayDate.month && draftYear === displayDate.year;

              const isCurrent = i === todayMonth && draftYear === todayYear;

              return (
                <MonthItem
                  key={m}
                  active={isActive}
                  today={isCurrent}
                  onClick={() => selectMonth(i)}
                >
                  {m}
                </MonthItem>
              );
            })}
          </MonthGrid>

          {isDifferentFromToday && (
            <Box sx={{ p: 1 }}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={goToCurrentMonth}
              >
                Текущий месяц
              </Button>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
};
