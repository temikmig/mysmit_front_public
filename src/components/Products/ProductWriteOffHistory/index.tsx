import { useGetWriteoffPriceHistoryQuery } from "../../../api";
import { formatDateToText, moneyFormat } from "../../../common/functions";
import {
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  WriteoffPriceHistoryItem,
} from "../../../common/types";
import LoaderPage from "../../ui/LoaderPage";
import { Column, Table } from "../../ui/Table";

import styles from "./ProductWriteOffHistory.module.css";

interface ProductWriteOffHistoryProps {
  productId: number;
}

export const ProductWriteOffHistory = ({
  productId,
}: ProductWriteOffHistoryProps) => {
  const { data: writeoffPriceHistory, isLoading } =
    useGetWriteoffPriceHistoryQuery(productId);

  const columns: Column<WriteoffPriceHistoryItem>[] = [
    {
      key: "receivedAt",
      title: "Дата изменения",
      width: 200,
      render: (_, h) => formatDateToText(h.createdAt, "datetime string"),
    },
    {
      key: "quantity",
      title: `За 1 ${writeoffPriceHistory && writeoffPriceHistory.unitStorage}`,
      width: 100,
      align: "right",
      render: (_, h) => moneyFormat(h.price),
    },
    {
      key: "price",
      title: `За 1 ${
        writeoffPriceHistory &&
        PRODUCT_UNIT_USAGE_LABELS_SHORT[writeoffPriceHistory.unitUsage]
      }`,
      width: 100,
      align: "right",
      render: (_, h) => moneyFormat(h.priceOne, 4),
    },
    {
      key: "comment",
      title: "Комментарий",
      render: (_, h) => h.comment,
    },
  ];

  if (isLoading) return <LoaderPage />;

  if (writeoffPriceHistory)
    return (
      <div className={styles.ProductWriteOffHistoryCont}>
        <h5>История цен списания товара</h5>
        <Table
          columns={columns}
          data={writeoffPriceHistory.items ?? []}
          rowKey={(r) => r.id}
          search={false}
          pagination={false}
        />
      </div>
    );
};
