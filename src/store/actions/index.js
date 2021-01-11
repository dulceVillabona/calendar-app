import TYPES from "./types";

export const addReminder = (data) => ({
  type: TYPES.ADD_REMINDER,
  payload: data,
});

export const editReminder = (data) => ({
  type: TYPES.EDIT_REMINDER,
  payload: data,
});

export const deleteReminder = (data) => ({
  type: TYPES.DELETE_REMINDER,
  payload: data,
});

export const setCountries = (data) => ({
  type: TYPES.SET_COUNTRIES,
  payload: data,
});
