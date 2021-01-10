import { combineReducers } from 'redux';

import remaindersReducer from './remainders';

const rootReducer = combineReducers({
    remainders: remaindersReducer
});

export default rootReducer;