import React from "react";

import { Button } from "semantic-ui-react";

import ReminderForm from "../reminderForm";
import DeleteForm from "../deleteForm";
import Reminder from "../reminder";

const Day = ({ dayNumber, monthNumber, reminders, isWeekEnd }) => {
  reminders.sort((a, b) => a.time > b.time ? 1 : -1);

  return (
    <div className={`dayDiv ${isWeekEnd ? 'weekEndDay' : ''}`}>
      <div className="dayHeader">{dayNumber}</div>
      <div className="dayRemindersDiv">
        {reminders.length
          ? reminders.map((reminder, index) => {
              return (
                <Reminder id={`${dayNumber}-${index}`} info={reminder} />
              );
            })
          : null}
      </div>
      <div className="dayFooter">
        <DeleteForm
          day={dayNumber}
          month={monthNumber}
          trigger={<Button circular icon="trash alternate" />}
        ></DeleteForm>
        <ReminderForm
          day={dayNumber}
          month={monthNumber}
          trigger={<Button circular icon="add" />}
        ></ReminderForm>
      </div>
    </div>
  );
};

export default Day;
