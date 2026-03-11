import { createContext, useContext } from "react";
import { ReactNode } from "react";

export interface ModalItem {
  title?: string;
  isCloseOverlay?: boolean;
  closeButton?: boolean;
  fullsizeButton?: boolean;
  width?: number;
  content: ReactNode;
  url?: string;
  pushUrl?: boolean;
  basePath?: string;
  parentIndex?: number;
}

export interface ModalMetrics {
  height: number;
  width: number;
}

export interface ModalContextValue {
  openModal: (modal: ModalItem) => void;
  closeModal: () => void;
  isFullScreen: boolean;
  metrics: ModalMetrics | null;
}

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined,
);

export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
