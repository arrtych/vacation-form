import React from "react";

interface TotalDaysProps {
  amount: number;
}

const TotalDays: React.FC<TotalDaysProps> = (props: TotalDaysProps) => {
  return (
    <div>
      <p>Available vacation days: {props.amount}</p>
    </div>
  );
};

export default TotalDays;
