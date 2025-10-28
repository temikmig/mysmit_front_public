import {
  useDeleteBusinessExpenseMutation,
  useGetBusinessExpenseByIdQuery,
} from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./BusinessExpenseDelete.module.css";

interface BusinessExpenseDeleteProps {
  businessExpenseId: string;
  onSuccess: () => void;
}

export const BusinessExpenseDelete = ({
  businessExpenseId,
  onSuccess,
}: BusinessExpenseDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: businessExpense, isLoading } =
    useGetBusinessExpenseByIdQuery(businessExpenseId);

  const [deleteBusinessExpense, { isLoading: isLoadingDelete }] =
    useDeleteBusinessExpenseMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessExpense) return;

    await deleteBusinessExpense(businessExpenseId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Статья ${businessExpense.name} успешно удалена`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Статья бизнес-затрат не может быть удалена`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (businessExpense)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить статью бизнес-затрат "
          {businessExpense.name}"?
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
