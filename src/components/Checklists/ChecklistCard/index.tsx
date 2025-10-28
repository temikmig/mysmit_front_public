import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";
import { useGetChecklistQuery } from "../../../api";
import { formatDateToText, moneyFormat } from "../../../common/functions";
import { useAuth, useHandlers } from "../../../common/hooks";
import {
  ProductType,
  PRODUCT_TYPES_LABELS,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  ChecklistItem,
} from "../../../common/types";
import { ProductServiceTag } from "../../Products/ProductServiceTag";
import { ClickLink } from "../../ui/ClickLink";
import { DataGridItem, DataGrid } from "../../ui/DataGrid";
import LoaderPage from "../../ui/LoaderPage";
import styles from "./ChecklistCard.module.css";
import { CheckIcon } from "../../../assets/icons";
import { ChecklistFundsDataTable } from "../ChecklistFundsDataTable";
import { ChecklistStatusTag } from "../ChecklistStatusTag";

interface ChecklistCardProps {
  checklistId: string;
  refetch?: () => void;
}

export const ChecklistCard = ({ checklistId }: ChecklistCardProps) => {
  const { data: checklist, isLoading } = useGetChecklistQuery(checklistId);

  const { isAdmin } = useAuth();

  const { handleEmployeeCard, handleClientCard, handleProductCard } =
    useHandlers();

  const analyticsData = checklist
    ? [
        {
          label: "Бизнес-затраты",
          value: checklist.businessExpenses,
        },

        {
          label: "Прямые затраты",
          value: checklist.directExpenses,
        },
        {
          label: "Инструменты и оборудование",
          value: checklist.toolEquipment,
        },
        {
          label: "Зарплата",
          value: checklist.salary,
        },
        {
          label: "Финансовый резерв",
          value: checklist.financialReserve,
        },
        {
          label: "Развитие бизнеса",
          value: checklist.businessGrowth,
        },
        {
          label: "Процент эквайринга",
          value: checklist.acquiring,
        },
        {
          label: "Карта лояльности",
          value: checklist.loyalty,
        },
        {
          label: "Привлечение",
          value: checklist.acquisition,
        },
      ]
    : [];

  const mainItems: DataGridItem[] =
    (checklist && [
      {
        title: "Клиент",
        description: (
          <ClickLink
            onClick={() => {
              handleClientCard(checklist.clientId);
            }}
          >{`${checklist.client.firstName} ${checklist.client.lastName}`}</ClickLink>
        ),
      },
      {
        title: "Автомобиль",
        description: `${checklist.car.mark} ${checklist.car.model} ${
          checklist.car.color
        } ${checklist.car.number ? `(${checklist.car.number})` : ``}`,
      },
      {
        title: "Дата",
        description: `${formatDateToText(checklist.createdAt, "date string")}`,
      },
      {
        title: "Статус",
        description: <ChecklistStatusTag min status={checklist.status} />,
      },
      {
        title: "Время работы",
        description: `${checklist.workTime} мин.`,
      },
      {
        title: "Услуга",
        description: <ProductServiceTag min service={checklist.service} />,
      },
      {
        title: `Сотрудник${checklist.checklistEmployees.length > 1 ? `и` : ``}`,
        description: (
          <div className={styles.checklistEmployeesCont}>
            {checklist.checklistEmployees.map((checklistEmployee) => (
              <div className={styles.checklistEmployeeItem}>
                <ClickLink
                  onClick={() => {
                    handleEmployeeCard(checklistEmployee.employee.id);
                  }}
                >{`${checklistEmployee.employee.firstName} ${checklistEmployee.employee.lastName}`}</ClickLink>
                {isAdmin && <p>{moneyFormat(checklistEmployee.salary)}</p>}
              </div>
            ))}
          </div>
        ),
      },
      {
        title: `Стоимость услуги`,
        description: moneyFormat(checklist.price),
      },
      {
        title: `Комментарий`,
        description: checklist.comment ?? undefined,
      },
    ]) ||
    [];

  if (isLoading) return <LoaderPage />;

  if (checklist)
    return (
      <div className={styles.checklistCardCont}>
        <h5>Информация</h5>
        <div className={styles.checklistCont}>
          <div className={styles.checklistDataCont}>
            <div>
              <DataGrid items={mainItems} />
            </div>
            {checklist.items.length > 0 && (
              <>
                <h5>Чек-лист</h5>
                <div className={clsx("shadow-container", styles.productsCont)}>
                  <table className={styles.checklistTable}>
                    <thead>
                      <tr>
                        <th>Наименование</th>
                        <th style={{ textAlign: "right" }}>Ресурс</th>
                        {isAdmin && (
                          <th style={{ textAlign: "right" }}>Резерв</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(
                        checklist.items.reduce<
                          Record<ProductType, ChecklistItem[]>
                        >((acc, item) => {
                          const type = item.product.type as ProductType;
                          if (!acc[type]) acc[type] = [];
                          acc[type].push(item);
                          return acc;
                        }, {} as Record<ProductType, ChecklistItem[]>)
                      ).map(([type, items]) => {
                        const typeKey = type as ProductType;

                        const totalReserveValue = items.reduce(
                          (sum, item) => sum + (item.reserveValue || 0),
                          0
                        );

                        return (
                          <Fragment key={typeKey}>
                            <tr>
                              <td
                                colSpan={3}
                                className={styles.productGroupName}
                              >
                                <p className="text_medium_bold">
                                  {PRODUCT_TYPES_LABELS[typeKey]}
                                </p>
                              </td>
                            </tr>
                            {items.map((item) => {
                              const quantity = item.quantityUsed;
                              const reserveValue = item.reserveValue;
                              return (
                                <tr
                                  key={item.id}
                                  className={styles.productItem}
                                >
                                  <td>
                                    <div className={styles.productNameCont}>
                                      <div className={styles.productCheckIcon}>
                                        <CheckIcon />
                                      </div>
                                      <p className="text_medium">
                                        <ClickLink
                                          onClick={() =>
                                            handleProductCard(item.product.id)
                                          }
                                        >
                                          {item.product.name}
                                        </ClickLink>
                                      </p>
                                    </div>
                                  </td>
                                  <td
                                    className={styles.productQty}
                                  >{`${quantity} ${
                                    PRODUCT_UNIT_USAGE_LABELS_SHORT[
                                      item.product.unitUsage
                                    ]
                                  }`}</td>
                                  {isAdmin && (
                                    <td
                                      className={clsx(
                                        styles.productQty,
                                        styles.right
                                      )}
                                    >
                                      {moneyFormat(reserveValue)}
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                            {isAdmin && (
                              <tr className={styles.productItem}>
                                <td
                                  colSpan={2}
                                  className={clsx(styles.productQty)}
                                >
                                  <p className="text_small_bold">ИТОГО</p>
                                </td>
                                <td className={clsx(styles.productQty)}>
                                  <p className="text_small_bold">
                                    {moneyFormat(totalReserveValue)}
                                  </p>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
          {isAdmin && (
            <ChecklistFundsDataTable
              data={analyticsData}
              total={checklist.total}
              profit={checklist.profit}
              price={checklist.price}
            />
          )}
        </div>
      </div>
    );
};
