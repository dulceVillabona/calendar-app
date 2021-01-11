import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Button,
  Input,
  Form,
  Checkbox,
  Label,
  Modal,
  Dropdown,
} from "semantic-ui-react";

import { addReminder, editReminder } from "../../store/actions";

import { MONTHS, getDaysInMonth } from "../../utils";

const ReminderForm = ({
  day,
  month,
  trigger,
  addReminder,
  editReminder,
  reminderToEdit,
  reminders,
  countries,
}) => {
  const [cityOptions, setCityOptions] = useState();
  const [reminderValues, setReminderValues] = useState(
    reminderToEdit
      ? { ...reminderToEdit }
      : {
          title: "",
          time: "12:00",
          color: "pink",
          country: "Afghanistan",
          city: cityOptions ? cityOptions[0].value : "",
          day: day,
          month: month,
        }
  );

  const countryOptions = countries.map((countryOb) => {
    return {
      key: countryOb.country,
      value: countryOb.country,
      text: countryOb.country,
    };
  });

  const monthOptions = MONTHS.map((month, index) => {
    return { key: index, value: index, text: month };
  });

  const createDayOptions = () => {
    if (reminderToEdit) {
      const daysOptions = [];
      const totalDays = getDaysInMonth(reminderToEdit.month);
      for (let i = 1; i <= totalDays; i++) {
        daysOptions.push({ key: i, value: i, text: i });
      }
      return daysOptions;
    }
  };

  const [daysOptions, setDaysOptions] = useState(
    reminderToEdit ? createDayOptions() : []
  );

  useEffect(() => {
    setCountryAndCityOptions();
  }, [countries, reminderValues.country]);

  useEffect(() => {
    if (reminderToEdit) {
      setDaysOptions(createDayOptions());
      setReminderValues({ ...reminderValues, day: 1 });
    }
  }, [reminderValues.month]);

  const setCountryAndCityOptions = () => {
    if (countries.length && reminderValues.country) {
      const cityOptions = countries
        .find((currCountry) => currCountry.country === reminderValues.country)
        .cities.map((city) => {
          return { text: city, value: city, key: city };
        });
      setReminderValues({ ...reminderValues, city: cityOptions[0].value });
      setCityOptions(cityOptions);
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setReminderValues(
      reminderToEdit
        ? { ...reminderToEdit }
        : {
            title: "",
            time: "12:00",
            color: "pink",
            country: "Afghanistan",
            city: cityOptions ? cityOptions[0].value : "",
            day: day,
            month: month,
          }
    );
  }, [open]);

  const handleValueChange = (field, value) => {
    setReminderValues({
      ...reminderValues,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (reminderToEdit) {
      const updatedReminders = reminders.map((reminder) => {
        if (reminder.creationId === reminderToEdit.creationId) {
          return {
            ...reminder,
            title: reminderValues.title,
            color: reminderValues.color,
            time: reminderValues.time,
            city: reminderValues.city,
            day: reminderValues.day,
            month: reminderValues.month,
          };
        } else return reminder;
      });
      editReminder(updatedReminders);
    } else {
      const newReminder = {
        ...reminderValues,
        day: day,
        month: month,
        creationId: moment().format(),
      };
      addReminder(newReminder);
    }
    setOpen(false);
  };

  const disableSaveButton = () => {
    return (
      reminderValues.title === "" ||
      reminderValues.title.length > 30 ||
      reminderValues.city === ""
    );
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Add new reminder</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div className="reminderForm">
            <Form>
              <Form.Field inline>
                <Label size="huge">Title</Label>
                <Input
                  placeholder="Max 30 chars"
                  type="text"
                  name="title"
                  id="reminderTitle"
                  size="huge"
                  onChange={(e) => handleValueChange("title", e.target.value)}
                  value={reminderValues.title}
                />
              </Form.Field>
              <Form.Field inline>
                <Label size="huge">Time</Label>
                <Input
                  type="time"
                  name="time"
                  id="reminderTime"
                  size="big"
                  onChange={(e) => handleValueChange("time", e.target.value)}
                  value={reminderValues.time}
                  error={true}
                />
              </Form.Field>
              <Form.Group inline>
                <Label size="huge" className="labelMargin">
                  Color
                </Label>
                <Checkbox
                  radio
                  name="color"
                  value="pink"
                  checked={reminderValues.color === "pink"}
                  onChange={() => handleValueChange("color", "pink")}
                />
                <Label
                  circular
                  color="pink"
                  empty
                  size="huge"
                  className="labelMargin"
                />
                <Checkbox
                  radio
                  name="color"
                  value="blue"
                  checked={reminderValues.color === "blue"}
                  onChange={() => handleValueChange("color", "blue")}
                />
                <Label
                  circular
                  color="blue"
                  empty
                  size="huge"
                  className="labelMargin"
                />
                <Checkbox
                  radio
                  name="color"
                  value="olive"
                  checked={reminderValues.color === "olive"}
                  onChange={() => handleValueChange("color", "olive")}
                />
                <Label
                  circular
                  color="olive"
                  empty
                  size="huge"
                  className="labelMargin"
                />
                <Checkbox
                  radio
                  name="color"
                  value="yellow"
                  checked={reminderValues.color === "yellow"}
                  onChange={() => handleValueChange("color", "yellow")}
                />
                <Label
                  circular
                  color="yellow"
                  empty
                  size="huge"
                  className="labelMargin"
                />
                <Checkbox
                  radio
                  name="color"
                  value="teal"
                  checked={reminderValues.color === "teal"}
                  onChange={() => handleValueChange("color", "teal")}
                />
                <Label
                  circular
                  color="teal"
                  empty
                  size="huge"
                  className="labelMargin"
                />
              </Form.Group>
              <Form.Field inline>
                <Label size="huge">Country</Label>
                <Dropdown
                  className="dropdownCustom"
                  fluid
                  selection
                  size="huge"
                  options={countryOptions}
                  value={reminderValues.country}
                  onChange={(e) =>
                    handleValueChange("country", e.target.textContent)
                  }
                />
              </Form.Field>
              <Form.Field inline>
                <Label size="huge">City</Label>
                <Dropdown
                  className="dropdownCustom"
                  fluid
                  selection
                  size="huge"
                  options={cityOptions}
                  value={reminderValues.city}
                  onChange={(e) =>
                    handleValueChange("city", e.target.textContent)
                  }
                />
              </Form.Field>
              {reminderToEdit && (
                <>
                  <Form.Field inline>
                    <Label size="huge">Month</Label>
                    <Dropdown
                      className="dropdownCustom"
                      fluid
                      selection
                      size="huge"
                      options={monthOptions}
                      value={reminderValues.month}
                      onChange={(e) =>
                        handleValueChange(
                          "month",
                          MONTHS.indexOf(e.target.textContent)
                        )
                      }
                    />
                  </Form.Field>
                  <Form.Field inline>
                    <Label size="huge">Day</Label>
                    <Dropdown
                      className="dropdownCustom"
                      fluid
                      selection
                      size="huge"
                      options={daysOptions}
                      value={reminderValues.day}
                      onChange={(e) =>
                        handleValueChange("day", Number(e.target.textContent))
                      }
                    />
                  </Form.Field>
                </>
              )}
            </Form>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          color="green"
          disabled={disableSaveButton()}
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    reminders: state.reminders.storedReminders,
    countries: state.countries.storedCountries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addReminder: (data) => dispatch(addReminder(data)),
    editReminder: (data) => dispatch(editReminder(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderForm);
