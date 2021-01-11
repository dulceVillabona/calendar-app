import TYPES from "../../actions/types";

const INITIAL_STATE = {
  storedCountries: [],
};

const countriesReducer = (
  state = INITIAL_STATE,
  { payload = "", type }
) => {
  switch (type) {
    case TYPES.SET_COUNTRIES: {
      return {
        ...state,
        storedCountries: payload,
      };
    }
    default:
      return state;
  }
};

export default countriesReducer;
