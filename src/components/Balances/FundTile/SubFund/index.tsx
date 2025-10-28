import { useState, useRef } from "react";
import {
  ShuffleIcon,
  EditIcon,
  OptionsDotsHorizontalIcon,
} from "../../../../assets/icons";
import { moneyFormat } from "../../../../common/functions";
import { Fund } from "../../../../common/types";
import Button from "../../../ui/Button";
import { ContextMenuItem, ContextMenu } from "../../../ui/ContextMenu";

import styles from "./SubFund.module.css";
import { useHandlers } from "../../../../common/hooks";
import clsx from "clsx";

interface SubFundProps {
  data: Fund;
}

export const SubFund = ({ data }: SubFundProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { handleMoneyTransfer, handleSubFundEdit } = useHandlers();

  const menuItems: ContextMenuItem[] = [
    {
      id: "transferMoney",
      icon: <ShuffleIcon />,
      label: "Переместить деньги",
      color: "orange",
      onClick: () => {
        handleMoneyTransfer(data.id);
      },
    },
    {
      id: "editFund",
      icon: <EditIcon />,
      label: "Редактировать подфонд",
      color: "blue",
      onClick: () => {
        handleSubFundEdit(data.id);
      },
    },
  ];

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  return (
    <div className={styles.subFundItem}>
      <div className={styles.subFundCont}>
        <div className={clsx("text_medium_bold", styles.subfundTitle)}>
          {data.name}
        </div>
        <div className={clsx("text_small", styles.subfundDesc)}>
          {moneyFormat(data.balance)}
        </div>
      </div>
      <Button
        icon={<OptionsDotsHorizontalIcon />}
        onClick={handleOptions}
        size="small"
        ref={buttonRef}
        variant="outline"
      />
      <ContextMenu
        anchorRef={buttonRef}
        items={menuItems}
        open={isOptionsOpen}
        placement="bottom end"
        onClose={() => setIsOptionsOpen(false)}
      />
    </div>
  );
};
