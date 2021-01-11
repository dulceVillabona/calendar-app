import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "semantic-ui-react";

import { deleteRemainder } from "../../store/actions";

const DeleteForm = ({
  day,
  month,
  trigger,
  deleteRemainder,
  remainders,
  remainderToDelete,
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    let filteredRemainders = [];
    if (remainderToDelete) {
      filteredRemainders = remainders.filter(
        (remainder) => remainder.creationId !== remainderToDelete.creationId
      );
    } else {
      filteredRemainders = remainders.filter(
        (remainder) => !(remainder.day === day && remainder.month === month)
      );
    }
    deleteRemainder(filteredRemainders);
    setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Delete remainders</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            {" "}
            {remainderToDelete
              ? "Are you sure you want to delete this remainder?"
              : "Are you sure you want to delete all the remainders for this day?"}
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={() => handleSubmit()}>
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    remainders: state.remainders.storedRemainders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRemainder: (data) => dispatch(deleteRemainder(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteForm);
