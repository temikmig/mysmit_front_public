import { useGetPurchaseInvoiceQuery } from "../../../api";
import { formatDateToText, moneyFormat } from "../../../common/functions";
import { useHandlers } from "../../../common/hooks";
import { PRODUCT_UNIT_USAGE_LABELS_SHORT } from "../../../common/types";
import { ClickLink } from "../../ui/ClickLink";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./PurchaseInvoiceCard.module.css";

interface PurchaseInvoiceCardProps {
  purchaseInvoiceId: string;
}

export const PurchaseInvoiceCard = ({
  purchaseInvoiceId,
}: PurchaseInvoiceCardProps) => {
  const { data: purchaseInvoice, isLoading } =
    useGetPurchaseInvoiceQuery(purchaseInvoiceId);

  const { handleSupplierCard, handleProductCard } = useHandlers();

  if (isLoading) return <LoaderPage />;

  if (purchaseInvoice)
    return (
      <div className={styles.purchaseInvoiceCardCont}>
        <div className={styles.purchaseInvoiceHead}>
          <h3>
            {`Накладная "${
              purchaseInvoice.supplier.name
            }" от ${formatDateToText(
              purchaseInvoice.createdAt,
              "date string"
            )}`}
          </h3>
          <p>
            Поставщик:{" "}
            <ClickLink
              onClick={() => {
                handleSupplierCard(purchaseInvoice.supplierId);
              }}
            >
              {purchaseInvoice.supplier.name}
            </ClickLink>
          </p>
        </div>
        <h5>Товары по накладной</h5>
        <div className={styles.purchaseInvoiceProductsCont}>
          <table className={styles.purchaseInvoiceTable}>
            <thead>
              <tr>
                <th style={{ width: 400 }}>Товар</th>
                <th style={{ width: 100 }} className={styles.right}>
                  Кол-во
                </th>
                <th style={{ width: 100 }} className={styles.right}>
                  Ресурс
                </th>
                <th style={{ width: 100 }} className={styles.right}>
                  Цена
                </th>
                <th style={{ width: 100 }} className={styles.right}>
                  Сумма
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseInvoice.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <ClickLink
                      onClick={() => {
                        handleProductCard(item.productId);
                      }}
                    >
                      {item.product.name}
                    </ClickLink>
                  </td>
                  <td className={styles.right}>
                    {item.quantity} {item.product.unitStorage.shortName}
                  </td>
                  <td className={styles.right}>
                    +{item.resourceQuantity}{" "}
                    {PRODUCT_UNIT_USAGE_LABELS_SHORT[item.product.unitUsage]}
                  </td>
                  <td className={styles.right}>{moneyFormat(item.price)}</td>
                  <td className={styles.right}>
                    {moneyFormat(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
              <tr className={styles.total}>
                <td colSpan={4} style={{ textAlign: "right", fontWeight: 600 }}>
                  ИТОГО:
                </td>
                <td className={styles.right}>
                  {moneyFormat(purchaseInvoice.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
};
