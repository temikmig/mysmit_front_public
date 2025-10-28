import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./FundEdit.module.css";
import { useEditFundMutation, useGetFundQuery } from "../../../api";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { ApiError } from "../../../api/baseQuery";

interface FundEditProps {
  fundId: string;
  onSuccess: () => void;
}

export const FundEdit = ({ fundId, onSuccess }: FundEditProps) => {
  const { showSnackbar } = useSnackbar();

  const [editFund, { isLoading: isLoadingEdit }] = useEditFundMutation();

  const { data: fund, isLoading: isLoadingFund } = useGetFundQuery(fundId);

  const schema = yup.object({
    name: yup.string().required(`Укажите наименование фонда`),
  });

  const form = useForm(
    {
      name: fund?.name || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await editFund({
        id: fundId,
        name: form.values.name!,
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Фонд успешно отредактирован`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании фонда`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  useEffect(() => {
    if (fund) {
      form.setValues({
        name: fund.name,
      });
    }
  }, [fund]);

  if (isLoadingEdit || isLoadingFund) return <LoaderPage />;

  return (
    <div className={styles.clientAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label={`Наименование фонда`}
          placeholder={`Укажите наименование фонда`}
          name="name"
          value={form.values.name!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.name)}
          errorMessage={form.fieldErrors.name}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingEdit || !form.isValid}>
            Редактировать фонд
          </Button>
        </div>
      </form>
    </div>
  );
};
