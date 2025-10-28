import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useTransferProductsReserveMutation } from "../../../api";
import { RubleIcon } from "../../../assets/icons";
import { Textarea } from "../../ui/Textarea";

import styles from "./ProductTransferReserve.module.css";
import { ProductSelector } from "../../Selectors";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";

interface ProductTransferReserveProps {
  productId: number;
  onSuccess?: () => void;
}

export const ProductTransferReserve = ({
  productId,
  onSuccess,
}: ProductTransferReserveProps) => {
  const { showSnackbar } = useSnackbar();
  const [createMovement, { isLoading: isLoadingCreate }] =
    useTransferProductsReserveMutation();

  const schema = yup.object({
    amount: yup
      .number()
      .typeError("Введите корректную сумму")
      .positive("Сумма должна быть положительной")
      .required("Сумма обязательна"),
    toProductId: yup.number().required("Укажите товар"),
    comment: yup.string().required("Укажите комментарий"),
  });

  const form = useForm(
    {
      amount: 0,
      toProductId: 0,
      comment: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMovement({
        fromProductId: productId,
        amount: form.values.amount!,
        toProductId: form.values.toProductId!,
        comment: form.values.comment || "",
      }).unwrap();
      showSnackbar({
        title: "Успех",
        message: `Резерв успешно перемещен`,
        mode: "success",
      });
      form.resetForm();
      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Не удалось переместить резерв`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.oneLineCont}>
          <div style={{ width: "50%" }}>
            <ProductSelector
              label="Переместить на товар"
              value={form.values.toProductId || null}
              onChange={(val) => form.setFieldValue("toProductId", val)}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Input
              name="amount"
              label="Сумма"
              type="number"
              value={form.values.amount!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={!!form.fieldErrors.amount}
              errorMessage={form.fieldErrors.amount}
              rightIcon={<RubleIcon />}
            />
          </div>
        </div>
        <Textarea
          label="Комментарий"
          placeholder="Укажите назначение или комментарий"
          value={form.values.comment!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          name="comment"
          error={!!form.fieldErrors.comment}
          errorMessage={form.fieldErrors.comment}
          style={{ maxHeight: 150 }}
        />

        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingCreate || !form.isValid}>
            Переместить деньги
          </Button>
        </div>
      </div>
      <LoaderBlur isLoading={isLoadingCreate} />
    </form>
  );
};
