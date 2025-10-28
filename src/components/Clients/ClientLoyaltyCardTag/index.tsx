import styles from "./ClientLoyaltyCardTag.module.css";
import { Tag } from "../../ui/Tag";
import {
  LOYALTY_CARD_LEVEL_LABELS,
  type LoyaltyСardLevel,
} from "../../../common/types";

interface ClientLoyaltyCardTagProps {
  loyaltyСardLevel: LoyaltyСardLevel;
  min?: boolean;
}

export const ClientLoyaltyCardTag = ({
  loyaltyСardLevel,
  min = false,
}: ClientLoyaltyCardTagProps) => {
  return (
    <Tag
      text={LOYALTY_CARD_LEVEL_LABELS[loyaltyСardLevel]}
      className={styles[loyaltyСardLevel]}
      min={min}
    />
  );
};
