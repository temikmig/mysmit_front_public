import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import {
  Box,
  Autocomplete,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  Slider,
} from "@mui/material";
import { useState, useMemo, useEffect, ReactNode } from "react";

import { ChecklistEmployeesInput } from "@entities/checklist";
import { useGetEmployeesSearchQuery } from "@entities/employee/api";
import { EmployeeSearchOption } from "@entities/employee/model";
import { useAuth } from "@features/auth";
import { useOpenEmployeeCreateModal } from "@features/employee";
import { NumberField } from "@shared/ui";

import { EmployeeBox } from "./EmployeeChecklistField.styled";

interface EmployeeChecklistFieldProps {
  value: ChecklistEmployeesInput[];
  onChange: (value: ChecklistEmployeesInput[]) => void;
  salary: number;
  label?: string;
  onEmployeeCreated?: (employee: EmployeeSearchOption) => void;
  error?: boolean;
  helperText?: ReactNode;
}

interface EmployeeUI extends EmployeeSearchOption {
  salary: number;
  pinned?: boolean;
}

export const EmployeeChecklistField = ({
  value = [],
  onChange,
  salary,
  label,
  onEmployeeCreated,
  error,
  helperText,
}: EmployeeChecklistFieldProps) => {
  const [search, setSearch] = useState("");
  const [localOptions, setLocalOptions] = useState<EmployeeSearchOption[]>([]);
  const [localSliders, setLocalSliders] = useState<Record<string, number>>({});
  const [pinnedMap, setPinnedMap] = useState<Record<string, boolean>>({});

  const { isAdmin } = useAuth();

  const { data: apiOptions } = useGetEmployeesSearchQuery({
    search,
    limit: 20,
  });

  const options = useMemo(
    () => [...(apiOptions || []), ...localOptions],
    [apiOptions, localOptions],
  );

  const openCreate = useOpenEmployeeCreateModal({
    onSuccess: (employee) => {
      setLocalOptions((prev) => [...prev, employee]);
      onEmployeeCreated?.(employee);
    },
  });

  const selectedEmployees: EmployeeUI[] = value
    .map((f) => {
      const option = options.find((o) => o.id === f.employeeId);
      if (!option) return null;

      return {
        ...option,
        salary: f.salary,
        pinned: pinnedMap[f.employeeId] ?? false,
      };
    })
    .filter(Boolean) as EmployeeUI[];

  const updateForm = (employees: EmployeeUI[]) => {
    onChange(
      employees.map((e) => ({
        employeeId: e.id,
        salary: e.salary,
      })),
    );
  };

  const redistributeSalary = (
    employees: EmployeeUI[],
    totalSalary: number,
    activeId?: string,
    forceEqual?: boolean,
  ): EmployeeUI[] => {
    if (!employees.length) return [];

    const pinned = employees.filter((e) => e.pinned);
    const free = employees.filter((e) => !e.pinned);

    const pinnedSum = pinned.reduce((sum, e) => sum + e.salary, 0);
    const remaining = totalSalary - pinnedSum;

    if (remaining <= 0) {
      return employees.map((e) => ({
        ...e,
        salary: e.pinned ? e.salary : 0,
      }));
    }

    const updated = new Map<string, EmployeeUI>();

    pinned.forEach((e) => updated.set(e.id, e));

    // 💥 Равное распределение
    if (forceEqual) {
      const per = Math.floor(remaining / free.length);
      let rest = remaining - per * free.length;

      free.forEach((e) => {
        const add = rest > 0 ? 1 : 0;
        if (rest > 0) rest--;

        updated.set(e.id, {
          ...e,
          salary: per + add,
        });
      });

      return employees.map((e) => updated.get(e.id)!);
    }

    const active = free.find((e) => e.id === activeId);
    const others = free.filter((e) => e.id !== activeId);

    let activeSalary = active?.salary ?? 0;

    if (activeSalary > remaining) {
      activeSalary = remaining;
    }

    const remainingForOthers = remaining - activeSalary;

    const sumOthers =
      others.reduce((sum, e) => sum + e.salary, 0) || others.length;

    let distributed = 0;

    others.forEach((e, i) => {
      const isLast = i === others.length - 1;

      let val = Math.floor((e.salary / sumOthers) * remainingForOthers);

      if (isLast) {
        val = remainingForOthers - distributed;
      }

      if (val < 0) val = 0;

      distributed += val;

      updated.set(e.id, {
        ...e,
        salary: val,
      });
    });

    if (active) {
      updated.set(active.id, {
        ...active,
        salary: activeSalary,
      });
    }

    return employees.map((e) => updated.get(e.id)!);
  };

  const applyAndSave = (employees: EmployeeUI[], activeId?: string) => {
    updateForm(redistributeSalary(employees, salary, activeId));
  };

  const updateSalary = (id: string, newSalary: number) => {
    const updated = selectedEmployees.map((e) =>
      e.id === id ? { ...e, salary: newSalary } : e,
    );

    applyAndSave(updated, id);
  };

  const togglePinned = (id: string) => {
    const updated = selectedEmployees.map((e) =>
      e.id === id ? { ...e, pinned: !e.pinned } : e,
    );

    setPinnedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    applyAndSave(updated);
  };

  const removeEmployee = (id: string) => {
    let filtered = selectedEmployees.filter((e) => e.id !== id);
    if (filtered.length < 3) {
      filtered = filtered.map((e) => ({ ...e, pinned: false }));
      setPinnedMap({});
    } else {
      setPinnedMap((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }

    applyAndSave(filtered);
  };

  useEffect(() => {
    if (options.length && selectedEmployees.length) {
      applyAndSave(selectedEmployees);
    }
  }, [salary]);

  useEffect(() => {
    if (options.length && selectedEmployees.length) {
      updateForm(
        redistributeSalary(selectedEmployees, salary, undefined, true),
      );
    }
  }, [salary]);

  return (
    <Box>
      <Autocomplete
        multiple
        options={options}
        value={selectedEmployees}
        getOptionLabel={(o) => o.name}
        filterSelectedOptions
        isOptionEqualToValue={(o, v) => o.id === v.id}
        onChange={(_, value) => {
          const oldEmployees = selectedEmployees;
          const newEmployees = value.filter(
            (v) => !oldEmployees.find((e) => e.id === v.id),
          );

          if (newEmployees.length === 0) {
            const mapped = value.map((v) => {
              const exist = oldEmployees.find((e) => e.id === v.id);
              return {
                ...v,
                salary: exist?.salary ?? 0,
                pinned: exist?.pinned ?? false,
              };
            });
            applyAndSave(mapped);
            return;
          }

          const pinnedSum = oldEmployees
            .filter((e) => e.pinned)
            .reduce((sum, e) => sum + e.salary, 0);
          const freeSalary = salary - pinnedSum;

          const oldSum =
            oldEmployees
              .filter((e) => !e.pinned)
              .reduce((sum, e) => sum + e.salary, 0) || 1;
          const oldAdjusted = oldEmployees.map((e) => ({
            ...e,
            salary: e.pinned
              ? e.salary
              : Math.floor(
                  (e.salary / oldSum) *
                    (freeSalary -
                      newEmployees.length * (freeSalary / value.length)),
                ),
          }));

          const remainingForNew =
            freeSalary -
            oldAdjusted
              .filter(
                (e) => oldEmployees.find((o) => o.id === e.id) && !e.pinned,
              )
              .reduce((sum, e) => sum + e.salary, 0);
          const newSalary = Math.floor(remainingForNew / newEmployees.length);

          const mapped = value.map((v) => {
            const exist = oldAdjusted.find((e) => e.id === v.id);
            if (exist) return exist;
            return { ...v, salary: newSalary, pinned: false };
          });

          applyAndSave(mapped);
        }}
        inputValue={search}
        onInputChange={(_, val, reason) => {
          if (reason === "input") setSearch(val);
          if (reason === "clear") setSearch("");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={error}
            helperText={helperText}
            variant="filled"
            placeholder="Начните вводить имя..."
          />
        )}
        renderTags={() => null}
        noOptionsText={
          <Button
            fullWidth
            variant="outlined"
            onMouseDown={(e) => {
              e.preventDefault();
              openCreate();
            }}
          >
            Создать "{search}"
          </Button>
        }
      />

      <Stack spacing={1} mt={1}>
        {selectedEmployees.map((emp) => {
          const percent =
            localSliders[emp.id] ??
            (salary ? Math.round((emp.salary / salary) * 100) : 0);

          return (
            <EmployeeBox key={emp.id}>
              <Box width="50%">
                <Typography color={emp.pinned ? "gray" : "inherit"}>
                  {emp.name}
                </Typography>
                {isAdmin ? (
                  <NumberField
                    label="Зарплата"
                    moneyMode
                    min={0}
                    max={salary}
                    value={emp.salary}
                    disabled={selectedEmployees.length === 1 || emp.pinned}
                    onChange={(val) => updateSalary(emp.id, val)}
                    icon={<CurrencyRubleIcon />}
                  />
                ) : (
                  <Typography color={emp.pinned ? "gray" : "inherit"}>
                    {percent}%
                  </Typography>
                )}
              </Box>

              {salary > 0 && (
                <>
                  <Box display="flex" gap={2} width="50%">
                    {selectedEmployees.length > 2 && (
                      <IconButton
                        size="small"
                        onClick={() => togglePinned(emp.id)}
                      >
                        <PushPinIcon
                          color={emp.pinned ? "primary" : "inherit"}
                        />
                      </IconButton>
                    )}

                    <Slider
                      disabled={selectedEmployees.length === 1 || emp.pinned}
                      min={0}
                      max={100}
                      value={percent}
                      onChange={(_, value) => {
                        const percentValue = Array.isArray(value)
                          ? value[0]
                          : value;

                        if (localSliders[emp.id] === percentValue) return;

                        setLocalSliders((prev) => ({
                          ...prev,
                          [emp.id]: percentValue,
                        }));
                      }}
                      step={1}
                      onChangeCommitted={(_, value) => {
                        const percentValue = Array.isArray(value)
                          ? value[0]
                          : value;
                        const newSalary = Math.round(
                          (salary * percentValue) / 100,
                        );
                        updateSalary(emp.id, newSalary);
                        setLocalSliders((prev) => {
                          const copy = { ...prev };
                          delete copy[emp.id];
                          return copy;
                        });
                      }}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(p) => `${p}%`}
                    />
                  </Box>
                </>
              )}

              <IconButton size="small" onClick={() => removeEmployee(emp.id)}>
                <DeleteIcon />
              </IconButton>
            </EmployeeBox>
          );
        })}
      </Stack>
    </Box>
  );
};
