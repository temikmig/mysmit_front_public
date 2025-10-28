import { useState, useEffect } from "react";
import {
  useGetBalanceQuery,
  useChangeFundOrderMutation,
  useGetActiveMonthlyPlanQuery,
} from "../../api";
import { BalanceTile, FundTile } from "../../components/Balances";
import LoaderPage from "../../components/ui/LoaderPage";
import Button from "../../components/ui/Button";
import { PlusIcon } from "../../assets/icons";
import styles from "./BalancesPage.module.css";
import clsx from "clsx";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Fund } from "../../common/types";
import { CSS } from "@dnd-kit/utilities";
import { useHandlers } from "../../common/hooks";
import { PiggyBanks } from "../../components/PlansReports";

const SortableFundTile = ({ fund }: { fund: Fund }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fund.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <FundTile
        fund={fund}
        dragHandleProps={{
          attributes,
          listeners,
        }}
      />
    </div>
  );
};

export const BalancesPage = () => {
  const { data: balanceData, isLoading } = useGetBalanceQuery();
  const { data: monthlyPlanData, isLoading: monthlyPlanIsLoading } =
    useGetActiveMonthlyPlanQuery();
  const [funds, setFunds] = useState<Fund[]>([]);
  const [, setActiveId] = useState<string | null>(null);
  const [changeFundOrder] = useChangeFundOrderMutation();

  const { handleFundAdd } = useHandlers();

  useEffect(() => {
    if (balanceData?.funds) setFunds(balanceData.funds);
  }, [balanceData?.funds]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = funds.findIndex((f) => f.id === active.id);
    const newIndex = funds.findIndex((f) => f.id === over.id);
    const newFunds = arrayMove(funds, oldIndex, newIndex);
    setFunds(newFunds);

    const payload = newFunds.map((f, idx) => ({ id: f.id, order: idx }));
    try {
      await changeFundOrder(payload).unwrap();
    } catch (err) {
      console.error("Ошибка обновления порядка фондов:", err);
    }
  };

  if (isLoading || monthlyPlanIsLoading) return <LoaderPage />;

  if (balanceData)
    return (
      <div className={styles.balancesPageCont}>
        <div className={styles.balancesCont}>
          <BalanceTile
            title="Всего средств"
            balance={balanceData.totalBalance || 0}
            color="green"
            showOptions={false}
          />
          <BalanceTile
            title="Нераспределенных"
            balance={balanceData.unallocatedBalance || 0}
            color="red"
          />
          {balanceData.sources.map((source) => (
            <BalanceTile
              key={source.id}
              id={source.id}
              title={source.name}
              balance={source.balance}
            />
          ))}
        </div>
        {monthlyPlanData && <PiggyBanks monthlyPlan={monthlyPlanData} />}
        <div className={clsx("shadow-container", styles.fundsInfoCont)}>
          <div className={styles.fundsInfoHeader}>
            <h4>Фонды</h4>
            <Button
              variant="outline"
              icon={<PlusIcon />}
              onClick={() => handleFundAdd()}
            >
              Добавить фонд
            </Button>
          </div>

          {funds.length ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={funds.map((f) => f.id)}
                strategy={rectSortingStrategy} // для grid
              >
                <div className={styles.fundsCont}>
                  {funds.map((f) => (
                    <SortableFundTile key={f.id} fund={f} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <p className={styles.emptyData}>Фонды отсутствуют</p>
          )}
        </div>
      </div>
    );
};
