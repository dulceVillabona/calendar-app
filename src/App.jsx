import React from "react";
import { connect } from "react-redux";
import "./App.css";
import Month from './components/month';
import RemainderForm from './components/remainderForm';

const App = ({  remainders }) => {

  const date = new Date();
  const currentMonth = date.getMonth()+1;
  const monthRemainders = remainders.filter(remainder => remainder.month === currentMonth);

  return (
    <div className="App">
      <Month monthNumber={currentMonth} monthRemainders={monthRemainders} />
      <RemainderForm></RemainderForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    remainders: state.remainders.storedRemainders,
  };
};


export default connect(mapStateToProps)(App);
