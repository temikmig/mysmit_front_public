import clsx from "clsx";
import { PlusIcon } from "../../../assets/icons";
import { getMonthName } from "../../../common/functions";
import { BalanceTile } from "../../Balances";
import Button from "../../ui/Button";
import styles from "./PiggyBanks.module.css";
import { MonthlyPlan } from "../../../common/types";
import { useHandlers } from "../../../common/hooks";
import { PiggyBankTile } from "../PiggyBankTile";

interface PiggyBanksProps {
  monthlyPlan: MonthlyPlan;
}

export const PiggyBanks = ({ monthlyPlan }: PiggyBanksProps) => {
  const { handlePiggyBankAdd } = useHandlers();

  return (
    <div className={clsx("shadow-container", styles.piggyBanksInfoCont)}>
      <div className={styles.piggyBanksInfoHeader}>
        <h4>
          {`Копилки на ${getMonthName(monthlyPlan.month).toLowerCase()} ${
            monthlyPlan.year
          }`}
        </h4>
        {monthlyPlan.isActive && (
          <Button
            onClick={() => {
              handlePiggyBankAdd();
            }}
            variant="outline"
            icon={<PlusIcon />}
          >
            Добавить копилку
          </Button>
        )}
      </div>

      <div className={styles.piggyBanksCont}>
        <div>
          <BalanceTile
            title="Всего накоплено"
            balance={monthlyPlan.total.actual || 0}
            color="red"
            showOptions={false}
          />
        </div>
        {monthlyPlan.piggyBanks.map((piggyBank) => (
          <PiggyBankTile
            key={piggyBank.id}
            piggyBankId={piggyBank.id}
            type={piggyBank.type}
            title={piggyBank.name}
            fact={piggyBank.actualAmount}
            plan={piggyBank.plannedAmount}
            active={monthlyPlan.isActive}
          />
        ))}
      </div>
    </div>
  );
};
