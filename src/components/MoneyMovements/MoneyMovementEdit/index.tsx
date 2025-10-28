import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import styles from "./MoneyMovementEdit.module.css";
import {
  useEditMoneyMovementMutation,
  useGetMoneyMovementQuery,
} from "../../../api";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { ApiError } from "../../../api/baseQuery";
import { Textarea } from "../../ui/Textarea";

interface MoneyMovementEditProps {
  moneyMovementId: string;
  onSuccess: () => void;
}

export const MoneyMovementEdit = ({
  moneyMovementId,
  onSuccess,
}: MoneyMovementEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: moneyMovement, isLoading: isLoadingService } =
    useGetMoneyMovementQuery(moneyMovementId);

  const [editMovement, { isLoading: isLoadingEdit }] =
    useEditMoneyMovementMutation();

  const schema = yup.object({
    comment: yup.string().required("Введите комментарий"),
  });

  const form = useForm(
    {
      comment: moneyMovement?.comment || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!moneyMovement) return;

    try {
      await editMovement({
        id: moneyMovementId,
        data: {
          comment: form.values.comment!,
        },
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Комментарий успешно изменен`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании комментария`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  const isLoading = isLoadingService || isLoadingEdit;

  useEffect(() => {
    if (moneyMovement) {
      form.setValues({
        comment: moneyMovement.comment,
      });
    }
  }, [moneyMovement]);

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.editCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Textarea
          label="Комментарий"
          placeholder="Введите комментарий"
          name="comment"
          value={form.values.comment!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.comment)}
          errorMessage={form.fieldErrors.comment}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingEdit || !form.isValid}>
            Редактировать комментарий
          </Button>
        </div>
      </form>
    </div>
  );
};
