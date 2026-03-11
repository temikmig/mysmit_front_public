import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { DialogContent, IconButton } from "@mui/material";
import { FC, useEffect, useRef } from "react";

import {
  DialogStyled,
  DialogTitleStyled,
  DialogTitleButtons,
} from "./ModalRoot.styled";
import { ModalItem, ModalMetrics } from "../ModalContext";

interface ModalInstanceProps {
  modal: ModalItem;
  index: number;
  fullSize: boolean;
  toggleFullSize: (index: number) => void;
  closeModal: () => void;
  setMetrics: (metrics: ModalMetrics) => void;
}

export const ModalInstance: FC<ModalInstanceProps> = ({
  modal,
  index,
  fullSize,
  toggleFullSize,
  closeModal,
  setMetrics,
}) => {
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!paperRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!paperRef.current) return;
      const { clientHeight, clientWidth } = paperRef.current;
      setMetrics({ height: clientHeight, width: clientWidth });
    });

    observer.observe(paperRef.current);

    return () => observer.disconnect();
  }, [fullSize]);

  return (
    <DialogStyled
      open
      onClose={modal.isCloseOverlay ? closeModal : undefined}
      fullScreen={fullSize}
      maxWidth={false}
      PaperProps={{
        ref: paperRef,
        sx: {
          width: fullSize ? "100%" : modal.width,
          maxWidth: "100%",
          position: "absolute",
          zIndex: 130000 + index,
        },
      }}
    >
      {modal.title && (
        <DialogTitleStyled onDoubleClick={() => toggleFullSize(index)}>
          {modal.title}
          {(modal.fullsizeButton || modal.closeButton) && (
            <DialogTitleButtons>
              {modal.fullsizeButton && (
                <IconButton onClick={() => toggleFullSize(index)}>
                  {fullSize ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
                </IconButton>
              )}
              {modal.closeButton && (
                <IconButton onClick={closeModal}>
                  <CloseIcon />
                </IconButton>
              )}
            </DialogTitleButtons>
          )}
        </DialogTitleStyled>
      )}
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        {modal.content}
      </DialogContent>
    </DialogStyled>
  );
};
