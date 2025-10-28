import styles from "./Modal.module.css";
import { CrossSmallIcon } from "../../../assets/icons";
import type { ModalData } from "../../../common/contexts/Modal/types";
import Button from "../Button";

interface ModalProps extends ModalData {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({
  isOpen,
  onClose,
  closeButton = true,
  title,
  description,
  content,
  primaryButton,
  secondaryButton,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalCont}>
      {title && <h4>{title}</h4>}
      {description && <p className="text_medium">{description}</p>}
      {closeButton && (
        <button className={styles.closeModal} onClick={onClose}>
          <CrossSmallIcon />
        </button>
      )}
      {content && <div className={styles.modalContent}>{content}</div>}
      {(primaryButton || secondaryButton) && (
        <div className={styles.modalButtons}>
          {secondaryButton && (
            <Button
              variant="secondary"
              onClick={secondaryButton.onClick}
              disabled={secondaryButton.disabled}
            >
              {secondaryButton.text}
            </Button>
          )}
          {primaryButton && (
            <Button
              onClick={primaryButton.onClick}
              disabled={primaryButton.disabled}
            >
              {primaryButton.text}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
