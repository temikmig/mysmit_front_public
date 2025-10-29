import { useCallback, useRef, useState } from "react";

import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import {
  AppsAddIcon,
  FilterIcon,
  OptionsDotsHorizontalIcon,
  ProductAddIcon,
} from "../../assets/icons";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";
import { useGetProductsFundQuery, useGetProductsListQuery } from "../../api";
import {
  PRODUCT_TYPES_LABELS,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  type Product,
  type ProductType,
} from "../../common/types";
import { ProductTypeTag } from "../../components/Products";
import { StorageActions } from "../../components/Storage";

import styles from "./StoragePage.module.css";
import { ClickLink } from "../../components/ui/ClickLink";
import { formatDateToText, moneyFormat } from "../../common/functions";
import { useHandlers } from "../../common/hooks";
import { Dropdown } from "../../components/ui/Dropdown";
import { Radio } from "../../components/ui/Radio";
import clsx from "clsx";
import { Select } from "../../components/ui/Select";

interface ProductFilters {
  visibility: "active" | "hidden" | "all";
  stock: "positive" | "empty" | "all";
  productType: ProductType | "ALL";
}

interface RightTableContProps {
  filters: ProductFilters;
  onChangeFilters: (filters: Partial<ProductFilters>) => void;
}

const RightTableCont = ({ filters, onChangeFilters }: RightTableContProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { handlePurchaseInvoiceAdd, handleProductAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "productAdd",
      icon: <ProductAddIcon />,
      label: "Добавить товар",
      color: "blue",
      onClick: () => {
        handleProductAdd();
      },
    },
    {
      id: "purchaseInvoiceAdd",
      icon: <AppsAddIcon />,
      label: "Оформить накладную",
      color: "blue",
      onClick: () => {
        handlePurchaseInvoiceAdd();
      },
    },
  ];

  const buttonRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLDivElement>(null);

  const handleActions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsActionsOpen((prev) => !prev);
  };

  return (
    <>
      <div style={{ width: 200 }}>
        <Select
          value={filters.productType ?? "ALL"}
          options={[
            { value: "ALL", label: "Все" },
            ...Object.entries(PRODUCT_TYPES_LABELS).map(([key, label]) => ({
              value: key,
              label,
            })),
          ]}
          onChange={(val) => {
            onChangeFilters({
              productType: val as ProductType | "ALL",
            });
          }}
        />
      </div>
      <div ref={filterButtonRef}>
        <Button
          icon={<FilterIcon />}
          onClick={(e) => {
            e.stopPropagation();
            setIsFilterOpen((v) => !v);
            setIsActionsOpen(false);
          }}
        />
      </div>
      <div ref={buttonRef}>
        <Button icon={<OptionsDotsHorizontalIcon />} onClick={handleActions} />
      </div>
      <ContextMenu
        anchorRef={buttonRef}
        items={items}
        open={isActionsOpen}
        placement="bottom end"
        onClose={() => setIsActionsOpen(false)}
      />
      <Dropdown
        anchorRef={filterButtonRef}
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        withShadow
        placement="bottom end"
        offsetY={8}
      >
        <div className={styles.filterMenu}>
          <div className={styles.filterGroup}>
            <p className={clsx("text_medium_bold", styles.filterLabel)}>
              Статус
            </p>
            {[
              { label: "Активные", value: "active" },
              { label: "Скрытые", value: "hidden" },
              { label: "Все", value: "all" },
            ].map((opt, index) => (
              <Radio
                key={`visibility-${index}`}
                name="visibility"
                label={opt.label}
                value={opt.value}
                onChange={() =>
                  onChangeFilters({
                    visibility: opt.value as "active" | "hidden" | "all",
                  })
                }
                checked={filters.visibility === opt.value}
              />
            ))}
          </div>

          <div className={styles.filterGroup}>
            <p className={clsx("text_medium_bold", styles.filterLabel)}>
              Остаток
            </p>
            {[
              { label: "С положительным", value: "positive" },
              { label: "Без остатков", value: "empty" },
              { label: "Все", value: "all" },
            ].map((opt, index) => (
              <Radio
                key={`stock-${index}`}
                name="stock"
                label={opt.label}
                value={opt.value}
                onChange={() =>
                  onChangeFilters({
                    stock: opt.value as "positive" | "empty" | "all",
                  })
                }
                checked={filters.stock === opt.value}
              />
            ))}
          </div>
        </div>
      </Dropdown>
    </>
  );
};

interface FundInfoProps {
  productType: ProductType;
}

