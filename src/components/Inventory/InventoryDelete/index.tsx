import { useDeleteInventoryMutation, useGetInventoryQuery } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./InventoryDelete.module.css";

interface InventoryDeleteProps {
  inventoryId: string;
  onSuccess: () => void;
}

export const InventoryDelete = ({
  inventoryId,
  onSuccess,
}: InventoryDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: inventory, isLoading } = useGetInventoryQuery(inventoryId);

  const [deleteInventory, { isLoading: isLoadingDelete }] =
    useDeleteInventoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inventory) return;

    await deleteInventory({ id: inventoryId })
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Инвернтаризация успешно удалена`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Инвентаризация не может быть удалена`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (inventory)
    return (
      <div className={styles.cont}>
        <h4>Подтвердите удаление</h4>
        <p className="text_medium">
          Вы действительно хотите удалить данную инвентаризацию?
        </p>
        <div className={styles.buttonsCont}>
          <Button variant="secondary" onClick={onSuccess}>
            Отмена
          </Button>

          <Button onClick={handleSubmit} disabled={isLoadingDelete}>
            Удалить
          </Button>
        </div>
      </div>
    );
};
