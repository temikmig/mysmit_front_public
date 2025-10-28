import clsx from "clsx";
import styles from "./BalanceTile.module.css";
import { IconButton } from "../../ui/IconButton";
import {
  MinusMinIcon,
  OptionsDotsHorizontalIcon,
  PlusMinIcon,
  ShuffleIcon,
} from "../../../assets/icons";
import { ContextMenu, ContextMenuItem } from "../../ui/ContextMenu";
import { useRef, useState } from "react";
import { moneyFormat } from "../../../common/functions";
import { useHandlers } from "../../../common/hooks";

interface BalanceTileProps {
  id?: string;
  title: string;
  balance: number;
  color?: "green" | "red" | "blue";
  showOptions?: boolean;
}

export const BalanceTile = ({
  id,
  title,
  balance,
  color = "blue",
  showOptions = true,
}: BalanceTileProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const {
    handleMoneySourceIncome,
    handleMoneySourceOutcome,
    handleMoneyDistribute,
  } = useHandlers();

  const items: ContextMenuItem[] = id
    ? [
        {
          id: "plusMoney",
          icon: <PlusMinIcon />,
          label: "Зачислить деньги",
          color: "green",
          onClick: () => {
            if (id) handleMoneySourceIncome(id);
          },
        },
        {
          id: "minusMoney",
          icon: <MinusMinIcon />,
          label: "Снять деньги",
          color: "red",
          onClick: () => {
            if (id) handleMoneySourceOutcome(id);
          },
        },
      ]
    : [
        {
          id: "minusMoney",
          icon: <ShuffleIcon />,
          label: "Распределить деньги",
          color: "orange",
          onClick: () => {
            handleMoneyDistribute();
          },
        },
      ];

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        "shadow-container",
        styles.balanceTileCont,
        styles[color]
      )}
    >
      <p className={styles.balanceValue}>{moneyFormat(balance)}</p>
      <div className={styles.balanceTitleCont}>
        <h5 className={styles.balanceTitle}>{title}</h5>
        {showOptions && (
          <>
            <IconButton
              tooltip=""
              icon={<OptionsDotsHorizontalIcon />}
              onClick={handleOptions}
              size="big"
              variant="outline"
              ref={buttonRef}
            />
            <ContextMenu
              anchorRef={buttonRef}
              items={items}
              open={isOptionsOpen}
              placement="bottom end"
              onClose={() => setIsOptionsOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};
