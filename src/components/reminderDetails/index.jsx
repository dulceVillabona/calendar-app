import React, { useState, useEffect } from "react";

import { Button, Modal } from "semantic-ui-react";
import ReminderForm from "../reminderForm";
import DeleteForm from "../deleteForm";

const ReminderDetails = ({ reminder, trigger }) => {
  const { color, title, time, city, country } = reminder;
  const [open, setOpen] = useState(false);
  const [currentWeather, setCurrentWeather] = useState();

  useEffect(() => {
    fetch(
      `http://api.weatherstack.com/current?access_key=5be02d50d1c01561cfee838b7a7c3d7b&query=${city}`
    )
      .then((res) => res.json())
      .then((data) => setCurrentWeather(data.current));
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [reminder]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header className={color}>{title}</Modal.Header>
      <Modal.Content>
        <Modal.Description className="reminderDetailsContainer">
          <div className="reminderInfoDiv">
            <p className="reminderInfo">{`Time: ${time}`}</p>
            <p className="reminderInfo">{`Country: ${country}`}</p>
            <p className="reminderInfo">{`City: ${city}`}</p>
          </div>
          {currentWeather && (
            <div className="forecastDiv">
              <img
                className="forecastIcon"
                src={currentWeather.weather_icons}
                alt={currentWeather.weather_descriptions}
              />
              <p>{`Condition: ${currentWeather.weather_descriptions}`}</p>
              <p>{`Temperature: ${currentWeather.temperature}°`}</p>
              <p>{`Feels like: ${currentWeather.feelslike}°`}</p>
            </div>
          )}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <DeleteForm
          trigger={<Button color="black">Delete</Button>}
          reminderToDelete={reminder}
        />

        <ReminderForm
          type="edit"
          reminderToEdit={reminder}
          trigger={<Button color="blue">Edit</Button>}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ReminderDetails;
