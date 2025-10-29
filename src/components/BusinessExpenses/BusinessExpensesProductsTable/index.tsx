import { BusinessExpenseBalanceTile } from "..";
import { AppsAddIcon } from "../../../assets/icons";
import { moneyFormat } from "../../../common/functions";
import { useHandlers } from "../../../common/hooks";
import { ProductExpenseItem } from "../../../common/types";
import Button from "../../ui/Button";
import { ClickLink } from "../../ui/ClickLink";
import { Table, Column } from "../../ui/Table";

import styles from "./BusinessExpensesProductsTable.module.css";

interface BusinessExpensesProductsTableProps {
  items: ProductExpenseItem[];
  title: string;
  total: number;
  totalPerMinute: number;
}

export const BusinessExpensesProductsTable = ({
  items,
  title,
  total,
  totalPerMinute,
}: BusinessExpensesProductsTableProps) => {
  const { handlePurchaseInvoiceAdd, handleProductCard } = useHandlers();

  const columns: Column<ProductExpenseItem>[] = [
    {
      key: "name",
      title: "Наименование",
      sort: true,
      render: (_, b) => (
        <ClickLink
          onClick={() => {
            handleProductCard(b.id);
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
      key: "quantity",
      title: "Количество",
      sort: true,
      width: 200,
      align: "right",
      render: (_, b) => `${b.quantity} ${b.unitStorage}`,
    },
    {
      key: "resourceQuantity",
      title: "Ресурс",
      sort: true,
      width: 200,
      align: "right",
      render: (_, b) => `${b.resourceQuantity} мин`,
    },

    {
      key: "amountPerMinute",
      title: "Стоимость на 1 минуту",
      sort: true,
      width: 200,
      align: "right",
      render: (_, b) => moneyFormat(b.amountPerMinute, 4),
    },
  ];

  return (
    <>
      <div className={styles.expensesHeader}>
        <h4>{title}</h4>
        <Button
          icon={<AppsAddIcon />}
          onClick={() => {
            handlePurchaseInvoiceAdd();
          }}
        >
          Создать накладную
        </Button>
      </div>
      <Table
        columns={columns}
        data={items ?? []}
        rowKey={(r) => r.id}
        pagination={false}
        search={false}
      />
      {items && (
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
      )}
    </>
  );
};
