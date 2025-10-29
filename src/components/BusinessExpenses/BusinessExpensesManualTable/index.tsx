import { AppsAddIcon } from "../../../assets/icons";
import { moneyFormat } from "../../../common/functions";
import { useHandlers } from "../../../common/hooks";
import { ManualExpenseItem } from "../../../common/types";
import Button from "../../ui/Button";
import { Table, Column } from "../../ui/Table";
import { BusinessExpenseBalanceTile, BusinessExpensesActions } from "..";

import styles from "./BusinessExpensesManualTable.module.css";
import { ClickLink } from "../../ui/ClickLink";

interface BusinessExpensesManualTableProps {
  items: ManualExpenseItem[];
  total: number;
  totalPerMinute: number;
}

export const BusinessExpensesManualTable = ({
  items,
  total,
  totalPerMinute,
}: BusinessExpensesManualTableProps) => {
  const { handleBusinessExpenseAdd, handleBusinessExpenseCard } = useHandlers();

  const columns: Column<ManualExpenseItem>[] = [
    {
      key: "name",
      title: "Наименование",
      sort: true,
      render: (_, b) => (
        <ClickLink
          onClick={() => {
            handleBusinessExpenseCard(b.id);
          }}
        >
          {b.name}
        </ClickLink>
      ),
    },
    {
      key: "amount",
      title: "Стоимость",
      sort: true,
      width: 200,
      align: "right",
      render: (_, b) => moneyFormat(b.amount, 4),
    },
    {
      key: "amountPerMinute",
      title: "Стоимость на 1 минуту",
      sort: true,
      width: 200,
      align: "right",
      render: (_, b) => moneyFormat(b.amountPerMinute, 4),
    },
    {
      key: "note",
      title: "Комментарий",
      sort: true,
      width: 300,
      render: (_, b) => b.note,
    },
    {
      key: "actions",
      width: 96,
      render: (_, b) => <BusinessExpensesActions businessExpense={b} />,
    },
  ];

  return (
    <>
      <div className={styles.expensesHeader}>
        <h4>Основные затраты</h4>
        <Button
          icon={<AppsAddIcon />}
          onClick={() => {
            handleBusinessExpenseAdd();
          }}
        >
          Создать статью
        </Button>
      </div>
      <Table
        columns={columns}
        data={items ?? []}
        rowKey={(r) => r.id}
        pagination={false}
        search={false}
      />
      <div className={styles.expensesBalanceCont}>
        <div className={styles.expensesBalance}>
          <BusinessExpenseBalanceTile
            title="Общая"
            balance={total}
            color="blue"
          />
          <BusinessExpenseBalanceTile
            title="За минуту"
            balance={totalPerMinute}
            color="blue"
          />
        </div>
      </div>
    </>
  );
};
