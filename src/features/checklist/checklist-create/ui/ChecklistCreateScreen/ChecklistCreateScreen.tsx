import { MobilePaper } from "@shared/ui";

import { ChecklistCreateForm } from "../ChecklistCreateForm";

export const ChecklistCreateScreen = ({}) => {
  return (
    <MobilePaper title="Создать чек-лист">
      <ChecklistCreateForm />
    </MobilePaper>
  );
};
