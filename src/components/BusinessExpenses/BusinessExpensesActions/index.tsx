import {
  useActivateBusinessExpenseMutation,
  useDeactivateBusinessExpenseMutation,
} from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import {
  BadgeIcon,
  EditIcon,
  DeleteIcon,
  PowerIcon,
} from "../../../assets/icons";
import { useSnackbar, useHandlers } from "../../../common/hooks";
import { ManualExpenseItem } from "../../../common/types";
import { TableActionsCont, TableAction } from "../../ui/TableActions";

interface BusinessExpensesActionsProps {
  businessExpense: ManualExpenseItem;
}

export const BusinessExpensesActions = ({
  businessExpense,
}: BusinessExpensesActionsProps) => {
  const { showSnackbar } = useSnackbar();
  const {
    handleBusinessExpenseEdit,
    handleBusinessExpenseDelete,
    handleBusinessExpenseCard,
  } = useHandlers();

  const [toActivate] = useActivateBusinessExpenseMutation();
  const [toDectivate] = useDeactivateBusinessExpenseMutation();

  const handleMutation = async (
    mutation: (id: string) => { unwrap: () => Promise<unknown> },
    successMsg: string,
    errorMsg: string
  ) => {
    if (!businessExpense) return;
    try {
      await mutation(businessExpense.id).unwrap();
      showSnackbar({
        title: "Сообщение",
        message: successMsg.replace("{name}", businessExpense.name),
        mode: "success",
      });
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: errorMsg.replace("{name}", businessExpense.name),
        addMessage: error.data?.msg,
        mode: "error",
      });
    }
  };

  const handleToActivateBusinessExpense = () =>
    handleMutation(
      toActivate,
      "Статья {name} успешно активирована",
      "Статья {name} не может быть активирована"
    );

  const handleToDeactivateBusinessExpense = () =>
    handleMutation(
      toDectivate,
      "Статья {name} успешно деактивирована",
      "Статья {name} не может быть деактивирована"
    );

  const actions = [
    {
      tooltip: "Карточка",
      icon: <BadgeIcon />,
      onClick: () => handleBusinessExpenseCard(businessExpense.id),
    },
    {
      tooltip: "Редактировать",
      icon: <EditIcon />,
      onClick: () => handleBusinessExpenseEdit(businessExpense.id),
    },

    businessExpense.isActive
      ? {
          tooltip: "Деактивировать",
          icon: <PowerIcon color="var(--icons-green)" />,
          onClick: handleToDeactivateBusinessExpense,
        }
      : {
          tooltip: "Активировать",
          icon: <PowerIcon color="var(--icons-red)" />,
          onClick: handleToActivateBusinessExpense,
        },
    {
      tooltip: "Удалить",
      icon: <DeleteIcon />,
      onClick: () => handleBusinessExpenseDelete(businessExpense.id),
    },
  ];

  return (
    <TableActionsCont>
      {actions.map((a, i) => (
        <TableAction key={i} {...a} />
      ))}
    </TableActionsCont>
  );
};
