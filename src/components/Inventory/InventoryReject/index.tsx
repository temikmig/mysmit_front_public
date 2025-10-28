import * as yup from "yup";
import { useGetInventoryQuery, useRejectInventoryMutation } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";
import { Textarea } from "../../ui/Textarea";

import styles from "./InventoryReject.module.css";
import { useForm } from "../../../common/hooks";

interface InventoryRejectProps {
  inventoryId: string;
  onSuccess: () => void;
}

export const InventoryReject = ({
  inventoryId,
  onSuccess,
}: InventoryRejectProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: inventory, isLoading } = useGetInventoryQuery(inventoryId);

  const [rejectInventory, { isLoading: isLoadingReject }] =
    useRejectInventoryMutation();

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

    if (!inventory) return;

    await rejectInventory({ id: inventoryId, comment: form.values.comment! })
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Инвернтаризация успешно отклонена`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Инвентаризация не может быть отклонена`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (inventory)
    return (
      <div className={styles.cont}>
        <h4>Отклонить инвентаризацию</h4>
        <Textarea
          label="Комментарий"
          placeholder="Укажите комментарий/причину"
          value={form.values.comment!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          name="comment"
          error={!!form.fieldErrors.comment}
          errorMessage={form.fieldErrors.comment}
          style={{ maxHeight: 150 }}
        />
        <div className={styles.buttonsCont}>
          <Button variant="secondary" onClick={onSuccess}>
            Отмена
          </Button>

          <Button onClick={handleSubmit} disabled={isLoadingReject}>
            Отклонить
          </Button>
        </div>
        <LoaderBlur isLoading={isLoadingReject} />
      </div>
    );
};
