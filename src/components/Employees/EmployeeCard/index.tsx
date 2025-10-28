import { useGetEmployeeQuery } from "../../../api";
import { EditIcon } from "../../../assets/icons";
import Button from "../../ui/Button";
import { DataGrid, DataGridItem } from "../../ui/DataGrid";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./EmployeeCard.module.css";
import { useHandlers } from "../../../common/hooks";
import { moneyFormat } from "../../../common/functions";

interface EmployeeCardProps {
  employeeId: string;
}

export const EmployeeCard = ({ employeeId }: EmployeeCardProps) => {
  const {
    data: employee,
    isLoading,
    refetch,
  } = useGetEmployeeQuery(employeeId);

  const { handleEmployeeEdit } = useHandlers();

  const dataItems: DataGridItem[] =
    (employee && [
      {
        title: "Имя сотрудника",
        description: `${employee.firstName} ${employee.lastName}`,
      },
      {
        title: "Резерв",
        description: `${moneyFormat(employee.salaryBalance)}`,
      },
      {
        title: "Номинально",
        description: `${moneyFormat(employee.nominalSalaryBalance)}`,
      },
    ]) ||
    [];

  if (isLoading) return <LoaderPage />;

  if (employee)
    return (
      <div className={styles.employeeCardCont}>
        <h4>Карточка сотрудника</h4>
        <DataGrid items={dataItems} />
        <div className={styles.buttonsCont}>
          <Button
            icon={<EditIcon />}
            onClick={() => {
              handleEmployeeEdit(employeeId, refetch);
            }}
          >
            Редактировать сотрудника
          </Button>
        </div>
      </div>
    );
};
