import { useNavigate } from "react-router-dom";
import { getColorIndex } from "../../../common/functions";
import styles from "./StorageCard.module.css";
import { StorageCardOptions } from "./StorageCardOptions";

interface StorageCardProps {
  id: string;
  index: number;
  title: string;
  image?: string;
}

export const StorageCard = ({ id, index, title, image }: StorageCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${id}`);
  };

  return (
    <div className={styles.cardCont} onClick={handleClick}>
      <div
        className={styles.cardImage}
        style={{ backgroundColor: getColorIndex(index) }}
      >
        {image}
      </div>
      <div className={styles.cardData}>
        <div className={styles.cardTitle}>
          <p>Склад</p>
          <h5>{title}</h5>
        </div>
        <div className={styles.cardOptionsCont}>
          <StorageCardOptions />
        </div>
      </div>
    </div>
  );
};
