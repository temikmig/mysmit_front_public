import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Car, ClientCarEditDto } from "@entities/client";

import { clientCarEditSchema } from "./validation";

export const useClientCarEditForm = (clientCar: Car) => {
  const form = useForm<ClientCarEditDto>({
    mode: "onChange",
    resolver: yupResolver(clientCarEditSchema),
    defaultValues: {
      mark: clientCar.mark,
      model: clientCar.model,
      color: clientCar.color,
      number: clientCar.number,
      year: clientCar.year,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
