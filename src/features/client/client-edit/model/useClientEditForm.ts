import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Client, ClientEditDto } from "@entities/client";

import { clientEditSchema } from "./validation";

export const useClientEditForm = (client: Client) => {
  const form = useForm<ClientEditDto>({
    mode: "onChange",
    resolver: yupResolver(clientEditSchema),
    defaultValues: {
      firstName: client.firstName,
      lastName: client.lastName,
      birthday: client.birthday ? new Date(client.birthday) : null,
      phone: client.phone,
      sex: client.sex,
      loyaltyСardLevel: client.loyaltyСardLevel,
      loyaltyСardNum: client.loyaltyСardNum,
      clientSourceId: client.clientSourceId,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
