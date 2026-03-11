import { useRef, useState, useCallback, useEffect } from "react";

import { EmployeeSalaryMovement } from "@entities/employee";
import { useGetEmployeeSalaryMovementsQuery } from "@entities/employee/api";

export const useLoadEmployeeSalaryMovementsList = (employeeId: string) => {
  const [page, setPage] = useState(1);
  const [movements, setMovements] = useState<EmployeeSalaryMovement[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data, isFetching, refetch } = useGetEmployeeSalaryMovementsQuery(
    { employeeId, page, limit: 999 },
    { skip: !employeeId, refetchOnMountOrArgChange: true },
  );

  const hasMore = (data?.total ?? 0) > movements.length;

  const reload = useCallback(() => {
    setPage(1);
    setMovements([]);
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!data) return;

    if (page === 1) {
      setMovements([...data.data]);
    } else {
      setMovements((prev) => [
        ...prev,
        ...data.data.filter((d) => !prev.find((p) => p.id === d.id)),
      ]);
    }
  }, [data, page]);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!container || !hasMore) return;

  //   const handleScroll = () => {
  //     if (isFetching) return;
  //     const { scrollTop, scrollHeight, clientHeight } = container;
  //     if (scrollTop + clientHeight >= scrollHeight - 150) {
  //       setPage((p) => p + 1);
  //     }
  //   };

  //   container.addEventListener("scroll", handleScroll);
  //   return () => container.removeEventListener("scroll", handleScroll);
  // }, [hasMore, isFetching, movements]);

  return { movements, hasMore, isFetching, containerRef, reload };
};
