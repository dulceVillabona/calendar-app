import TYPES from "../../actions/types";

const INITIAL_STATE = {
  storedReminders: [],
};

const remindersReducer = (
  state = INITIAL_STATE,
  { payload = "", type }
) => {
  switch (type) {
    case TYPES.ADD_REMINDER: {
      return {
        ...state,
        storedReminders: [...state.storedReminders, payload],
      };
    }
    case TYPES.EDIT_REMINDER: {
      return {
        ...state,
        storedReminders: payload,
      };
    }
    case TYPES.DELETE_REMINDER: {
      return {
        ...state,
        storedReminders: payload,
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
