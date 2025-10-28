import catWork from "../../assets/catWork.svg";
import styles from "./DevelopMessage.module.css";

export const DevelopMessage = () => {
  return (
    <div className={styles.developMessageCont}>
      <img src={catWork} className="shadow-container" />
      <h5>
        Котик точно знает, что Тёма прямо сейчас работает над этим разделом, и
        активно ему в этом помогает
      </h5>
    </div>
  );
};
