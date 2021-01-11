import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";
import "./App.css";
import Month from "./components/month";
import { setCountries } from "./store/actions";
import { MONTHS } from "./utils";

const App = ({ remainders, setCountries }) => {
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((countries) => setCountries(countries.data));
  }, []);

  const date = new Date();
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());

  const monthRemainders = remainders.filter(
    (remainder) => remainder.month === currentMonth
  );

  return (
    <div className="App">
      <div className="appHeader">
        <Button
          disabled={currentMonth === 0}
          onClick={() => {
            setCurrentMonth(currentMonth - 1);
          }}
          icon="arrow left"
        />
        <h1>{MONTHS[currentMonth].toUpperCase()}</h1>
        <Button
          disabled={currentMonth === 11}
          onClick={() => {
            setCurrentMonth(currentMonth + 1);
          }}
          icon="arrow right"
        />
      </div>
      <Month monthNumber={currentMonth} monthRemainders={monthRemainders} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    remainders: state.remainders.storedRemainders,
    countries: state.countries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCountries: (data) => dispatch(setCountries(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
