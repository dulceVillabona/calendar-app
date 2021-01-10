import React from "react";
import moment from 'moment';

import Day from "../day";
import { MONTHS } from "../../utils.js";

const Month = ({ monthNumber, monthRemainders }) => {
  const currentDays = moment().daysInMonth();
  const createDays = () => {
    let days = [];
    for (let i = 1; i <= currentDays; i++) {
      const dayRemainders = monthRemainders.filter(
        (remainder) => remainder.day === i
      );
      days.push(<Day dayNumber={i} remainders={dayRemainders} monthNumber={monthNumber} />);
    }
    return days;
  };

  return (
    <div className="monthContainer">
        <h1>{MONTHS[monthNumber-1]}</h1>
      <div className="daysContainer">{createDays()}</div>
    </div>
  );
};

export default Month;
