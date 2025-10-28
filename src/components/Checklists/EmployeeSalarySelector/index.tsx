import { useState, useEffect } from "react";
import styles from "./EmployeeSalarySelector.module.css";
import { EmployeeSelector } from "../../Selectors/EmployeeSelector";
import { IconButton } from "../../ui/IconButton";
import { DeleteIcon, PinIcon, PlusMinIcon } from "../../../assets/icons";
import { useHandlers } from "../../../common/hooks";
import { Range } from "../../ui/Range";
import { moneyFormat } from "../../../common/functions";

interface Employee {
  id: string;
  firstName?: string;
  lastName?: string;
}

interface EmployeeSalary {
  employeeId: string;
  salary: number;
  fullName?: string;
  percent?: number;
  fixed?: boolean;
}

interface EmployeeSalarySelectorProps {
  label?: string;
  value: { employeeId: string; salary: number }[];
  salary: number;
  onChange: (value: { employeeId: string; salary: number }[]) => void;
  error?: boolean;
  errorMessage?: string;
}

export const EmployeeSalarySelector = ({
  label = "Сотрудники",
  value,
  salary,
  onChange,
  error,
  errorMessage,
}: EmployeeSalarySelectorProps) => {
  const [employees, setEmployees] = useState<EmployeeSalary[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const { handleEmployeeAdd } = useHandlers();

  const emitSimple = (arr: EmployeeSalary[]) => {
    const simple = arr.map((v) => ({
      employeeId: v.employeeId,
      salary: v.salary,
    }));
    onChange(simple);
  };

  const redistribute = (arr: EmployeeSalary[]): EmployeeSalary[] => {
    const fixed = arr.filter((v) => v.fixed);
    const free = arr.filter((v) => !v.fixed);
    let remaining = 100 - fixed.reduce((sum, v) => sum + (v.percent || 0), 0);

    if (remaining < free.length * 5) {
      const adjusted = arr.map((v) => {
        if (v.fixed) return v;
        const add = Math.min(remaining, 5);
        remaining -= add;
        return { ...v, percent: 5 + add };
      });
      return adjusted;
    }

    const totalFree = free.reduce((sum, v) => sum + (v.percent || 0), 0) || 1;
    const adjusted = arr.map((v) => {
      if (v.fixed) return v;
      return {
        ...v,
        percent: Math.round(((v.percent! / totalFree) * remaining) / 5) * 5,
      };
    });

    const sum = adjusted.reduce((s, v) => s + (v.percent || 0), 0);
    if (sum !== 100) {
      for (let i = adjusted.length - 1; i >= 0; i--) {
        if (!adjusted[i].fixed) {
          adjusted[i].percent! += 100 - sum;
          break;
        }
      }
    }

    return adjusted.map((v) => ({
      ...v,
      salary: Math.round((salary * (v.percent || 0)) / 100),
    }));
  };

  const handleEmployeeChange = (ids: string[], emps?: Employee[]) => {
    const newValue = ids.map((id) => {
      const existing = employees.find((v) => v.employeeId === id);
      if (existing) return existing;
      const emp = emps?.find((e) => e.id === id);
      return {
        employeeId: id,
        fullName: emp ? `${emp.firstName} ${emp.lastName}` : "",
        percent: 0,
        fixed: false,
        salary: 0,
      };
    });

    const even =
      newValue.length > 0 ? Math.floor(100 / newValue.length / 5) * 5 : 0;
    const adjusted = newValue.map((v) => ({
      ...v,
      percent: even,
      salary: Math.round((even / 100) * salary),
    }));

    const redistributed = redistribute(adjusted);
    setEmployees(redistributed);
    setSelectedEmployees(ids);
    emitSimple(redistributed);
  };

  const handleAmountChange = (id: string, newAmount: number) => {
    const newPercent = Math.round(((newAmount / salary) * 100) / 5) * 5;
    handlePercentChange(id, newPercent);
  };

  const handlePercentChange = (id: string, newPercent: number) => {
    newPercent = Math.round(newPercent / 5) * 5;
    if (newPercent < 5) newPercent = 5;

    const updated = employees.map((v) =>
      v.employeeId === id
        ? {
            ...v,
            percent: newPercent,
            salary: Math.round((salary * newPercent) / 100),
          }
        : v
    );
    const redistributed = redistribute(updated);
    setEmployees(redistributed);
    emitSimple(redistributed);
  };

  const handleRemoveEmployee = (id: string) => {
    const updated = employees
      .filter((v) => v.employeeId !== id)
      .map((v) => ({ ...v, fixed: false }));

    const redistributed = redistribute(updated);
    setEmployees(redistributed);
    setSelectedEmployees(redistributed.map((v) => v.employeeId));
    emitSimple(redistributed);
  };

  const toggleFixed = (id: string) => {
    if (employees.length < 3) return;

    const hasFixed = employees.some((v) => v.fixed && v.employeeId !== id);

    const updated = employees.map((v) => {
      if (v.employeeId === id) return { ...v, fixed: !v.fixed };
      if (hasFixed) return { ...v, fixed: false };
      return v;
    });

    const redistributed = redistribute(updated);
    setEmployees(redistributed);
    emitSimple(redistributed);
  };

  useEffect(() => {
    if (value.length === 0) {
      setEmployees([]);
      setSelectedEmployees([]);
      return;
    }

    const extIds = value.map((v) => v.employeeId);
    if (
      employees.length === value.length &&
      employees.every((v) => extIds.includes(v.employeeId))
    ) {
      return;
    }

    const newEmps = value.map((v) => ({
      employeeId: v.employeeId,
      fullName:
        employees.find((e) => e.employeeId === v.employeeId)?.fullName || "",
      salary: v.salary,
      percent: Math.round(((v.salary / salary) * 100) / 5) * 5,
      fixed: false,
    }));

    const redistributed = redistribute(newEmps);
    setEmployees(redistributed);
    setSelectedEmployees(extIds);
  }, [value, salary]);

  useEffect(() => {
    if (employees.length === 0) return;

    const updated = employees.map((v) => ({
      ...v,
      salary: Math.round(((v.percent || 0) * salary) / 100),
    }));

    setEmployees(updated);
    emitSimple(updated);
  }, [salary]);

  return (
    <div className={styles.container}>
      <EmployeeSelector
        label={label}
        value={selectedEmployees}
        onChange={(ids, emps) => handleEmployeeChange(ids, emps)}
        multiple
        itemCont={false}
        actions={[
          {
            label: "Добавить сотрудника",
            icon: <PlusMinIcon />,
            onClick: (input) => handleEmployeeAdd(undefined, input as string),
          },
        ]}
        error={error}
        errorMessage={errorMessage}
      />

      {employees.length > 0 && (
        <div className={styles.barContainer}>
          {employees.map((v) => (
            <div key={v.employeeId} className={styles.barItem}>
              <div className={styles.barName}>{v.fullName}</div>
              <div className={styles.barWrapper}>
                <Range
                  value={v.salary}
                  min={Math.round(salary * 0.05)}
                  max={salary}
                  step={Math.round(salary * 0.05)}
                  onChange={(val: number) =>
                    handleAmountChange(v.employeeId, val)
                  }
                  disabled={v.fixed}
                  className={styles.slider}
                />
              </div>

              <div className={styles.barPercent}>
                {moneyFormat(v.salary)} {v.percent}%
              </div>

              <div className={styles.barControl}>
                {employees.length > 2 && (
                  <IconButton
                    icon={<PinIcon />}
                    onClick={() => toggleFixed(v.employeeId)}
                    variant="outline"
                    className={v.fixed ? styles.checked : undefined}
                  />
                )}
                <IconButton
                  icon={<DeleteIcon />}
                  variant="outline"
                  onClick={() => handleRemoveEmployee(v.employeeId)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
