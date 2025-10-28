import * as yup from "yup";
import {
  useGetChecklistQuery,
  useInvalidChecklistMutation,
} from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ChecklistInvalid.module.css";
import { useForm } from "../../../common/hooks";
import { Textarea } from "../../ui/Textarea";

interface ChecklistInvalidProps {
  checklistId: string;
  onSuccess: () => void;
}

export const ChecklistInvalid = ({
  checklistId,
  onSuccess,
}: ChecklistInvalidProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: checklist, isLoading } = useGetChecklistQuery(checklistId);

  const [invalidChecklist, { isLoading: isLoadingCancel }] =
    useInvalidChecklistMutation();

  const schema = yup.object({
    comment: yup.string().required("Укажите комментарий"),
  });

  const form = useForm(
    {
      comment: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checklist) return;

    await invalidChecklist({
      id: checklistId,
      data: {
        comment: form.values.comment || "",
      },
    })
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Чек-лист успешно аннулирован. Данные по товарам и средствам возвращены к исходным`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Чек-лист не может быть аннулирован`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (checklist)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите аннулировать чек-лист?
        </p>
        <p className="text_medium">
          Средства будут возвращены, ресурсы и количество товаров из данного
          чек-листа будут возвращены к значениям до списания
        </p>
        <Textarea
          label="Комментарий"
          placeholder="Укажите комментарий"
          name="comment"
          value={form.values.comment!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.comment)}
          errorMessage={form.fieldErrors.comment}
          style={{ maxHeight: 200 }}
        />
        <div className={styles.buttonsCont}>
          <Button variant="secondary" onClick={onSuccess}>
            Отмена
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!form.isValid || isLoadingCancel}
          >
            Аннулировать чек-лист
          </Button>
        </div>
        <LoaderBlur isLoading={isLoadingCancel} />
      </div>
    );
};
