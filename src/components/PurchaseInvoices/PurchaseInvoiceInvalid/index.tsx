import * as yup from "yup";
import {
  useInvalidPurchaseInvoiceMutation,
  useGetPurchaseInvoiceQuery,
} from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./PurchaseInvoiceInvalid.module.css";
import { useForm } from "../../../common/hooks";
import { Textarea } from "../../ui/Textarea";

interface PurchaseInvoiceInvalidProps {
  purchaseInvoiceId: string;
  onSuccess: () => void;
}

export const PurchaseInvoiceInvalid = ({
  purchaseInvoiceId,
  onSuccess,
}: PurchaseInvoiceInvalidProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: purchaseInvoice, isLoading } =
    useGetPurchaseInvoiceQuery(purchaseInvoiceId);

  const [invalidPurchase, { isLoading: isLoadingCancel }] =
    useInvalidPurchaseInvoiceMutation();

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

    if (!purchaseInvoice) return;

    await invalidPurchase({
      id: purchaseInvoiceId,
      data: {
        comment: form.values.comment || "",
      },
    })
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Накладная успешно аннулирована. Данные по товарам возвращены к исходным`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Накладная не может быть аннулирована`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (purchaseInvoice)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите аннулировать накладную?
        </p>
        <p className="text_medium">
          Средства будут возвращены, ресурсы и количество товаров из данной
          накладой будут возвращены к значениям до поставки
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
            Аннулировать накладную
          </Button>
        </div>
        <LoaderBlur isLoading={isLoadingCancel} />
      </div>
    );
};
