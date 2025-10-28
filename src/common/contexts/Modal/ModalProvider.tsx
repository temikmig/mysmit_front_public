import { useState, useRef, type ReactNode } from "react";
import { type ModalData, type ModalItem } from "./types";
import { ModalContext } from "./ModalContext";
import { Dropdown } from "../../../components/ui/Dropdown";
import { Modal } from "../../../components/ui/Modal";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalItem[]>([]);
  const centerRef = useRef<HTMLDivElement>(null);

  const openModal = (data: ModalData) => {
    const id = Math.random().toString(36).slice(2);
    setModals((prev) => [...prev, { id, data, open: true }]);
    return id;
  };

  const closeModal = (id: string) => {
    setModals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, open: false } : m))
    );
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modal) => {
        return (
          <Dropdown
            key={modal.id}
            anchorRef={centerRef}
            open={modal.open}
            onClose={() => closeModal(modal.id)}
            placement="center"
            className="no-overflow"
            modal
            overlay
            overlayClose={
              modal.data.closeButton !== undefined ||
              modal.data.overlayClose !== undefined
            }
            width={modal.data.width}
          >
            <Modal
              isOpen
              onClose={() => closeModal(modal.id)}
              content={modal.data.content}
              closeButton={modal.data.closeButton}
              title={modal.data.title}
              description={modal.data.description}
              primaryButton={modal.data.primaryButton}
              secondaryButton={modal.data.secondaryButton}
            />
          </Dropdown>
        );
      })}
    </ModalContext.Provider>
  );
};
