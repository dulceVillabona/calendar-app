import TYPES from "./types";

export const addRemainder = (data) => ({
  type: TYPES.ADD_REMAINDER,
  payload: data,
});

export const editRemainder = (data) => ({
  type: TYPES.EDIT_REMAINDER,
  payload: data,
});

export const deleteRemainder = (data) => ({
  type: TYPES.DELETE_REMAINDER,
  payload: data,
});

export const setCountries = (data) => ({
  type: TYPES.SET_COUNTRIES,
  payload: data,
});
