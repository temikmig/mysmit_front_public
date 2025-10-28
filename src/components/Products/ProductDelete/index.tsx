import { useDeleteProductMutation, useGetProductQuery } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ProductDelete.module.css";

interface ProductDeleteProps {
  productId: number;
  onSuccess: () => void;
}

export const ProductDelete = ({ productId, onSuccess }: ProductDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: product, isLoading } = useGetProductQuery(productId);

  const [deleteProduct, { isLoading: isLoadingDelete }] =
    useDeleteProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    await deleteProduct(productId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Товар ${product.name} успешно удален`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Товар ${product.name} не может быть удален`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (product)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить товар {product.name}?
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
