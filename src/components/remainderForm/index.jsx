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

import { addRemainder, editRemainder } from "../../store/actions";

import { MONTHS, getDaysInMonth } from "../../utils";

const RemainderForm = ({
  day,
  month,
  trigger,
  addRemainder,
  editRemainder,
  remainderToEdit,
  remainders,
  countries,
}) => {
  const [cityOptions, setCityOptions] = useState();
  const [remainderValues, setRemainderValues] = useState(
    remainderToEdit
      ? { ...remainderToEdit }
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
    if (remainderToEdit) {
      const daysOptions = [];
      const totalDays = getDaysInMonth(remainderToEdit.month);
      for (let i = 1; i <= totalDays; i++) {
        daysOptions.push({ key: i, value: i, text: i });
      }
      return daysOptions;
    }
  };

  const [daysOptions, setDaysOptions] = useState(
    remainderToEdit ? createDayOptions() : []
  );

  useEffect(() => {
    setCountryAndCityOptions();
  }, [countries, remainderValues.country]);

  useEffect(() => {
    if (remainderToEdit) {
      setDaysOptions(createDayOptions());
      setRemainderValues({ ...remainderValues, day: 1 });
    }
  }, [remainderValues.month]);

  const setCountryAndCityOptions = () => {
    if (countries.length && remainderValues.country) {
      const cityOptions = countries
        .find((currCountry) => currCountry.country === remainderValues.country)
        .cities.map((city) => {
          return { text: city, value: city, key: city };
        });
      setRemainderValues({ ...remainderValues, city: cityOptions[0].value });
      setCityOptions(cityOptions);
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setRemainderValues(
      remainderToEdit
        ? { ...remainderToEdit }
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
            day: remainderValues.day,
            month: remainderValues.month,
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

  const disableSaveButton = () => {
    return (
      remainderValues.title === "" ||
      remainderValues.title.length > 30 ||
      remainderValues.city === ""
    );
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
              <Form.Field inline>
                <Label size="huge">Title</Label>
                <Input
                  placeholder="Max 30 chars"
                  type="text"
                  name="title"
                  id="remainderTitle"
                  size="huge"
                  onChange={(e) => handleValueChange("title", e.target.value)}
                  value={remainderValues.title}
                />
              </Form.Field>
              <Form.Field inline>
                <Label size="huge">Time</Label>
                <Input
                  type="time"
                  name="time"
                  id="remainderTime"
                  size="big"
                  onChange={(e) => handleValueChange("time", e.target.value)}
                  value={remainderValues.time}
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
                  checked={remainderValues.color === "pink"}
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
                  checked={remainderValues.color === "blue"}
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
                  checked={remainderValues.color === "olive"}
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
                  checked={remainderValues.color === "yellow"}
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
                  checked={remainderValues.color === "teal"}
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
                  value={remainderValues.country}
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
                  value={remainderValues.city}
                  onChange={(e) =>
                    handleValueChange("city", e.target.textContent)
                  }
                />
              </Form.Field>
              {remainderToEdit && (
                <>
                  <Form.Field inline>
                    <Label size="huge">Month</Label>
                    <Dropdown
                      className="dropdownCustom"
                      fluid
                      selection
                      size="huge"
                      options={monthOptions}
                      value={remainderValues.month}
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
                      value={remainderValues.day}
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
    remainders: state.remainders.storedRemainders,
    countries: state.countries.storedCountries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRemainder: (data) => dispatch(addRemainder(data)),
    editRemainder: (data) => dispatch(editRemainder(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemainderForm);
