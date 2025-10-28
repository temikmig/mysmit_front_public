import { useDeleteEmployeeMutation, useGetEmployeeQuery } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./EmployeeDelete.module.css";

interface EmployeeDeleteProps {
  employeeId: string;
  onSuccess: () => void;
}

export const EmployeeDelete = ({
  employeeId,
  onSuccess,
}: EmployeeDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: employee, isLoading } = useGetEmployeeQuery(employeeId);

  const [deleteEmployee, { isLoading: isLoadingDelete }] =
    useDeleteEmployeeMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employee) return;

    await deleteEmployee(employeeId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Сотрудник ${employee.firstName} ${employee.lastName} успешно удален`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Сотрудник ${employee.firstName} ${employee.lastName} не может быть удален`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (employee)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить сотрудника {employee.firstName}{" "}
          {employee.lastName}?
        </p>
        <div className={styles.buttonsCont}>
          <Button variant="secondary" onClick={onSuccess}>
            Отмена
          </Button>

          <Button onClick={handleSubmit} disabled={isLoadingDelete}>
            Удалить
          </Button>
        </div>
        <LoaderBlur isLoading={isLoadingDelete} />
      </div>
    );
};
