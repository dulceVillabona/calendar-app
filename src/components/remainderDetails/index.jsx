import React, { useState, useEffect } from "react";

import { Button, Modal } from "semantic-ui-react";
import RemainderForm from "../remainderForm";
import DeleteForm from "../deleteForm";

const RemainderDetails = ({ remainder, trigger }) => {
  const { color, title, time, city, country } = remainder;
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
        <Modal.Description className="remainderDetailsContainer">
          <div className="remainderInfoDiv">
            <p className="remainderInfo">{`Time: ${time}`}</p>
            <p className="remainderInfo">{`Country: ${country}`}</p>
            <p className="remainderInfo">{`City: ${city}`}</p>
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
