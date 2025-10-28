import * as yup from "yup";
import {
  useAddBusinessPercentagesMutation,
  useGetBusinessPercentagesQuery,
} from "../../../api";
import { EditIcon, PercentIcon } from "../../../assets/icons";

import Button from "../../ui/Button";
import Input from "../../ui/Input";

import LoaderPage from "../../ui/LoaderPage";

import styles from "./BusinessPercentagesCard.module.css";
import { useForm, useSnackbar } from "../../../common/hooks";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { useEffect } from "react";

interface BusinessPercentagesCardProps {
  onCloseModal: () => void;
}

export const BusinessPercentagesCard = ({
  onCloseModal,
}: BusinessPercentagesCardProps) => {
  const { showSnackbar } = useSnackbar();

  const { data, isLoading } = useGetBusinessPercentagesQuery();

  const [addPercentsges, { isLoading: isLoadingCreate }] =
    useAddBusinessPercentagesMutation();

  const schema = yup.object({
    businessGrowth: yup
      .number()
      .required("Укажите процент на развитие бизнеса"),
    financialReserve: yup
      .number()
      .required("Укажите процент на финансовый резерв"),
    cardAcquiring: yup
      .number()
      .required("Укажите процент на эквайринг по карте"),
    qrAcquiring: yup.number().required("Укажите процент на эквайринг по QR"),
  });

  const form = useForm(
    {
      businessGrowth: 0,
      financialReserve: 0,
      cardAcquiring: 0,
      qrAcquiring: 0,
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addPercentsges({
        businessGrowth: form.values.businessGrowth!,
        financialReserve: form.values.financialReserve!,
        cardAcquiring: form.values.cardAcquiring!,
        qrAcquiring: form.values.qrAcquiring!,
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Постоянные успешно обновлены`,
        mode: "success",
      });

      form.resetForm();
      onCloseModal();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при добавлении клиента`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  useEffect(() => {
    if (data) {
      form.setValues({
        businessGrowth: data.businessGrowth * 100,
        financialReserve: data.financialReserve * 100,
        cardAcquiring: data.cardAcquiring * 100,
        qrAcquiring: data.qrAcquiring * 100,
      });
    }
  }, [data]);

  if (isLoading) return <LoaderPage />;

  if (data)
    return (
      <div className={styles.cont}>
        <h4>Постоянные</h4>
        <div className={styles.oneLineCont}>
          <div style={{ width: "25%" }}>
            <Input
              label="Развитие бизнеса"
              name="businessGrowth"
              type="number"
              min={0}
              max={100}
              value={form.values.businessGrowth!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.businessGrowth)}
              errorMessage={form.fieldErrors.businessGrowth}
              rightIcon={<PercentIcon />}
            />
          </div>
          <div style={{ width: "25%" }}>
            <Input
              label="Финансовый резерв"
              name="financialReserve"
              type="number"
              min={0}
              max={100}
              value={form.values.financialReserve!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.financialReserve)}
              errorMessage={form.fieldErrors.financialReserve}
              rightIcon={<PercentIcon />}
            />
          </div>
          <div style={{ width: "25%" }}>
            <Input
              label="Эквайринг карта"
              name="cardAcquiring"
              type="number"
              min={0}
              max={100}
              value={form.values.cardAcquiring!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.cardAcquiring)}
              errorMessage={form.fieldErrors.cardAcquiring}
              rightIcon={<PercentIcon />}
            />
          </div>
          <div style={{ width: "25%" }}>
            <Input
              label="Эквайринг QR"
              name="qrAcquiring"
              type="number"
              min={0}
              max={100}
              value={form.values.qrAcquiring!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.qrAcquiring)}
              errorMessage={form.fieldErrors.qrAcquiring}
              rightIcon={<PercentIcon />}
            />
          </div>
        </div>
        <div className={styles.buttonsCont}>
          <Button icon={<EditIcon />} onClick={handleSubmit}>
            Редактировать постоянные
          </Button>
        </div>
        <LoaderBlur isLoading={isLoadingCreate} />
      </div>
    );
};
