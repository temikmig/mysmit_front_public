import React from "react";
import styles from "./MasonryGrid.module.css";

type MasonryItem = {
  content: React.ReactNode;
};

interface MasonryProps {
  items: MasonryItem[];
  columns?: number;
}

const MasonryGrid: React.FC<MasonryProps> = ({ items, columns = 4 }) => {
  return (
    <div className={styles.masonry} style={{ columnCount: columns }}>
      {items.map((item, index) => (
        <div key={index} className={styles.masonryItem}>
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
