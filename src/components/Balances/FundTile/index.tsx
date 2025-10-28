import clsx from "clsx";
import styles from "./FundTile.module.css";
import {
  EditIcon,
  OptionsDotsHorizontalIcon,
  SettingsIcon,
  ShuffleIcon,
} from "../../../assets/icons";
import { ContextMenu, ContextMenuItem } from "../../ui/ContextMenu";
import { useRef, useState } from "react";
import { Fund, FundType, FundTypeEnum } from "../../../common/types";
import { SubFund } from "./SubFund";
import { IconButton } from "../../ui/IconButton";
import { moneyFormat } from "../../../common/functions";
import { useHandlers } from "../../../common/hooks";
import { DraggableSyntheticListeners } from "@dnd-kit/core";

interface FundTileProps {
  fund: Fund;
  dragHandleProps?: {
    listeners: DraggableSyntheticListeners;
    attributes: React.HTMLAttributes<HTMLElement>;
  };
}

export const FundTile = ({ fund, dragHandleProps }: FundTileProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { handleMoneyTransfer, handleSubFundAdd, handleSubFundEdit } =
    useHandlers();

  const menuItems: ContextMenuItem[] = [
    fund.children.length === 0 && {
      id: "transferMoney",
      icon: <ShuffleIcon />,
      label: "Переместить деньги",
      color: "orange",
      onClick: () => {
        handleMoneyTransfer(fund.id);
      },
    },
    {
      id: "editFund",
      icon: <EditIcon />,
      label: "Редактировать фонд",
      color: "blue",
      onClick: () => {
        handleSubFundEdit(fund.id);
      },
    },
    (
      [
        FundTypeEnum.CUSTOM,
        FundTypeEnum.BUSINESS_FUND,
        FundTypeEnum.SALARY_FUND,
      ] as FundType[]
    ).includes(fund.type) && {
      id: "addSubFund",
      icon: <SettingsIcon />,
      label: "Добавить подфонд",
      color: "blue",
      onClick: () => {
        handleSubFundAdd(fund.id);
      },
    },
  ].filter(Boolean) as ContextMenuItem[];

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  return (
    <div className={clsx("shadow-container", styles.fundTileCont)}>
      <div className={styles.fundHead}>
        <div className={styles.fundTitleCont}>
          <h5
            className={styles.fundTitle}
            {...(dragHandleProps ? dragHandleProps.attributes : {})}
            {...(dragHandleProps ? dragHandleProps.listeners : {})}
          >
            {fund.name}
          </h5>
          <IconButton
            icon={<OptionsDotsHorizontalIcon color="var(--icons-white)" />}
            onClick={handleOptions}
            ref={buttonRef}
            size="big"
          />
          <ContextMenu
            anchorRef={buttonRef}
            items={menuItems}
            open={isOptionsOpen}
            placement="bottom end"
            onClose={() => setIsOptionsOpen(false)}
          />
        </div>
        <p className={styles.fundTileContent}>{moneyFormat(fund.balance)}</p>
      </div>
      <div className={styles.subFundsCont}>
        {(
          [
            FundTypeEnum.CUSTOM,
            FundTypeEnum.SYSTEM_FUND,
            FundTypeEnum.BUSINESS_FUND,
          ] as FundType[]
        ).includes(fund.type) && (
          <>
            {fund.children.length > 0 ? (
              <>
                {fund.children.map((subFund) => (
                  <SubFund key={subFund.name} data={subFund} />
                ))}
              </>
            ) : (
              <p className={clsx("text_medium", styles.emptyData)}>
                Подфонды отсутствуют
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
