import { combineReducers } from 'redux';

import remaindersReducer from './remainders';
import countriesReducer from './countries';

const rootReducer = combineReducers({
    remainders: remaindersReducer,
    countries: countriesReducer
});

export default rootReducer;