import React from "react";
import styles from "./TotalDays.module.css";

interface TotalDaysProps {
  amount: number;
}

const TotalDays: React.FC<TotalDaysProps> = (props: TotalDaysProps) => {
  return (
    <div className={styles.content}>
      <p>Available vacation days: {props.amount}</p>
    </div>
  );
};

export default TotalDays;
