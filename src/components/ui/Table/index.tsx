import React, { useState, useEffect, useRef, type ReactNode } from "react";
import styles from "./Table.module.css";
import Button from "../../../components/ui/Button";
import { Select } from "../../../components/ui/Select";
import clsx from "clsx";
import Input from "../Input";
import { SearchIcon } from "../../../assets/icons/SearchIcon";
import {
  AngleDownMinIcon,
  AngleLeftMinIcon,
  AngleRightMinIcon,
  AngleUpMinIcon,
  DoubleAngleLeftMinIcon,
  DoubleAngleRightMinIcon,
} from "../../../assets/icons";

export type Column<T extends object> = {
  key: keyof T | string;
  title?: string;
  width?: number;
  align?: "left" | "center" | "right";
  sort?: boolean;
  render?: (value: T[keyof T] | string | undefined, row: T) => React.ReactNode;
  renderHeader?: (title: string, key: keyof T | string) => React.ReactNode;
  children?: Column<T>[]; // 👈 группировка
};

type TableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  summaryRow?: Partial<Record<keyof T | string, ReactNode>>;
  total?: number;
  page?: number;
  pageSize?: number;
  searchValue?: string;
  sortColumn?: keyof T | null;
  sortOrder?: "asc" | "desc" | null;
  rowKey?: (row: T) => string | number;
  className?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSearchChange?: (value: string) => void;
  onSortChange?: (column: keyof T, order: "asc" | "desc") => void;
  rightContainer?: ReactNode;
  pagination?: boolean;
  search?: boolean;
};

