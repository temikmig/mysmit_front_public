import { useRef, useState } from "react";
import {
  DeleteIcon,
  EditIcon,
  OptionsDotsHorizontalIcon,
} from "../../../../assets/icons";

import styles from "./StorageCardOptions.module.css";
import { ContextMenu, type ContextMenuItem } from "../../ContextMenu";

export const StorageCardOptions = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <EditIcon />,
      label: "Редактировать cклад",
      color: "default",
      onClick: () => alert("Edit!"),
    },
    {
      id: "delete",
      icon: <DeleteIcon />,
      label: "Удалить",
      color: "red",
      onClick: () => alert("Delete!"),
    },
  ];

  const handleOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsOptionsOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        ref={buttonRef}
        className={styles.cardOptions}
        onClick={handleOptions}
      >
        <OptionsDotsHorizontalIcon />
      </button>
      <ContextMenu
        anchorRef={buttonRef}
        items={items}
        open={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
      />
    </div>
  );
};
