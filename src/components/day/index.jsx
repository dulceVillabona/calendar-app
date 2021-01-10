import React from "react";

import { Button } from "semantic-ui-react";

import RemainderForm from "../remainderForm";
import DeleteForm from "../deleteForm";
import Remainder from "../remainder";

const Day = ({ dayNumber, monthNumber, remainders }) => {
  return (
    <div className="dayDiv">
      <div className="dayHeader">{dayNumber}</div>
      <div className="dayRemaindersDiv">
        {remainders.length
          ? remainders.map((remainder, index) => {
              return (
                <Remainder id={`${dayNumber}-${index}`} info={remainder} />
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
        <RemainderForm
          day={dayNumber}
          month={monthNumber}
          trigger={<Button circular icon="add" />}
        ></RemainderForm>
      </div>
    </div>
  );
};

export default Day;
