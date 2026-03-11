import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ModalContext, ModalItem, ModalMetrics } from "./ModalContext";
import { ModalRoot } from "./ModalRoot";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [stack, setStack] = useState<ModalItem[]>([]);
  const navigate = useNavigate();

  const openModal = (modal: ModalItem & { basePath?: string }) => {
    const modalWithDefaults: ModalItem = {
      isCloseOverlay: true,
      closeButton: true,
      fullsizeButton: false,
      width: 600,
      ...modal,
    };
    setStack((prev) => [...prev, modalWithDefaults]);

    if (modal.url && modal.pushUrl) {
      navigate(modal.url, {
        replace: false,
        state: { modal: true, basePath: modal.basePath },
      });
    }
  };

  const closeModal = () => {
    setStack((prev) => prev.slice(0, -1));
    const lastModal = stack[stack.length - 1];
    if (!lastModal) return;

    if (lastModal.url && lastModal.pushUrl) {
      const basePath = lastModal.basePath || "/";
      navigate(basePath, { replace: true });
    }
  };

  const [metrics, setMetrics] = useState<ModalMetrics | null>(null);
  const [fullSizeStack, setFullSizeStack] = useState<boolean[]>([]);

  const handleToggleFullSize = (index: number) => {
    setFullSizeStack((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const isFullScreen = fullSizeStack[stack.length - 1] ?? false;

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, metrics, isFullScreen }}
    >
      {children}
      <ModalRoot
        stack={stack}
        setMetrics={setMetrics}
        closeModal={closeModal}
        fullSizeStack={fullSizeStack}
        toggleFullSize={handleToggleFullSize}
      />
    </ModalContext.Provider>
  );
};
