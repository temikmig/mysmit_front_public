import { useGetAllBusinessExpensesQuery } from "../../api/businessExpensesApi";
import { BalanceTile } from "../../components/Balances";
import {
  BusinessExpensesManualTable,
  BusinessExpensesProductsTable,
} from "../../components/BusinessExpenses";

import LoaderPage from "../../components/ui/LoaderPage";

import styles from "./BusinessExpensesPage.module.css";

export const BusinessExpensesPage = () => {
  const { data, isLoading, refetch } = useGetAllBusinessExpensesQuery();

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.businessExpensesCont}>
      {data && (
        <>
          <div className={styles.totalCont}>
            <BalanceTile
              title="Общие затраты"
              balance={data.totalAmount}
              color="blue"
              showOptions={false}
            />
            <BalanceTile
              title="Общие затраты в минуту"
              balance={data.totalAmountPerMinute}
              color="blue"
              showOptions={false}
            />
          </div>

          <BusinessExpensesManualTable
            items={data.manualExpenses.items}
            total={data.manualExpenses.total}
            totalPerMinute={data.manualExpenses.totalPerMinute}
            refetch={refetch}
          />

          <BusinessExpensesProductsTable
            title="Оборудование"
            items={data.productExpenses.BUSINESS_COST_EQUIPMENT?.items}
            total={data.productExpenses.BUSINESS_COST_EQUIPMENT?.total}
            totalPerMinute={
              data.productExpenses.BUSINESS_COST_EQUIPMENT?.totalPerMinute
            }
            refetch={refetch}
          />

          <BusinessExpensesProductsTable
            title="Материалы"
            items={data.productExpenses.BUSINESS_COST_MATERIAL?.items}
            total={data.productExpenses.BUSINESS_COST_MATERIAL?.total}
            totalPerMinute={
              data.productExpenses.BUSINESS_COST_MATERIAL?.totalPerMinute
            }
            refetch={refetch}
          />

          <BusinessExpensesProductsTable
            title="Хранение"
            items={data.productExpenses.BUSINESS_COST_STORAGE?.items}
            total={data.productExpenses.BUSINESS_COST_STORAGE?.total}
            totalPerMinute={
              data.productExpenses.BUSINESS_COST_STORAGE?.totalPerMinute
            }
            refetch={refetch}
          />
        </>
      )}
    </div>
  );
};
