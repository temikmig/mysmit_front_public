import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  useId,
} from "react";
import Input from "../../ui/Input";
import { Dropdown } from "../../ui/Dropdown";
import clsx from "clsx";
import styles from "./AutocompleteInput.module.css";
import {
  AngleDownMinIcon,
  CheckIcon,
  CrossCircleIcon,
} from "../../../assets/icons";
import { Tooltip } from "../Tooltip";

export interface Option<T> {
  label: string;
  value: string | number;
  data: T;
}

export interface AutocompleteAction {
  label: string;
  icon: ReactNode;
  onClick: (currentInput?: string | number) => void;
}

interface AutocompleteInputProps<T = unknown> {
  value: string | number | Array<string | number> | undefined | null;
  inputValueProp?: string;
  onChange: (
    value: string | number | Array<string | number>,
    obj?: Option<T> | Option<T>[]
  ) => void;
  fetchOptions: (search: string) => Promise<Option<T>[]>;
  placeholder?: string;
  label?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  multiple?: boolean;
  actions?: AutocompleteAction[];
  renderLabel?: (id: number, option?: Option<T>) => string | number;
  itemCont?: boolean;
  keepOpenOnSelect?: boolean;
}

export const AutocompleteInput = <T,>({
  value,
  inputValueProp,
  onChange,
  fetchOptions,
  placeholder = "Введите значение...",
  label,
  error,
  errorMessage,
  disabled,
  multiple = false,
  actions,
  renderLabel,
  itemCont = true,
  keepOpenOnSelect = false,
}: AutocompleteInputProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<Option<T>[]>([]);
  const [open, setOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const isAction = !!actions;

  const fetchDebounced = useCallback(
    (() => {
      let handler: ReturnType<typeof setTimeout>;
      return (query: string) => {
        clearTimeout(handler);
        handler = setTimeout(async () => {
          try {
            const data = await fetchOptions(query);
            setOptions(data);
          } catch (err) {
            console.error(err);
          }
        }, 200);
      };
    })(),
    [fetchOptions, isAction]
  );

  useEffect(() => {
    if (!open || readonly) return;
    fetchDebounced(inputValue);
  }, [inputValue, fetchDebounced, readonly, open]);

  const handleFocus = async () => {
    if (readonly || disabled) return;
    setOpen(true);
    try {
      const data = await fetchOptions(inputValue);
      setOptions(data);
      setOpen(data.length > 0 || isAction);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (inputValueProp !== undefined) {
      setInputValue(inputValueProp);
      setReadonly(true);
    }
  }, [inputValueProp]);

  useEffect(() => {
    if (!value) return;

    const loadValueLabels = async () => {
      try {
        if (!multiple && inputValue) return;
        if (multiple && Array.isArray(value) && value.length === 0) return;

        const data = await fetchOptions("");
        let foundOptions: Option<T>[] = [];

        if (multiple && Array.isArray(value)) {
          foundOptions = value
            .map((val) => data.find((opt) => opt.value === val))
            .filter((opt): opt is Option<T> => !!opt);
        } else if (!multiple && typeof value !== "object") {
          const found = data.find((opt) => opt.value === value);
          if (found) foundOptions = [found];
        }

        if (foundOptions.length > 0) {
          setOptions((prev) => {
            const unique = [...prev];
            for (const opt of foundOptions) {
              if (!unique.some((o) => o.value === opt.value)) unique.push(opt);
            }
            return unique;
          });

          if (!multiple) {
            setInputValue(foundOptions[0].label);
            setReadonly(true);
          }
        }
      } catch (err) {
        console.error("Failed to load current value(s):", err);
      }
    };

    void loadValueLabels();
  }, [value, multiple, fetchOptions, inputValue]);

  const handleSelect = (option: Option<T>) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const currentOptions = options.filter((o) =>
        currentValues.includes(o.value)
      );

      if (!currentValues.includes(option.value)) {
        onChange([...currentValues, option.value], [...currentOptions, option]);
        if (!keepOpenOnSelect) {
          setOpen(false);
        }
      } else {
        const newValues = currentValues.filter((v) => v !== option.value);
        const newOptions = currentOptions.filter(
          (o) => o.value !== option.value
        );
        onChange(newValues, newOptions);
      }

      // setInputValue("");
    } else {
      onChange(option.value, option);
      setInputValue(option.label);
      setReadonly(true);
      setOpen(false);
    }
  };

  const handleRemove = (val: string | number) => {
    if (!multiple || !Array.isArray(value)) return;
    const newValues = value.filter((v) => v !== val);
    const newOptions = newValues
      .map((v) => options.find((o) => o.value === v))
      .filter((o): o is Option<T> => !!o);
    onChange(newValues, newOptions);
  };

  const handleClear = () => {
    if (multiple) {
      onChange([], []);
    } else {
      setInputValue("");
      onChange("", undefined);
      setReadonly(false);
    }
    setOptions([]);
    setOpen(false);
  };

  const inputId = useId();
  const displayTags = multiple && Array.isArray(value) ? value : [];

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper} ref={anchorRef}>
        <Input
          value={inputValue}
          id={inputId}
          label={label}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (open && !readonly) {
              fetchDebounced(e.target.value);
            }
          }}
          onFocus={handleFocus}
          disabled={disabled}
          readOnly={readonly && !multiple}
          placeholder={placeholder}
          error={error}
          errorMessage={errorMessage}
          rightIcon={
            !multiple && readonly ? (
              <Tooltip
                text="Отменить"
                placement="top center"
                offsetY={4}
                withArrow
              >
                <CrossCircleIcon
                  className={styles.clearIcon}
                  onClick={handleClear}
                />
              </Tooltip>
            ) : (
              <AngleDownMinIcon
                className={clsx(styles.iconRight, open && styles.open)}
              />
            )
          }
        />
      </div>
      {itemCont && displayTags.length > 0 && (
        <div
          className={clsx(
            styles.selectedTagsContainer,
            multiple && displayTags.length > 0
          )}
        >
          {displayTags.map((val) => {
            const opt = options.find((o) => o.value === val);
            const displayLabel = renderLabel
              ? renderLabel(val as number, opt)
              : opt?.label || val;
            return (
              <div key={val} className={styles.selectedTagItem}>
                {displayLabel}
                <CrossCircleIcon
                  className={clsx(
                    styles.icon,
                    styles.iconRight,
                    styles.clearIcon
                  )}
                  onClick={() => handleRemove(val)}
                />
              </div>
            );
          })}
        </div>
      )}

      <Dropdown
        anchorRef={anchorRef}
        open={open && (!readonly || multiple || isAction)}
        onClose={() => setOpen(false)}
        fullWidth
        withShadow
        offsetY={8}
      >
        <div className={styles.selectCont}>
          {actions &&
            actions.map((action) => (
              <div
                className={clsx(styles.selectItem, styles.actionItem)}
                onClick={() => {
                  action.onClick(inputValue);
                  setOpen(false);
                }}
              >
                {action.icon && (
                  <span className={styles.icon}>{action.icon}</span>
                )}
                <span>{action.label}</span>
              </div>
            ))}
          {options.map((opt) => {
            const isSelected =
              multiple && Array.isArray(value) && value.includes(opt.value);

            return (
              <div
                key={opt.value}
                className={styles.selectItem}
                onClick={() => handleSelect(opt)}
              >
                <span>{opt.label}</span>
                {isSelected && <CheckIcon className={styles.checkIcon} />}
              </div>
            );
          })}
          {options.length === 0 && !isAction && (
            <div className={styles.emptyItem}>Ничего не найдено</div>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
