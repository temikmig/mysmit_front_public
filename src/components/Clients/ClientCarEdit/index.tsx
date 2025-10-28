import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./ClientCarEdit.module.css";
import { useGetClientCarQuery, useEditClientCarMutation } from "../../../api";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { ApiError } from "../../../api/baseQuery";

interface ClientEditProps {
  carId: string;
  onSuccess: () => void;
}

export const ClientCarEdit = ({ carId, onSuccess }: ClientEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: car, isLoading: isLoadingCar } = useGetClientCarQuery(carId);

  const [editClientCar, { isLoading: isLoadingEdit }] =
    useEditClientCarMutation();

  const schema = yup.object({
    mark: yup.string().required("Укажите марку автомобиля"),
    model: yup.string().required("Укажите модель автомобиля"),
    year: yup.string().notRequired(),
    color: yup.string().notRequired(),
    number: yup.string().notRequired(),
  });

  const form = useForm(
    {
      mark: car?.mark || "",
      model: car?.model || "",
      year: car?.year || "",
      color: car?.color || "",
      number: car?.number || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!car) return;

    try {
      await editClientCar({
        id: carId,
        data: {
          mark: form.values.mark!,
          model: form.values.model!,
          year: form.values.year || "",
          color: form.values.color || "",
          number: form.values.number || "",
        },
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Информация об автомобиле успешно изменена`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании автомобиля`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  const isLoading = isLoadingCar || isLoadingEdit;

  useEffect(() => {
    if (car) {
      form.setValues({
        mark: car.mark,
        model: car.model,
        year: car.year,
        color: car.color,
        number: car.number,
      });
    }
  }, [car]);

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.clientCarAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <div className={styles.oneLineCont}>
          <div style={{ width: "40%" }}>
            <Input
              label="Марка"
              placeholder="Skoda"
              name="mark"
              value={form.values.mark!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.mark)}
              errorMessage={form.fieldErrors.mark}
            />
          </div>
          <div style={{ width: "40%" }}>
            <Input
              label="Модель"
              name="model"
              placeholder="Rapid"
              value={form.values.model!}
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
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Редактировать автомобиль
          </Button>
        </div>
      </form>
    </div>
  );
};
