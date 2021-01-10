import React from "react";

import RemainderDetails from "../remainderDetails";

const Remainder = ({ info }) => {
  const { color, time, city, title, day, month } = info;
  return (
    <RemainderDetails
      remainder={info}
      trigger={
        <div className={`remainderDiv ${color}`}>
          <p>{`${time} : ${title}`}</p>
        </div>
      }
    />
  );
};

export default Remainder;
