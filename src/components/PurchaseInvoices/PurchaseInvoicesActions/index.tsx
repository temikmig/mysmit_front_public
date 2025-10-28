/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadgeIcon,
  CrossCircleIcon,
  EditIcon,
  RedoIcon,
} from "../../../assets/icons";
import { TableActionsCont, TableAction } from "../../ui/TableActions";
import {
  PurchaseInvoiceStatusEnum,
  type Employee,
  type PurchaseInvoice,
} from "../../../common/types";
import { useHandlers } from "../../../common/hooks";

interface PurchaseInvoicesActionsProps {
  purchaseInvoice: PurchaseInvoice;
  refetch: () => void;
}

export const PurchaseInvoicesActions = ({
  purchaseInvoice,
  refetch,
}: PurchaseInvoicesActionsProps) => {
  const {
    handlePurchaseInvoiceCard,
    handlePurchaseInvoiceCancel,
    handlePurchaseInvoiceInvalid,
  } = useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Карточка"
        icon={<BadgeIcon />}
        onClick={() => {
          handlePurchaseInvoiceCard(purchaseInvoice.id);
        }}
      />
      <TableAction
        tooltip={
          purchaseInvoice.status === PurchaseInvoiceStatusEnum.APPROVED
            ? "Откатить"
            : undefined
        }
        icon={<RedoIcon color="var(--icons-gray)" />}
        onClick={() => {
          handlePurchaseInvoiceCancel(purchaseInvoice.id);
        }}
      />
      <TableAction
        tooltip={
          purchaseInvoice.status === PurchaseInvoiceStatusEnum.APPROVED
            ? "Аннулировать"
            : undefined
        }
        icon={<CrossCircleIcon color="var(--icons-red)" />}
        onClick={() => {
          handlePurchaseInvoiceInvalid(purchaseInvoice.id);
        }}
      />
    </TableActionsCont>
  );
};
