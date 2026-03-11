import { FC, ReactNode } from "react";

import { BoxStyled } from "./ActionsBox.styled";

interface ActionsBoxProps {
  children: ReactNode;
}

export const ActionsBox: FC<ActionsBoxProps> = ({ children }) => {
  return <BoxStyled>{children}</BoxStyled>;
};
