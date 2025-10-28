import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Dropdown } from "../Dropdown";
import styles from "./DatePicker.module.css";
import {
  AngleLeftMinIcon,
  AngleRightMinIcon,
  CalendarIcon,
} from "../../../assets/icons";
import { Tooltip } from "../Tooltip";
import { IMaskInput } from "react-imask";
import Input from "../Input";

interface DatePickerProps {
  value?: Date | null;
  onChange: (value: Date | null) => void;
  label?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const MONTHS = [
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

export const DatePicker = ({
  value,
  onChange,
  onBlur,
  label,
  name,
  placeholder = "Укажите дату",
  disabled,
  className,
  error = false,
  errorMessage,
}: DatePickerProps) => {
  const anchorRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(value || new Date());
  const [inputValue, setInputValue] = useState<string>(
    value ? value.toLocaleDateString("ru-RU") : ""
  );

  useEffect(() => {
    if (value) {
      setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
      setInputValue(value.toLocaleDateString("ru-RU"));
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleOpenCalendar = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const handleAccept = (val: string) => {
    setInputValue(val);

    const [day, month, year] = val.split(".");
    if (day && month && year && year.length === 4) {
      const now = new Date();
      const parsed = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      );
      if (!isNaN(parsed.getTime())) {
        onChange(parsed);
        return;
      }
    }

    onChange(null);
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const startDay =
    (new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() +
      6) %
    7;

  const weeks: (Date | null)[][] = [];
  let week: (Date | null)[] = [];

  for (let i = 0; i < startDay; i++) {
    week.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 70 + i);

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <Tooltip
          text={errorMessage || ""}
          placement="right center"
          show={Boolean(errorMessage)}
          withArrow
          offsetX={8}
        >
          <p
            className={clsx(
              "text_medium",
              styles.label,
              disabled && styles.labelDisabled,
              error && styles.labelError
            )}
          >
            {label}
          </p>
        </Tooltip>
      )}

      <Input
        ref={anchorRef}
        disabled={disabled}
        error={error}
        errorMessage={errorMessage}
        inputComponent={
          <IMaskInput
            className={styles.dateInput}
            mask="00.00.0000"
            value={inputValue}
            onAccept={handleAccept}
            disabled={disabled}
            name={name}
            placeholder={placeholder}
            onBlur={onBlur}
            autoComplete="off"
          />
        }
        rightIcon={<CalendarIcon className={clsx(styles.iconRight)} />}
        onClick={handleOpenCalendar}
      />

      <Dropdown
        anchorRef={anchorRef}
        open={open}
        onClose={() => setOpen(false)}
        withShadow
        offsetY={8}
        className={styles.calendarWrapper}
      >
        <div className={styles.calendar}>
          <div className={styles.header}>
            <button
              className={styles.navBtn}
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1,
                    1
                  )
                )
              }
            >
              <AngleLeftMinIcon />
            </button>

            <div className={styles.selects}>
              <select
                className={styles.select}
                value={currentMonth.getMonth()}
                onChange={(e) =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      Number(e.target.value),
                      1
                    )
                  )
                }
              >
                {MONTHS.map((m, i) => (
                  <option key={i} value={i}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                className={styles.select}
                value={currentMonth.getFullYear()}
                onChange={(e) =>
                  setCurrentMonth(
                    new Date(Number(e.target.value), currentMonth.getMonth(), 1)
                  )
                }
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              className={styles.navBtn}
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1,
                    1
                  )
                )
              }
            >
              <AngleRightMinIcon />
            </button>
          </div>

          <div className={styles.weekDays}>
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
              <div key={d} className={clsx("text_small_bold", styles.weekDay)}>
                {d}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {weeks.map((w, wi) => (
              <div key={wi} className={styles.weekRow}>
                {w.map((day, di) => {
                  const isSelected =
                    day && value && day.toDateString() === value.toDateString();
                  const isToday =
                    day && day.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={di}
                      className={clsx(
                        "text_small",
                        styles.day,
                        isSelected && styles.selected,
                        isToday && styles.today
                      )}
                      onClick={() => {
                        if (!day) return;

                        const now = new Date();
                        const dateWithCurrentTime = new Date(
                          day.getFullYear(),
                          day.getMonth(),
                          day.getDate(),
                          now.getHours(),
                          now.getMinutes(),
                          now.getSeconds(),
                          now.getMilliseconds()
                        );

                        onChange(dateWithCurrentTime);
                        setOpen(false);
                      }}
                    >
                      {day ? day.getDate() : ""}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
