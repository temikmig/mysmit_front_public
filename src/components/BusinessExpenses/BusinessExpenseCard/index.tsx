import { useGetBusinessExpenseByIdQuery } from "../../../api";
import { EditIcon } from "../../../assets/icons";
import { moneyFormat } from "../../../common/functions";
import { useHandlers } from "../../../common/hooks";
import { EXPENSE_PERIOD_LABELS } from "../../../common/types";
import Button from "../../ui/Button";
import { DataGrid, DataGridItem } from "../../ui/DataGrid";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./BusinessExpenseCard.module.css";

interface BusinessExpenseCardProps {
  businessExpenseId: string;
}

export const BusinessExpenseCard = ({
  businessExpenseId,
}: BusinessExpenseCardProps) => {
  const { data: businessExpense, isLoading } =
    useGetBusinessExpenseByIdQuery(businessExpenseId);

  const { handleBusinessExpenseEdit } = useHandlers();

  const dataItems: DataGridItem[] =
    (businessExpense && [
      {
        title: "Наименование",
        description: `${businessExpense.name}`,
      },
      {
        title: "Стоимость",
        description: `${moneyFormat(
          businessExpense.amount,
          4
        )} в ${EXPENSE_PERIOD_LABELS[businessExpense.period].toLowerCase()}`,
      },
      {
        title: "Комментарий",
        description: businessExpense.note,
      },
    ]) ||
    [];

  if (isLoading) return <LoaderPage />;

  if (businessExpense)
    return (
      <div className={styles.businessExpenseCardCont}>
        <h4>Карточка статьи бизнес-затрат</h4>
        <DataGrid items={dataItems} />
        <div className={styles.buttonsCont}>
          <Button
            icon={<EditIcon />}
            onClick={() => {
              handleBusinessExpenseEdit(businessExpenseId);
            }}
          >
            Редактировать статью
          </Button>
        </div>
      </div>
    );
};
