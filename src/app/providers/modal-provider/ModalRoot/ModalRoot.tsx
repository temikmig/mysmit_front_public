import { ModalItem, ModalMetrics } from "./../ModalContext";
import { ModalInstance } from "./ModalInstance";

interface ModalRootProps {
  stack: ModalItem[];
  closeModal: () => void;
  setMetrics: (metrics: ModalMetrics) => void;
  fullSizeStack: boolean[];
  toggleFullSize: (index: number) => void;
}

export const ModalRoot = ({
  stack,
  closeModal,
  setMetrics,
  fullSizeStack,
  toggleFullSize,
}: ModalRootProps) => {
  if (stack.length === 0) return null;

  return (
    <>
      {stack.map((modal, i) => (
        <ModalInstance
          key={i}
          modal={modal}
          index={i}
          fullSize={fullSizeStack[i]}
          toggleFullSize={toggleFullSize}
          closeModal={closeModal}
          setMetrics={setMetrics}
        />
      ))}
    </>
  );
};
