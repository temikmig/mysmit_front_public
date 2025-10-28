import clsx from "clsx";
import styles from "./PiggyBankTile.module.css";
import { moneyFormat } from "../../../common/functions";
import { ProgressBarPlanFact } from "../../ui/ProgressBarPlanFact";
import { useState, useRef } from "react";
import {
  OptionsDotsHorizontalIcon,
  EditIcon,
  DeleteIcon,
} from "../../../assets/icons";
import { useHandlers } from "../../../common/hooks";
import { ContextMenu, ContextMenuItem } from "../../ui/ContextMenu";
import { IconButton } from "../../ui/IconButton";
import { PiggyBankType, PiggyBankTypeEnum } from "../../../common/types";

interface PiggyBankTileProps {
  piggyBankId: string;
  title: string;
  type: PiggyBankType;
  fact: number;
  plan: number;
  active?: boolean;
}

export const PiggyBankTile = ({
  piggyBankId,
  title,
  type,
  fact,
  plan,
  active = true,
}: PiggyBankTileProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { handlePiggyBankEdit, handlePiggyBankDelete } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "plusMoney",
      icon: <EditIcon />,
      label: "Редактировать",
      color: "blue",
      onClick: () => {
        handlePiggyBankEdit(piggyBankId);
      },
    },
    ...(type === PiggyBankTypeEnum.CUSTOM
      ? [
          {
            id: "minusMoney",
            icon: <DeleteIcon />,
            label: "Удалить",
            color: "red" as "blue" | "default" | "red" | "green" | "orange",
            onClick: () => {
              handlePiggyBankDelete(piggyBankId);
            },
          },
        ]
      : []),
  ];

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  return (
    <div className={clsx("shadow-container", styles.piggyBankTileCont)}>
      <div className={styles.balanceTitleCont}>
        <h5 className={styles.balanceTitle}>{title}</h5>
        {active && (
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
      <div className={styles.balancesCont}>
        <p className={clsx(styles.balanceValue, styles.fact)}>
          {moneyFormat(fact)}
        </p>
        <p className={clsx(styles.balanceValue, styles.plan)}>
          {moneyFormat(plan)}
        </p>
      </div>
      <ProgressBarPlanFact fact={fact} plan={plan} />

      <p className={clsx("text_medium", styles.diff)}>
        {`${
          plan > 0
            ? plan > fact
              ? `Осталось: ${moneyFormat(plan - fact)}`
              : `Сверх плана: ${moneyFormat(fact - plan)}`
            : ``
        }`}
      </p>
    </div>
  );
};
