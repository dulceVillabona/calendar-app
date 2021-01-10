import TYPES from "../../actions/types";

const INITIAL_STATE = {
  storedRemainders: [],
};

const remaindersReducer = (
  state = INITIAL_STATE,
  { payload = "", type }
) => {
  switch (type) {
    case TYPES.ADD_REMAINDER: {
      return {
        ...state,
        storedRemainders: [...state.storedRemainders, payload],
      };
    }
    case TYPES.EDIT_REMAINDER: {
      return {
        ...state,
        storedRemainders: payload,
      };
    }
    case TYPES.DELETE_REMAINDER: {
      return {
        ...state,
        storedRemainders: payload,
      };
    }
    default:
      return state;
  }
};

export default remaindersReducer;
