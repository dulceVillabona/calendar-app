import React, { useState, useEffect } from "react";

import { Button, Modal } from "semantic-ui-react";
import RemainderForm from "../remainderForm";
import DeleteForm from "../deleteForm";

const RemainderDetails = ({ remainder, trigger }) => {
  const { color, title, time, city } = remainder;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [remainder]);
  
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header className={color}>{title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>{`Time: ${time}`}</p>
          <p>{`City: ${city}`}</p>
          <p>Forecast:</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <DeleteForm
          trigger={<Button color="black">Delete</Button>}
          remainderToDelete={remainder}
        />

        <RemainderForm
          type="edit"
          remainderToEdit={remainder}
          trigger={<Button color="blue">Edit</Button>}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default RemainderDetails;
