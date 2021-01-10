import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Button, Input, Form, Checkbox, Label, Modal } from "semantic-ui-react";

import { addRemainder, editRemainder } from "../../store/actions";

const RemainderForm = ({
  day,
  month,
  trigger,
  addRemainder,
  editRemainder,
  remainderToEdit,
  remainders,
}) => {
  const [remainderValues, setRemainderValues] = useState(
    remainderToEdit
      ? { ...remainderToEdit }
      : { title: "", time: "12.00", color: "pink", city: "Tandil" }
  );

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setRemainderValues(
      remainderToEdit
        ? { ...remainderToEdit }
        : { title: "", time: "12.00", color: "pink", city: "Tandil" }
    );
  }, [open]);

  const handleValueChange = (field, value) => {
    setRemainderValues({
      ...remainderValues,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (remainderToEdit) {
      const updatedRemainders = remainders.map((remainder) => {
        if (remainder.creationId === remainderToEdit.creationId) {
          return {
            ...remainder,
            title: remainderValues.title,
            color: remainderValues.color,
            time: remainderValues.time,
            city: remainderValues.city,
          };
        } else return remainder;
      });
      editRemainder(updatedRemainders);
    } else {
      const newRemainder = {
        ...remainderValues,
        day: day,
        month: month,
        creationId: moment().format(),
      };
      addRemainder(newRemainder);
    }
    setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Add new remainder</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div className="remainderForm">
            <Form>
              <Form.Field>
                <Label size="large">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="remainderTitle"
                  onChange={(e) => handleValueChange("title", e.target.value)}
                  required
                  value={remainderValues.title}
                />
              </Form.Field>
              <Form.Field>
                <Label size="large">Time</Label>
                <Input
                  type="text"
                  name="time"
                  id="remainderTime"
                  onChange={(e) => handleValueChange("time", e.target.value)}
                  required
                  value={remainderValues.time}
                />
              </Form.Field>
              <Form.Field>
                <Label size="large">Color</Label>
                <Checkbox
                  radio
                  name="color"
                  value="pink"
                  checked={remainderValues.color === "pink"}
                  onChange={() => handleValueChange("color", "pink")}
                />
                <Label circular color="pink" empty size="medium" />
                <Checkbox
                  radio
                  name="color"
                  value="blue"
                  checked={remainderValues.color === "blue"}
                  onChange={() => handleValueChange("color", "blue")}
                />
                <Label circular color="blue" empty size="medium" />
                <Checkbox
                  radio
                  name="color"
                  value="green"
                  checked={remainderValues.color === "green"}
                  onChange={() => handleValueChange("color", "green")}
                />
                <Label circular color="green" empty size="medium" />
                <Checkbox
                  radio
                  name="color"
                  value="yellow"
                  checked={remainderValues.color === "yellow"}
                  onChange={() => handleValueChange("color", "yellow")}
                />
                <Label circular color="yellow" empty size="medium" />
              </Form.Field>
              {/* <Form.Field>
                <Button onClick={() => setShouldClose(true)} color="black">
                  Cancel
                </Button>
                <Button onClick={() => handleSubmit()} color="green">
                  Save
                </Button>
              </Form.Field> */}
            </Form>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={() => handleSubmit()}>
          Save
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
    addRemainder: (data) => dispatch(addRemainder(data)),
    editRemainder: (data) => dispatch(editRemainder(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemainderForm);