const ProductsFund = ({ productType }: FundInfoProps) => {
  const { data: productsFundData, isLoading } =
    useGetProductsFundQuery(productType);

  if (isLoading) return <LoaderPage />;
  if (productsFundData)
    return (
      <div className={styles.productsFundCont}>
        <p className={clsx("text_medium", styles.productsFundName)}>
          <b>Фонд:</b> {productsFundData.fundName}
        </p>
        <p className={clsx("text_medium", styles.productsFundBalance)}>
          <b>Баланс фонда:</b> {moneyFormat(productsFundData.fundBalance)}
        </p>
        <p className={clsx("text_medium", styles.productsFunTotalReserves)}>
          <b>Баланс резервов:</b> {moneyFormat(productsFundData.totalReserves)}
        </p>
        <p className={clsx("text_medium", styles.productsFundDiff)}>
          <b>Разница:</b> {moneyFormat(productsFundData.difference)}
        </p>
      </div>
    );
};

export const StoragePage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Product | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [filters, setFilters] = useState({
    visibility: "active" as "active" | "hidden" | "all",
    stock: "all" as "positive" | "empty" | "all",
    productType: "ALL" as ProductType | "ALL",
  });

  const handleChangeFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const { data, isLoading } = useGetProductsListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
    visibility: filters.visibility,
    stock: filters.stock,
    productType: filters.productType,
  });

  const { handleProductCard } = useHandlers();

  const columns: Column<Product>[] = [
    {
      key: "name",
      title: "Наименование",
      sort: true,
      render: (_, p) => (
        <div className={styles.productName}>
          <ClickLink
            onClick={() => {
              handleProductCard(p.id);
            }}
          >
            {p.name}
          </ClickLink>
          <p style={{ color: "var(--text-gray)" }}>{p.shortName}</p>
          <ProductTypeTag min type={p.type as ProductType} />
        </div>
      ),
    },
    {
      key: "stockBalance.quantity",
      title: "Остаток",
      align: "center",
      children: [
        {
          key: "stockBalance.quantity",
          title: "Товар",
          align: "center",
          width: 80,
          sort: true,
          render: (_, p) => (
            <p>
              {p.stockBalance.quantity ?? 0} {p.unitStorage.shortName}
            </p>
          ),
        },
        {
          key: "stockBalance.resourceQuantity",
          title: "Ресурс",
          align: "center",
          width: 80,
          sort: true,
          render: (_, p) => (
            <p
              style={{
                color:
                  p.stockBalance.resourceQuantity < 0
                    ? "var(--text-red)"
                    : undefined,
              }}
            >
              {p.stockBalance.resourceQuantity ?? 0}{" "}
              {PRODUCT_UNIT_USAGE_LABELS_SHORT[p.unitUsage]}
            </p>
          ),
        },
      ],
    },
    {
      key: "lastBatch",
      title: "Последняя закупка",
      align: "center",
      children: [
        {
          key: "receivedAt",
          title: "Дата",
          align: "center",
          width: 80,
          sort: false,
          render: (_, p) =>
            p.lastBatch ? (
              <p>{formatDateToText(p.lastBatch.receivedAt, "date")}</p>
            ) : (
              `-`
            ),
        },
        {
          key: "price",
          title: "Цена",
          align: "center",
          width: 80,
          sort: false,
          render: (_, p) =>
            p.lastBatch ? moneyFormat(p.lastBatch.price) : `-`,
        },
      ],
    },
    {
      key: "currentWriteoffPrice",
      title: "Цена списания",
      width: 100,
      align: "right",
      sort: true,
      render: (_, p) => moneyFormat(p.currentWriteoffPrice),
    },
    {
      key: "reserveValue",
      title: "Накоплено",
      width: 100,
      align: "right",
      sort: true,
      render: (_, p) => moneyFormat(p.reserveValue || 0),
    },
    {
      key: "actions",
      title: "Действия",
      align: "center",
      sort: false,
      render: (_, p) => <StorageActions product={p} />,
      width: 64,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof Product, order: "asc" | "desc") => {
      setSortColumn(col);
      setSortOrder(order);
      setPage(1);
    },
    []
  );

  if (isLoading) return <LoaderPage />;

  return (
    <Table
      columns={columns}
      data={data?.products ?? []}
      rowKey={(r) => r.id}
      total={data?.total ?? 0}
      page={page}
      pageSize={limit}
      onPageChange={setPage}
      onPageSizeChange={setLimit}
      searchValue={search}
      onSearchChange={handleSearchChange}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
      preTableCont={
        filters.productType !== "ALL" && (
          <ProductsFund productType={filters.productType} />
        )
      }
      rightContainer={
        <RightTableCont
          filters={filters}
          onChangeFilters={handleChangeFilters}
        />
      }
    />
  );
};
