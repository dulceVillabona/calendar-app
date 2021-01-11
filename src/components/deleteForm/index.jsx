import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "semantic-ui-react";

import { deleteReminder } from "../../store/actions";

const DeleteForm = ({
  day,
  month,
  trigger,
  deleteReminder,
  reminders,
  reminderToDelete,
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    let filteredReminders = [];
    if (reminderToDelete) {
      filteredReminders = reminders.filter(
        (reminder) => reminder.creationId !== reminderToDelete.creationId
      );
    } else {
      filteredReminders = reminders.filter(
        (reminder) => !(reminder.day === day && reminder.month === month)
      );
    }
    deleteReminder(filteredReminders);
    setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Delete reminders</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            {" "}
            {reminderToDelete
              ? "Are you sure you want to delete this reminder?"
              : "Are you sure you want to delete all the reminders for this day?"}
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
    reminders: state.reminders.storedReminders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteReminder: (data) => dispatch(deleteReminder(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteForm);
