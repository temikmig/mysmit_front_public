import { useDeleteSupplierMutation, useGetSupplierQuery } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./SupplierDelete.module.css";

interface SupplierDeleteProps {
  supplierId: number;
  onSuccess: () => void;
}

export const SupplierDelete = ({
  supplierId,
  onSuccess,
}: SupplierDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: supplier, isLoading } = useGetSupplierQuery(supplierId);

  const [deleteSupplier, { isLoading: isLoadingDelete }] =
    useDeleteSupplierMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supplier) return;

    await deleteSupplier(supplierId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Поставщик ${supplier.name} успешно удален`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Поставщик ${supplier.name} не может быть удален`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (supplier)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить поставщика "{supplier.name}"?
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
