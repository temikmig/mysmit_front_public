import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./ClientAdd.module.css";
import { useAddClientMutation } from "../../../api";
import PhoneInput from "../../ui/PhoneInput";
import { ApiError } from "../../../api/baseQuery";
import { ClientSourceSelector } from "../../Selectors";
import { PlusMinIcon } from "../../../assets/icons";
import { useHandlers } from "../../../common/hooks";
import { Select } from "../../ui/Select";
import {
  CLIENT_SEX_LABELS,
  ClientSex,
  LOYALTY_CARD_LEVEL_LABELS,
  LoyaltyСardLevel,
} from "../../../common/types";
import { DatePicker } from "../../ui/DatePicker";

interface ClientAddProps {
  onSuccess: () => void;
  inputValue?: string;
}

export const ClientAdd = ({ onSuccess, inputValue }: ClientAddProps) => {
  const { showSnackbar } = useSnackbar();

  const { handleClientSourceAdd } = useHandlers();

  const [addClient, { isLoading }] = useAddClientMutation();

  const schema = yup.object({
    firstName: yup.string().required("Укажите имя клиента"),
    lastName: yup.string().required("Укажите фамилию клиента"),
    phone: yup.string().required("Укажите телефон клиента"),
    sex: yup.string().notRequired(),
    birthday: yup.date().notRequired(),
    loyaltyСardNum: yup.string().notRequired(),
    loyaltyСardLevel: yup.string().notRequired(),
    mark: yup.string().required("Укажите марку автомобиля"),
    model: yup.string().required("Укажите модель автомобиля"),
    year: yup.string().notRequired(),
    color: yup.string().notRequired(),
    number: yup.string().notRequired(),
    sourceId: yup.string().notRequired(),
  });

  const form = useForm(
    {
      firstName: inputValue ? inputValue : "",
      lastName: "",
      phone: "",
      birthday: null,
      sex: "",
      loyaltyСardNum: "",
      loyaltyСardLevel: "",
      mark: "",
      model: "",
      year: "",
      color: "",
      number: "",
      sourceId: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addClient({
        firstName: form.values.firstName!,
        lastName: form.values.lastName!,
        phone: form.values.phone!,
        sex: (form.values.sex as ClientSex) || null,
        loyaltyСardNum: form.values.loyaltyСardNum || "",
        loyaltyСardLevel:
          (form.values.loyaltyСardLevel as LoyaltyСardLevel) || null,
        sourceId: form.values.sourceId || undefined,
        birthday: form.values.birthday
          ? form.values.birthday.toISOString()
          : null,
        cars: [
          {
            mark: form.values.mark!,
            model: form.values.model!,
            year: form.values.year || "",
            color: form.values.color || "",
            number: form.values.number || "",
          },
        ],
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Клиент ${form.values.firstName} ${form.values.lastName} успешно добавлен`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
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

  return (
    <div className={styles.clientAddCont}>
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
        <div className={styles.oneLineCont}>
          <div style={{ width: "40%" }}>
            <Input
              label="Марка автомобиля"
              name="mark"
              placeholder="Skoda"
              value={form.values.mark || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.mark)}
              errorMessage={form.fieldErrors.mark}
            />
          </div>
          <div style={{ width: "40%" }}>
            <Input
              label="Модель автомобиля"
              name="model"
              placeholder="Rapid"
              value={form.values.model || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.model)}
              errorMessage={form.fieldErrors.model}
            />
          </div>
          <div style={{ width: "20%" }}>
            <Input
              label="Год"
              name="year"
              placeholder="2019"
              value={form.values.year || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.year)}
              errorMessage={form.fieldErrors.year}
            />
          </div>
        </div>
        <div className={styles.oneLineCont}>
          <div style={{ width: "50%" }}>
            <Input
              label="Цвет автомобиля"
              name="color"
              placeholder="Синий"
              value={form.values.color || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.color)}
              errorMessage={form.fieldErrors.color}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Input
              label="Госномер автомобиля"
              name="number"
              placeholder="Например, `А000АА72`"
              value={form.values.number || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.number)}
              errorMessage={form.fieldErrors.number}
            />
          </div>
        </div>
        <ClientSourceSelector
          label="Источник клиента"
          value={form.values.sourceId!}
          onChange={(val) => form.setFieldValue("sourceId", String(val))}
          actions={[
            {
              label: "Добавить источник",
              icon: <PlusMinIcon />,
              onClick: (currentInput) =>
                handleClientSourceAdd(undefined, currentInput as string),
            },
          ]}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Добавить клиента
          </Button>
        </div>
      </form>
    </div>
  );
};
