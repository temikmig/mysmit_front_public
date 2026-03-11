import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ClientCreateDto } from "@entities/client";

import { clientCreateSchema } from "./validation";

export const useClientCreateForm = (initial?: Partial<ClientCreateDto>) => {
  const form = useForm<ClientCreateDto>({
    mode: "all",
    resolver: yupResolver(clientCreateSchema),
    defaultValues: {
      firstName: initial?.firstName || "",
      lastName: initial?.lastName || null,
      birthday: null,
      phone: initial?.phone || "",
      sex: null,
      loyaltyСardLevel: null,
      loyaltyСardNum: null,
      carMark: "",
      carModel: "",
      carYear: null,
      carColor: null,
      carNumber: null,
      clientSourceId: null,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
