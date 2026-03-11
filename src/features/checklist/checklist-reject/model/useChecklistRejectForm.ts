import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ChecklistRejectDto } from "@entities/checklist";

import { checklistRejectSchema } from "./validation";

export const useChecklistRejectForm = () => {
  const form = useForm<ChecklistRejectDto>({
    mode: "onChange",
    resolver: yupResolver(checklistRejectSchema),
    defaultValues: {
      rejectedComment: undefined,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
