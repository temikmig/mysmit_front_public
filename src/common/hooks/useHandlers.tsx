import { FundAdd } from "../../components/Balances/FundAdd";
import { FundEdit } from "../../components/Balances/FundEdit";
import { MoneyDistribute } from "../../components/Balances/MoneyDistribute";
import { MoneySourceMovement } from "../../components/Balances/MoneySourceMovement";
import { MoneyTransfer } from "../../components/Balances/MoneyTransfer";
import {
  BusinessExpenseAdd,
  BusinessExpenseCard,
  BusinessExpenseDelete,
  BusinessExpenseEdit,
} from "../../components/BusinessExpenses";
import { BusinessPercentagesCard } from "../../components/BusinessPercentages";
import {
  ChecklistAdd,
  ChecklistCard,
  ChecklistInvalid,
} from "../../components/Checklists";
import {
  ClientAdd,
  ClientCarAdd,
  ClientCard,
  ClientCarDelete,
  ClientCarEdit,
  ClientDelete,
  ClientEdit,
  ClientTransferLoyaltyBalanceReserve,
} from "../../components/Clients";
import {
  ClientSourceAdd,
  ClientSourceCard,
  ClientSourceDelete,
  ClientSourceEdit,
} from "../../components/ClientSources";
import {
  EmployeeAdd,
  EmployeeCard,
  EmployeeDelete,
  EmployeeEdit,
  EmployeeTransferSalary,
  EmployeeTransferSalaryReserve,
} from "../../components/Employees";
import {
  InventoryAdd,
  InventoryCard,
  InventoryConfirm,
  InventoryDelete,
  InventoryReject,
} from "../../components/Inventory";
import {
  MoneyMovementDelete,
  MoneyMovementEdit,
} from "../../components/MoneyMovements";
import {
  PiggyBankAdd,
  PiggyBankDelete,
  PiggyBankEdit,
} from "../../components/PlansReports";
import {
  ProductAdd,
  ProductBatches,
  ProductCard,
  ProductDelete,
  ProductEdit,
  ProductTransferReserve,
  ProductWriteOff,
  ProductWriteOffEdit,
  ProductWriteOffHistory,
} from "../../components/Products";
import {
  PurchaseInvoiceCancel,
  PurchaseInvoiceCard,
  PurchaseInvoiceInvalid,
  PurchaseInvoicesAdd,
} from "../../components/PurchaseInvoices";
import {
  ServiceCard,
  ServiceAdd,
  ServiceEdit,
  ServiceDelete,
} from "../../components/Services";
import {
  SupplierCard,
  SupplierAdd,
  SupplierEdit,
  SupplierDelete,
} from "../../components/Suppliers";
import {
  UserCard,
  UserAdd,
  UserEdit,
  UserEditMe,
  UserEditPassword,
  UserEditMyPassword,
} from "../../components/Users";
import { UserDelete } from "../../components/Users/UserDelete";
import { PiggyBank, Product, Supplier } from "../types";
import { useModal } from "./useModal";

