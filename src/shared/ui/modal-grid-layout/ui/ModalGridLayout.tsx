import { FC, PropsWithChildren } from "react";

import { ModalGridLayoutRoot } from "./ModalGridLayout.styled";

type Props = PropsWithChildren<{
  fullscreen?: boolean;
  isMobile?: boolean;
}>;

export const ModalGridLayout: FC<Props> = ({
  fullscreen,
  children,
  isMobile,
}) => {
  return (
    <ModalGridLayoutRoot fullscreen={fullscreen} isMobile={isMobile}>
      {children}
    </ModalGridLayoutRoot>
  );
};
