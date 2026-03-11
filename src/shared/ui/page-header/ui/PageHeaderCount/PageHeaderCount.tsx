import { FC, ReactNode } from "react";

import { Count, PageHeaderCountBox } from "./PageHeaderCount.styled";

interface PageHeaderCountProps {
  count?: number;
  children: ReactNode;
  isActive?: boolean;
  isAlert?: boolean;
}

export const PageHeaderCount: FC<PageHeaderCountProps> = ({
  count,
  children,
  isActive = false,
  isAlert = false,
}) => {
  return (
    <PageHeaderCountBox>
      {children}
      <Count isActive={isActive} isAlert={isAlert}>
        {count}
      </Count>
    </PageHeaderCountBox>
  );
};
