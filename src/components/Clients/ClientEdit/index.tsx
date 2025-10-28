import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./ClientEdit.module.css";
import { useEditClientMutation, useGetClientQuery } from "../../../api";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { ApiError } from "../../../api/baseQuery";
import PhoneInput from "../../ui/PhoneInput";
import {
  CLIENT_SEX_LABELS,
  ClientSex,
  LOYALTY_CARD_LEVEL_LABELS,
  LoyaltyСardLevel,
} from "../../../common/types";
import { Select } from "../../ui/Select";
import { ClientSourceSelector } from "../../Selectors";
import { PlusMinIcon } from "../../../assets/icons";
import { useHandlers } from "../../../common/hooks";
import { DatePicker } from "../../ui/DatePicker";

interface ClientEditProps {
  clientId: string;
  onSuccess: () => void;
}

export const ClientEdit = ({ clientId, onSuccess }: ClientEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { handleClientSourceAdd } = useHandlers();

  const { data: client, isLoading: isLoadingClient } =
    useGetClientQuery(clientId);

  const [editClient, { isLoading: isLoadingEdit }] = useEditClientMutation();

  const schema = yup.object({
    firstName: yup.string().required("Укажите имя клиента"),
    lastName: yup.string().required("Укажите фамилию клиента"),
    phone: yup.string().required("Укажите телефон клиента"),
    sex: yup.string().notRequired(),
    birthday: yup.date().notRequired(),
    loyaltyСardNum: yup.string().notRequired(),
    loyaltyСardLevel: yup.string().notRequired(),
    sourceId: yup.string().notRequired(),
  });

  const form = useForm(
    {
      firstName: client?.firstName || "",
      lastName: client?.lastName || "",
      phone: client?.phone || "",
      sex: client?.sex || "",
      birthday: client?.birthday ? new Date(client.birthday) : new Date(),
      loyaltyСardNum: client?.loyaltyСardNum || "",
      loyaltyСardLevel: client?.loyaltyСardLevel || "",
      sourceId: client?.sourceId || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!client) return;

    try {
      await editClient({
        id: client.id,
        data: {
          firstName: form.values.firstName!,
          lastName: form.values.lastName!,
          phone: form.values.phone!,
          sex: (form.values.sex as ClientSex) || null,
          birthday: form.values.birthday
            ? form.values.birthday.toISOString()
            : null,
          loyaltyСardNum: form.values.loyaltyСardNum || "",
          loyaltyСardLevel:
            (form.values.loyaltyСardLevel as LoyaltyСardLevel) || null,
          sourceId: form.values.sourceId || undefined,
        },
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Информация о клиенте успешно изменена`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании клиента`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  const isLoading = isLoadingClient || isLoadingEdit;

  useEffect(() => {
    if (client) {
      form.setValues({
        firstName: client.firstName,
        lastName: client.lastName,
        phone: client.phone,
        sex: client.sex,
        birthday: client.birthday ? new Date(client.birthday) : null,
        loyaltyСardNum: client.loyaltyСardNum,
        loyaltyСardLevel: client.loyaltyСardLevel,
        sourceId: client.sourceId,
      });
    }
  }, [client]);

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.serviceAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <div className={styles.oneLineCont}>
          <div style={{ width: "35%" }}>
            <Input
              label="Имя"
              placeholder="Имя клиента"
              name="firstName"
              value={form.values.firstName!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.firstName)}
              errorMessage={form.fieldErrors.firstName}
            />
          </div>
          <div style={{ width: "35%" }}>
            <Input
              label="Фамилия"
              placeholder="Фамилия клиента"
              name="lastName"
              value={form.values.lastName!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.lastName)}
              errorMessage={form.fieldErrors.lastName}
            />
          </div>
          <div style={{ width: "30%" }}>
            <DatePicker
              value={form.values.birthday}
              onChange={(date) => form.setFieldValue("birthday", date)}
              label="Дата рождения"
              error={Boolean(form.fieldErrors.birthday)}
              errorMessage={form.fieldErrors.birthday}
            />
          </div>
        </div>
        <div className={styles.oneLineCont}>
          <div style={{ width: "50%" }}>
            <PhoneInput
              label="Номер телефона"
              name="phone"
              placeholder="Укажите телефон клиента"
              value={form.values.phone!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.phone)}
              errorMessage={form.fieldErrors.phone}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Select
              label="Пол"
              value={form.values.sex || ""}
              options={Object.entries(CLIENT_SEX_LABELS).map(
                ([key, label]) => ({
                  value: key,
                  label,
                })
              )}
              onChange={(val) => form.setFieldValue("sex", val as ClientSex)}
              error={Boolean(form.fieldErrors.sex)}
              errorMessage={form.fieldErrors.sex}
            />
          </div>
        </div>
        <div className={styles.oneLineCont}>
          <div style={{ width: "50%" }}>
            <Select
              label="Карта лояльности"
              value={form.values.loyaltyСardLevel || ""}
              options={[
                { value: "", label: "Отсутствует" },
                ...Object.entries(LOYALTY_CARD_LEVEL_LABELS).map(
                  ([key, label]) => ({
                    value: key,
                    label,
                  })
                ),
              ]}
              onChange={(val) =>
                form.setFieldValue("loyaltyСardLevel", val as ClientSex)
              }
              error={Boolean(form.fieldErrors.loyaltyСardLevel)}
              errorMessage={form.fieldErrors.loyaltyСardLevel}
            />
          </div>
          <div style={{ width: "50%" }}>
            {form.values.loyaltyСardLevel && (
              <Input
                label="Номер карты лояльности"
                name="loyaltyСardNum"
                placeholder="Укажите номер карты"
                value={form.values.loyaltyСardNum || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={Boolean(form.fieldErrors.loyaltyСardNum)}
                errorMessage={form.fieldErrors.loyaltyСardNum}
              />
            )}
          </div>
        </div>
        <ClientSourceSelector
          label="Источник клиента"
          value={form.values.sourceId || ""}
          onChange={(val) => form.setFieldValue("sourceId", String(val))}
          actions={[
            {
              label: "Добавить источник",
              icon: <PlusMinIcon />,
              onClick: (currentInput) =>
                handleClientSourceAdd(undefined, currentInput as string),
            },
          ]}
          valueLabel={client?.source?.name || undefined}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingEdit || !form.isValid}>
            Редактировать клиента
          </Button>
        </div>
      </form>
    </div>
  );
};
