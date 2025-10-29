import { useCallback, useRef, useState } from "react";
import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { OptionsDotsHorizontalIcon, UserAddIcon } from "../../assets/icons";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";
import type { User } from "../../common/types";
import { useGetUsersQuery } from "../../api";
import { UserAvatar, UserRoleTag, UsersActions } from "../../components/Users";
import { useHandlers } from "../../common/hooks";
import { ClickLink } from "../../components/ui/ClickLink";

import styles from "./UsersPage.module.css";

const RightTableCont = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { handleUserAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <UserAddIcon />,
      label: "Добавить прользователя",
      color: "blue",
      onClick: () => {
        handleUserAdd();
      },
    },
  ];

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleActions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsActionsOpen((prev) => !prev);
  };

  return (
    <>
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
    </>
  );
};

export const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof User | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const { data, isLoading } = useGetUsersQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const { handleUserCard } = useHandlers();

  const columns: Column<User>[] = [
    {
      key: "userAvatar",
      render: (_, user) => <UserAvatar user={user} />,
      width: 64,
      sort: false,
    },
    {
      key: "lastName",
      title: "Пользователь",
      render: (_, user) => (
        <div className={styles.userName}>
          <ClickLink
            onClick={() => {
              handleUserCard(user.id);
            }}
          >
            {user.firstName} {user.lastName}
          </ClickLink>
          <UserRoleTag min role={user.role} />
        </div>
      ),
      sort: true,
    },
    {
      key: "login",
      title: "Логин",
      render: (_, user) => <p className="text_medium">{user.login}</p>,
      sort: true,
    },
    {
      key: "actions",
      sort: false,
      render: (_, user) => <UsersActions user={user} />,
      width: 64,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((l: number) => {
    setLimit(l);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof User, order: "asc" | "desc") => {
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
      data={data?.users ?? []}
      rowKey={(r) => r.id}
      total={data?.total ?? 0}
      page={page}
      pageSize={limit}
      onPageChange={setPage}
      onPageSizeChange={handlePageSizeChange}
      searchValue={search}
      onSearchChange={handleSearchChange}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
      rightContainer={<RightTableCont />}
    />
  );
};