export const useHandlers = () => {
  const { openModal, closeModal } = useModal();

  const handleBusinessPercentagesCard = () => {
    const modalId = openModal({
      content: (
        <BusinessPercentagesCard
          onCloseModal={() => {
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  // товары

  const handleProductCard = (productId: number) => {
    openModal({
      content: <ProductCard productId={productId} />,
    });
  };

  const handleProductBatches = (productId: number) => {
    openModal({
      content: <ProductBatches productId={productId} />,
    });
  };

  const handleProductWriteOff = (productId: number, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Ручное списание товара",
      content: (
        <ProductWriteOff
          productId={productId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleProductWriteOffEdit = (
    productId: number,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Изменить цену списания",
      content: (
        <ProductWriteOffEdit
          productId={productId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleProductWriteOffHistory = (productId: number) => {
    openModal({
      content: <ProductWriteOffHistory productId={productId} />,
    });
  };

  const handleProductAdd = (
    onSuccess?: (product?: Product) => void,
    inputValue?: string
  ) => {
    const modalId = openModal({
      title: "Добавить товар",
      content: (
        <ProductAdd
          onSuccess={(product?: Product) => {
            onSuccess?.(product);
            closeModal(modalId);
          }}
          inputValue={inputValue}
        />
      ),
    });
  };

  const handleProductEdit = (productId: number, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Редактировать информацию",
      content: (
        <ProductEdit
          productId={productId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleProductDelete = (productId: number, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <ProductDelete
          productId={productId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleProductTransferReserve = (
    productId: number,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Переместить резерв",
      content: (
        <ProductTransferReserve
          productId={productId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  // чеклисты

  const handleChecklistAdd = (onSuccess: () => void) => {
    const modalId = openModal({
      title: "Создание чек-листа",
      content: (
        <ChecklistAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleChecklistCard = (checklistId: string) => {
    openModal({
      content: <ChecklistCard checklistId={checklistId} />,
    });
  };

  const handleChecklistInvalid = (
    checklistId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Аннулировать чек-лист",
      content: (
        <ChecklistInvalid
          checklistId={checklistId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  // поставщики

  const handleSupplierCard = (supplierId: number) => {
    openModal({
      content: <SupplierCard supplierId={supplierId} />,
    });
  };

  const handleSupplierAdd = (
    onSuccess?: (supplier?: Supplier) => void,
    inputValue?: string
  ) => {
    const modalId = openModal({
      title: "Добавление поставщика",
      content: (
        <SupplierAdd
          inputValue={inputValue}
          onSuccess={(supplier) => {
            onSuccess?.(supplier);
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleSupplierEdit = (supplierId: number, onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <SupplierEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          supplierId={supplierId}
        />
      ),
    });
  };

  const handleSupplierDelete = (supplierId: number, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <SupplierDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          supplierId={supplierId}
        />
      ),
    });
  };

  // источники клиентов

  const handleClientSourceCard = (clientSourceId: string) => {
    openModal({
      content: <ClientSourceCard clientSourceId={clientSourceId} />,
    });
  };

  const handleClientSourceAdd = (
    onSuccess?: () => void,
    inputValue?: string
  ) => {
    const modalId = openModal({
      title: "Добавление поставщика",
      content: (
        <ClientSourceAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          inputValue={inputValue}
        />
      ),
    });
  };

  const handleClientSourceEdit = (
    clientSourceId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      content: (
        <ClientSourceEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          clientSourceId={clientSourceId}
        />
      ),
    });
  };

  const handleClientSourceDelete = (
    clientSourceId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <ClientSourceDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          clientSourceId={clientSourceId}
        />
      ),
    });
  };

  // пользователи

  const handleUserCard = (userId: string) => {
    openModal({
      content: <UserCard userId={userId} />,
    });
  };

  const handleUserAdd = (onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Добавление пользователя",
      content: (
        <UserAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleUserEdit = (userId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Редактировать пользователя",
      content: (
        <UserEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          userId={userId}
        />
      ),
    });
  };

  const handleUserEditMe = (onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Редактировать пользователя",
      content: (
        <UserEditMe
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleUserEditPassword = (userId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Изменить пароль",
      content: (
        <UserEditPassword
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          userId={userId}
        />
      ),
    });
  };

  const handleUserEditMyPassword = (onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Изменить пароль",
      content: (
        <UserEditMyPassword
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleUserDelete = (userId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <UserDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          userId={userId}
        />
      ),
    });
  };

  // услуги

  const handleServiceCard = (serviceId: number) => {
    openModal({
      content: <ServiceCard serviceId={serviceId} />,
    });
  };

  const handleServiceAdd = (onSuccess?: () => void, inputValue?: string) => {
    const modalId = openModal({
      title: "Добавление услуги",
      content: (
        <ServiceAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          inputValue={inputValue}
        />
      ),
    });
  };

  const handleServiceEdit = (serviceId: number, onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <ServiceEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          serviceId={serviceId}
        />
      ),
    });
  };

  const handleServiceDelete = (serviceId: number, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <ServiceDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          serviceId={serviceId}
        />
      ),
    });
  };

  // клиенты

  const handleClientCard = (clientId: string) => {
    openModal({
      content: <ClientCard clientId={clientId} />,
    });
  };

  const handleClientAdd = (onSuccess?: () => void, inputValue?: string) => {
    const modalId = openModal({
      title: "Добавление клиента",
      content: (
        <ClientAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          inputValue={inputValue}
        />
      ),
    });
  };

  const handleClientEdit = (clientId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <ClientEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          clientId={clientId}
        />
      ),
    });
  };

  const handleClientDelete = (clientId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <ClientDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          clientId={clientId}
        />
      ),
    });
  };

  const handleClientCarAdd = (
    clientId: string,
    onSuccess?: () => void,
    currentInput?: string
  ) => {
    const modalId = openModal({
      title: "Добавление автомобиля",
      content: (
        <ClientCarAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          clientId={clientId}
          currentInput={currentInput}
        />
      ),
    });
  };

  const handleClientCarEdit = (carId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <ClientCarEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          carId={carId}
        />
      ),
    });
  };

  const handleClientCarDelete = (carId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <ClientCarDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          carId={carId}
        />
      ),
    });
  };

  const handleClientTransferLoyaltyBalanceReserve = (
    clientId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Переместить бонусный баланс",
      content: (
        <ClientTransferLoyaltyBalanceReserve
          clientId={clientId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  // сотрудники

  const handleEmployeeCard = (employeeId: string) => {
    openModal({
      content: <EmployeeCard employeeId={employeeId} />,
    });
  };

  const handleEmployeeAdd = (onSuccess?: () => void, inputValue?: string) => {
    const modalId = openModal({
      title: "Добавление сотрудника",
      content: (
        <EmployeeAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          inputValue={inputValue}
        />
      ),
    });
  };

  const handleEmployeeEdit = (employeeId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <EmployeeEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          employeeId={employeeId}
        />
      ),
    });
  };

  const handleEmployeeDelete = (employeeId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <EmployeeDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          employeeId={employeeId}
        />
      ),
    });
  };

  const handleEmployeeTransferSalaryReserve = (
    employeeId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Переместить резерв зарплаты",
      content: (
        <EmployeeTransferSalaryReserve
          employeeId={employeeId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleEmployeeTransferSalary = (
    employeeId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Начисление зарплаты",
      content: (
        <EmployeeTransferSalary
          employeeId={employeeId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  // накладная

  const handlePurchaseInvoiceCard = (purchaseInvoiceId: string) => {
    openModal({
      content: <PurchaseInvoiceCard purchaseInvoiceId={purchaseInvoiceId} />,
    });
  };

  const handlePurchaseInvoiceAdd = (
    productId?: number,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      content: (
        <PurchaseInvoicesAdd
          productId={productId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
      width: "70%",
    });
  };

  const handlePurchaseInvoiceCancel = (
    purchaseInvoiceId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Откатить накладную",
      content: (
        <PurchaseInvoiceCancel
          purchaseInvoiceId={purchaseInvoiceId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handlePurchaseInvoiceInvalid = (
    purchaseInvoiceId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Аннулировать накладную",
      content: (
        <PurchaseInvoiceInvalid
          purchaseInvoiceId={purchaseInvoiceId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  // движения денег

  const handleMoneySourceIncome = (
    sourceId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      content: (
        <MoneySourceMovement
          sourceId={sourceId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          type={"INCOME"}
        />
      ),
    });
  };

  const handleMoneySourceOutcome = (
    sourceId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      content: (
        <MoneySourceMovement
          sourceId={sourceId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          type={"OUTCOME"}
        />
      ),
    });
  };

  const handleMoneyDistribute = (onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <MoneyDistribute
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleMoneyTransfer = (fundFromId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <MoneyTransfer
          fundFromId={fundFromId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleFundAdd = (onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Добавить фонд",
      content: (
        <FundAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleSubFundAdd = (fundParentId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <FundAdd
          fundParentId={fundParentId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleSubFundEdit = (fundId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <FundEdit
          fundId={fundId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  // бизнес-затраты

  const handleBusinessExpenseCard = (businessExpenseId: string) => {
    openModal({
      content: <BusinessExpenseCard businessExpenseId={businessExpenseId} />,
    });
  };

  const handleBusinessExpenseAdd = (onSuccess?: () => void) => {
    const modalId = openModal({
      content: (
        <BusinessExpenseAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handleBusinessExpenseEdit = (
    businessExpenseId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      content: (
        <BusinessExpenseEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          businessExpenseId={businessExpenseId}
        />
      ),
    });
  };

  const handleBusinessExpenseDelete = (
    businessExpenseId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <BusinessExpenseDelete
          businessExpenseId={businessExpenseId}
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  // инвентаризация

  const handleInventoryAdd = (onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Инвентаризация",
      content: (
        <InventoryAdd
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
        />
      ),
      width: "80%",
    });
  };

  const handleInventoryCard = (inventoryId: string, refetch?: () => void) => {
    const modalId = openModal({
      content: (
        <InventoryCard
          inventoryId={inventoryId}
          closeModal={() => closeModal(modalId)}
          refetch={() => refetch?.()}
        />
      ),
    });
  };

  const handleInventoryConfirm = (
    inventoryId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      content: (
        <InventoryConfirm
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          inventoryId={inventoryId}
        />
      ),
    });
  };

  const handleInventoryReject = (
    inventoryId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      content: (
        <InventoryReject
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          inventoryId={inventoryId}
        />
      ),
    });
  };

  const handleInventoryDelete = (
    inventoryId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      content: (
        <InventoryDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          inventoryId={inventoryId}
        />
      ),
    });
  };

  // движения денег

  const handleMoneyMovementEdit = (
    moneyMovementId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Редактировать комментарий",
      content: (
        <MoneyMovementEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          moneyMovementId={moneyMovementId}
        />
      ),
    });
  };

  const handleMoneyMovementDelete = (
    moneyMovementId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <MoneyMovementDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          moneyMovementId={moneyMovementId}
        />
      ),
    });
  };

  // копилки

  const handlePiggyBankAdd = (
    onSuccess?: (piggyBank?: PiggyBank) => void,
    inputValue?: string
  ) => {
    const modalId = openModal({
      title: "Добавление копилки",
      content: (
        <PiggyBankAdd
          inputValue={inputValue}
          onSuccess={(piggyBank) => {
            onSuccess?.(piggyBank);
            closeModal(modalId);
          }}
        />
      ),
    });
  };

  const handlePiggyBankEdit = (piggyBankId: string, onSuccess?: () => void) => {
    const modalId = openModal({
      title: "Редактировать копилку",
      content: (
        <PiggyBankEdit
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          piggyBankId={piggyBankId}
        />
      ),
    });
  };

  const handlePiggyBankDelete = (
    piggyBankId: string,
    onSuccess?: () => void
  ) => {
    const modalId = openModal({
      title: "Подтвердите удаление",
      content: (
        <PiggyBankDelete
          onSuccess={() => {
            onSuccess?.();
            closeModal(modalId);
          }}
          piggyBankId={piggyBankId}
        />
      ),
    });
  };

  return {
    handleBusinessPercentagesCard,

    handleProductBatches,

    handleChecklistAdd,
    handleChecklistCard,
    handleChecklistInvalid,

    handleProductCard,
    handleProductAdd,
    handleProductEdit,
    handleProductDelete,
    handleProductWriteOff,
    handleProductWriteOffEdit,
    handleProductWriteOffHistory,
    handleProductTransferReserve,

    handleUserCard,
    handleUserAdd,
    handleUserEdit,
    handleUserEditMe,
    handleUserEditPassword,
    handleUserEditMyPassword,
    handleUserDelete,

    handleSupplierCard,
    handleSupplierAdd,
    handleSupplierEdit,
    handleSupplierDelete,

    handleClientSourceCard,
    handleClientSourceAdd,
    handleClientSourceEdit,
    handleClientSourceDelete,

    handleServiceCard,
    handleServiceAdd,
    handleServiceEdit,
    handleServiceDelete,

    handleClientCard,
    handleClientAdd,
    handleClientEdit,
    handleClientDelete,
    handleClientCarAdd,
    handleClientCarEdit,
    handleClientCarDelete,
    handleClientTransferLoyaltyBalanceReserve,

    handleEmployeeCard,
    handleEmployeeAdd,
    handleEmployeeEdit,
    handleEmployeeDelete,
    handleEmployeeTransferSalaryReserve,
    handleEmployeeTransferSalary,

    handlePurchaseInvoiceCard,
    handlePurchaseInvoiceAdd,
    handlePurchaseInvoiceCancel,
    handlePurchaseInvoiceInvalid,

    handleMoneySourceIncome,
    handleMoneySourceOutcome,
    handleMoneyDistribute,
    handleMoneyTransfer,

    handleFundAdd,
    handleSubFundAdd,
    handleSubFundEdit,

    handleBusinessExpenseCard,
    handleBusinessExpenseAdd,
    handleBusinessExpenseEdit,
    handleBusinessExpenseDelete,

    handleInventoryAdd,
    handleInventoryCard,
    handleInventoryConfirm,
    handleInventoryReject,
    handleInventoryDelete,

    handleMoneyMovementEdit,
    handleMoneyMovementDelete,

    handlePiggyBankAdd,
    handlePiggyBankEdit,
    handlePiggyBankDelete,
  };
};
