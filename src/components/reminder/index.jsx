import React from "react";

import ReminderDetails from "../reminderDetails";

const Reminder = ({ info }) => {
  const { color, time, city, title, day, month } = info;
  return (
    <ReminderDetails
      reminder={info}
      trigger={
        <div className={`reminderDiv ${color}`}>
          <p>{`${time} : ${title}`}</p>
        </div>
      }
    />
  );
};

export default Reminder;
