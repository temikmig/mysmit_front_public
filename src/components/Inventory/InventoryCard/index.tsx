import { useGetInventoryQuery } from "../../../api";
import { CheckIcon, CrossCircleIcon, DeleteIcon } from "../../../assets/icons";
import { formatDateToText } from "../../../common/functions";
import { useAuth, useHandlers } from "../../../common/hooks";
import {
  InventoryItem,
  InventoryStatusEnum,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
} from "../../../common/types";
import Button from "../../ui/Button";
import { ClickLink } from "../../ui/ClickLink";
import { DataGrid, DataGridItem } from "../../ui/DataGrid";
import LoaderPage from "../../ui/LoaderPage";
import { Column, Table } from "../../ui/Table";
import { InventoryDiffWrap } from "../InventoryDiffWrap";
import { InventoryStatusTag } from "../InventoryStatusTag";

import styles from "./InventoryCard.module.css";

interface InventoryCardProps {
  inventoryId: string;
  closeModal: () => void;
}

export const InventoryCard = ({
  inventoryId,
  closeModal,
}: InventoryCardProps) => {
  const { data: inventory, isLoading } = useGetInventoryQuery(inventoryId);

  const { isAdmin } = useAuth();

  const {
    handleProductCard,
    handleInventoryConfirm,
    handleInventoryDelete,
    handleInventoryReject,
  } = useHandlers();

  const mainItems: DataGridItem[] =
    (inventory && [
      {
        title: "Дата",
        description: `${formatDateToText(
          inventory.inventoryDate,
          "date string"
        )}`,
      },
      {
        title: "Создал",
        description: `${inventory.createdByUser.firstName} ${
          inventory.createdByUser.lastName
        }, ${formatDateToText(inventory.createdAt, "datetime")}`,
      },
      {
        title: "Статус",
        description: (
          <>
            <div className={styles.inventoryStatusCont}>
              <InventoryStatusTag min status={inventory.status} />
              {inventory.comment && <p>{inventory.comment}</p>}
            </div>
          </>
        ),
      },
      {
        title: "Подтвердил",
        description:
          inventory.confirmedBy && inventory.confirmedAt
            ? `${inventory.confirmedBy.firstName} ${
                inventory.confirmedBy.lastName
              }, ${formatDateToText(inventory.confirmedAt, "datetime")}`
            : `-`,
      },
      {
        title: "Всего товаров",
        description: inventory.items?.length,
      },
    ]) ||
    [];

  const columns: Column<InventoryItem>[] = [
    {
      key: "product",
      title: "Товар",
      render: (_, i) => (
        <ClickLink
          onClick={() => {
            handleProductCard(i.productId);
          }}
        >
          {i.product.name}
        </ClickLink>
      ),
    },
    {
      key: "resource",
      title: "Количество",
      align: "center",
      children: [
        {
          key: "expectedQty",
          title: "Склад",
          width: 100,
          align: "right",
          render: (_, i) => (
            <p className="text_small">{`${i.expectedQty} ${i.product.unitStorage.shortName}`}</p>
          ),
        },
        {
          key: "countedQty",
          title: "Факт",
          width: 100,
          align: "right",
          render: (_, i) => (
            <p className="text_small">{`${i.countedQty} ${i.product.unitStorage.shortName}`}</p>
          ),
        },
        {
          key: "differenceQty",
          title: "+/-",
          width: 100,
          align: "right",
          render: (_, i) => (
            <>
              <InventoryDiffWrap
                min
                diff={i.differenceQty}
                diffLabel={i.product.unitStorage.shortName}
              />
              <InventoryDiffWrap min diff={i.diffWriteOffPrice} diffLabel="₽" />
            </>
          ),
        },
      ],
    },
    {
      key: "resource",
      title: "Ресурс",
      align: "center",
      children: [
        {
          key: "expectedResourceQty",
          title: "Склад",
          width: 100,
          align: "right",
          render: (_, i) => (
            <p className="text_small">{`${i.expectedResourceQty} ${
              PRODUCT_UNIT_USAGE_LABELS_SHORT[i.product.unitUsage]
            }`}</p>
          ),
        },
        {
          key: "countedResourceQty",
          title: "Факт",
          width: 100,
          align: "right",
          render: (_, i) => (
            <p className="text_small">{`${i.countedResourceQty} ${
              PRODUCT_UNIT_USAGE_LABELS_SHORT[i.product.unitUsage]
            }`}</p>
          ),
        },
        {
          key: "differenceResource",
          title: "+/-",
          width: 100,
          align: "right",
          render: (_, i) => (
            <>
              <InventoryDiffWrap
                min
                diff={i.differenceResource}
                diffLabel={PRODUCT_UNIT_USAGE_LABELS_SHORT[i.product.unitUsage]}
              />
              <InventoryDiffWrap
                min
                diff={i.diffWriteOffOnePrice}
                diffLabel="₽"
              />
            </>
          ),
        },
      ],
    },
  ];

  if (isLoading) return <LoaderPage />;

  if (inventory)
    return (
      <div className={styles.inventoryCardCont}>
        <h5>Карточка инвентаризации</h5>
        <DataGrid items={mainItems} />
        {(inventory.status === InventoryStatusEnum.DRAFT ||
          inventory.status === InventoryStatusEnum.AWAITING_MANAGER) && (
          <div className={styles.buttonsCont}>
            {isAdmin && (
              <>
                <Button
                  size="small"
                  icon={<CheckIcon />}
                  onClick={() => {
                    handleInventoryConfirm(inventoryId);
                  }}
                >
                  Подтвердить
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  icon={<CrossCircleIcon />}
                  onClick={() => {
                    handleInventoryReject(inventoryId);
                  }}
                >
                  Отклонить
                </Button>
              </>
            )}
            <Button
              variant="secondary"
              size="small"
              icon={<DeleteIcon />}
              onClick={() => {
                handleInventoryDelete(inventoryId, () => {
                  closeModal();
                });
              }}
            >
              Удалить
            </Button>
          </div>
        )}
        <Table
          columns={columns}
          data={inventory.items ?? []}
          rowKey={(r) => r.productId}
          search={false}
          pagination={false}
          className={styles.inventoryCardProductsCont}
        />
      </div>
    );
};
