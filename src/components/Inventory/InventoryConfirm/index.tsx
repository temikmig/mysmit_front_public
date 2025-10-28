import {
  useConfirmInventoryMutation,
  useGetInventoryQuery,
} from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./InventoryConfirm.module.css";

interface InventoryConfirmProps {
  inventoryId: string;
  onSuccess: () => void;
}

export const InventoryConfirm = ({
  inventoryId,
  onSuccess,
}: InventoryConfirmProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: inventory, isLoading } = useGetInventoryQuery(inventoryId);

  const [confirmInventory, { isLoading: isLoadingDelete }] =
    useConfirmInventoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inventory) return;

    await confirmInventory({ id: inventoryId })
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Инвернтаризация успешно подтверждена`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Инвентаризация не может быть подтверждена`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (inventory)
    return (
      <div className={styles.cont}>
        <h4>Подтвердить инвентаризацию</h4>
        <p className="text_medium">
          Вы действительно хотите подтвердить данную инвентаризацию?
        </p>
        <div className={styles.buttonsCont}>
          <Button variant="secondary" onClick={onSuccess}>
            Отмена
          </Button>

          <Button onClick={handleSubmit} disabled={isLoadingDelete}>
            Подтвердить
          </Button>
        </div>
        <LoaderBlur isLoading={isLoadingDelete} />
      </div>
    );
};
