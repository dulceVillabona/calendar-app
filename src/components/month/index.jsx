import React from "react";

import Day from "../day";
import { DAYS, FULL_DAYS, getDaysInMonth, getDayOfWeek } from "../../utils.js";

const Month = ({ monthNumber, monthRemainders }) => {
 

  const currentDays = getDaysInMonth(monthNumber);
  const firstDayOfMonth = getDayOfWeek(monthNumber, 1);

  const createDays = () => {
    let days = [];
    let currPos = 0;
    let prevMonthNumber = monthNumber !== 0 ? monthNumber - 1 : 11;
    let prevMonthDays = getDaysInMonth(prevMonthNumber);

    while (DAYS.indexOf(firstDayOfMonth) > currPos) {
      const currentDay = prevMonthDays - DAYS.indexOf(firstDayOfMonth) + 1 + currPos
      days.push(
        <div className={`disabledDayDiv ${getDayOfWeek(prevMonthNumber, currentDay, prevMonthNumber === 11 ? 2020 : 2021) === "Sat" || getDayOfWeek(prevMonthNumber, currentDay, prevMonthNumber === 11 ? 2020 : 2021) === "Sun" ? 'weekEndDay' : ''}`}>
          <div className="dayHeader">
            {currentDay}
          </div>
        </div>
      );
      currPos++;
    }

    for (let i = 1; i <= currentDays; i++) {
      const dayRemainders = monthRemainders.filter(
        (remainder) => remainder.day === i
      );
      days.push(
        <Day
          dayNumber={i}
          remainders={dayRemainders}
          monthNumber={monthNumber}
          isWeekEnd={getDayOfWeek(monthNumber, i) === "Sat" || getDayOfWeek(monthNumber, i) === "Sun"}
        />
      );
    }
    let nextMonthDays = 1;
    while (days.length < 35 || (days.length > 35 && days.length < 42)) {
      days.push(
        <div className={`disabledDayDiv ${getDayOfWeek(monthNumber+1, nextMonthDays) === "Sat" || getDayOfWeek(monthNumber+1, nextMonthDays) === "Sun" ? 'weekEndDay' : ''}`}>
          <div className="dayHeader">{nextMonthDays}</div>
        </div>
      );
      nextMonthDays++;
    }
    return days;
  };

  return (
    <div className="monthContainer">
      <div className="namesHeader">
        {FULL_DAYS.map((day) => (
          <h2>{day}</h2>
        ))}
      </div>
      <div className="daysContainer">{createDays()}</div>
    </div>
  );
};

export default Month;