export function Table<T extends object>({
  columns,
  data,
  total = 0,
  page = 1,
  pageSize = 10,
  searchValue = "",
  sortColumn,
  sortOrder,
  rowKey,
  className,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  onSortChange,
  rightContainer,
  pagination = true,
  search = true,
  summaryRow,
}: TableProps<T>) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [localSearch, setLocalSearch] = useState(searchValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchChange?.(localSearch);
    }, 300);
    return () => clearTimeout(timeout);
  }, [localSearch, onSearchChange]);

  const totalPages = Math.ceil(total / pageSize);

  const getPageButtons = () => {
    const buttons: (number | "dots-start" | "dots-end")[] = [];
    const delta = 2;
    const start = Math.max(1, page - delta);
    const end = Math.min(totalPages, page + delta);

    if (start > 1) buttons.push(1);
    if (start > 2) buttons.push("dots-start");

    for (let i = start; i <= end; i++) buttons.push(i);

    if (end < totalPages - 1) buttons.push("dots-end");
    if (end < totalPages) buttons.push(totalPages);

    return buttons;
  };

  const handleSort = (col: keyof T) => {
    if (sortColumn === col) {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      onSortChange?.(col, newOrder);
    } else {
      onSortChange?.(col, "asc");
    }
  };

  const leafColumns = columns.flatMap((col) =>
    col.children ? col.children : col
  ) as Column<T>[];

  return (
    <div
      className={clsx(styles.tableContainer, className, "shadow-container")}
      ref={tableRef}
    >
      <div className={styles.tableTopCont}>
        {search && (
          <div className={styles.tableControls}>
            <div className={styles.searchCont}>
              <Input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                leftIcon={<SearchIcon />}
                placeholder="Поиск..."
              />
            </div>
            {rightContainer}
          </div>
        )}
        <div className={styles.tableWrapper}>
          <table
            className={clsx(
              styles.table,
              search && styles.withSearch,
              pagination && styles.withPagination
            )}
          >
            <thead>
              <tr>
                {columns.map((col) =>
                  col.children ? (
                    <th
                      key={String(col.key)}
                      colSpan={col.children.length}
                      style={{
                        width: col.width,
                        textAlign: col.align,
                      }}
                    >
                      <div className={styles.trCont}>
                        {col.title && (
                          <p className="text_small_bold">{col.title}</p>
                        )}
                      </div>
                    </th>
                  ) : (
                    <th
                      key={String(col.key)}
                      rowSpan={2}
                      onClick={() => col.sort && handleSort(col.key as keyof T)}
                      style={{ width: col.width, textAlign: col.align }}
                      className={clsx(
                        col.sort && styles.clickableHeader,
                        sortColumn === col.key && styles.sorted
                      )}
                    >
                      <div className={styles.trCont}>
                        {col.title && (
                          <p className="text_small_bold">{col.title}</p>
                        )}
                        {sortColumn === col.key &&
                          (sortOrder === "asc" ? (
                            <AngleUpMinIcon />
                          ) : (
                            <AngleDownMinIcon />
                          ))}
                      </div>
                    </th>
                  )
                )}
              </tr>
              <tr>
                {columns.flatMap((col) =>
                  col.children
                    ? col.children.map((child) => (
                        <th
                          key={String(child.key)}
                          onClick={() =>
                            child.sort && handleSort(child.key as keyof T)
                          }
                          className={clsx(
                            child.sort && styles.clickableHeader,
                            sortColumn === child.key && styles.sorted
                          )}
                          style={{
                            top: search ? 88 : 24,
                            width: child.width,
                            textAlign: child.align,
                          }}
                        >
                          <div className={styles.trCont}>
                            {child.title && (
                              <p className="text_small_bold">
                                {child.renderHeader
                                  ? child.renderHeader(child.title, child.key)
                                  : child.title}
                              </p>
                            )}
                            {sortColumn === child.key &&
                              (sortOrder === "asc" ? (
                                <AngleUpMinIcon />
                              ) : (
                                <AngleDownMinIcon />
                              ))}
                          </div>
                        </th>
                      ))
                    : []
                )}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={leafColumns.length} className={styles.empty}>
                    Нет данных
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={
                      rowKey
                        ? rowKey(row)
                        : String(
                            (row as { id?: string | number }).id ??
                              Math.random()
                          )
                    }
                  >
                    {leafColumns.map((col) => (
                      <td
                        key={String(col.key)}
                        style={{ textAlign: col.align }}
                      >
                        {col.render
                          ? col.render(undefined, row)
                          : col.key in row
                          ? String(row[col.key as keyof T] ?? "")
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
            {summaryRow && (
              <tfoot className={styles.tableFooter}>
                <tr>
                  {leafColumns.map((col) => (
                    <td
                      key={String(col.key)}
                      style={{
                        textAlign: col.align,
                        fontWeight: 600,
                      }}
                    >
                      {summaryRow[col.key as string] ?? ""}
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
      {pagination && (
        <div className={styles.paginationContainer}>
          <div className={styles.paginationLengthRows}>
            {total > 0 ? (
              <p className="text_small">
                Показывается{" "}
                <strong>{`${(page - 1) * pageSize + 1}–${Math.min(
                  page * pageSize,
                  total
                )}`}</strong>{" "}
                записей из <strong>{total}</strong>
              </p>
            ) : (
              <p className="text_medium">Нет записей</p>
            )}
          </div>
          <div className={styles.paginationButtons}>
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => onPageChange?.(1)}
              icon={<DoubleAngleLeftMinIcon />}
            />
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => onPageChange?.(page - 1)}
              icon={<AngleLeftMinIcon />}
            />

            {getPageButtons().map((p, idx) =>
              p === "dots-start" || p === "dots-end" ? (
                <span key={idx} className={styles.dots}>
                  …
                </span>
              ) : (
                <Button
                  key={idx}
                  variant={p === page ? "primary" : "outline"}
                  onClick={() => onPageChange?.(Number(p))}
                >
                  {String(p)}
                </Button>
              )
            )}

            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => onPageChange?.(page + 1)}
              icon={<AngleRightMinIcon />}
            />
            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => onPageChange?.(totalPages)}
              icon={<DoubleAngleRightMinIcon />}
            />
          </div>

          <div className={styles.paginationShowRows}>
            <p className="text_small">Показать</p>
            <Select
              options={[5, 10, 20, 50, 100, 150].map((n) => ({
                label: String(n),
                value: n,
              }))}
              value={pageSize}
              onChange={(val) => onPageSizeChange?.(Number(val))}
              className={styles.select}
            />
          </div>
        </div>
      )}
    </div>
  );
}
