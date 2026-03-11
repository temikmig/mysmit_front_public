import { FC } from "react";

import { useBusinessConsts } from "@entities/businessConsts";
import { Loader } from "@shared/ui";

import { BusinessConstsEditForm } from "../BusinessConstsEditForm";

export const BusinessConstsEditModal: FC = () => {
  const { businessConsts, isLoading } = useBusinessConsts();

  if (isLoading || !businessConsts) return <Loader />;

  return <BusinessConstsEditForm businessConsts={businessConsts} />;
};
